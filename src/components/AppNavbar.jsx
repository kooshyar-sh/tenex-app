import React, { useState, useEffect, useRef } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClaimButton from "./ClaimButton/ClaimButton";

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null); // ref به <header>
  const lastScrollTop = useRef(0);
  const didScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const delta = 5;
  const [navbarHeight, setNavbarHeight] = useState(0);

  // این مقدار تعیین می‌کند هدر چند پیکسل بیشتر بالاتر برود تا سایه دیده نشود
  const EXTRA_SHADOW_CLEARANCE = 10;
  const originalBoxShadow = useRef("");

  const handleClose = () => setExpanded(false);

  // اندازه هدر را هنگام mount و resize و زمانی که منو باز/بسته می‌شود بروزرسانی کن
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavbarHeight(Math.ceil(navRef.current.offsetHeight));
        // ذخیره مقدار اولیه‌ی box-shadow برای بازگردانی بعداً
        try {
          const cs = window.getComputedStyle(navRef.current);
          originalBoxShadow.current = cs?.boxShadow || "";
        } catch (e) {
          originalBoxShadow.current = "";
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    // وقتی منو باز/بسته شد، احتمالاً ارتفاع هدر تغییر می‌کند
    if (navRef.current) {
      setNavbarHeight(Math.ceil(navRef.current.offsetHeight));
      try {
        const cs = window.getComputedStyle(navRef.current);
        originalBoxShadow.current = cs?.boxShadow || originalBoxShadow.current;
      } catch (e) {}
    }
  }, [expanded]);

  useEffect(() => {
    // مقدار اولیه
    lastScrollTop.current =
      window.pageYOffset || document.documentElement.scrollTop || 0;

    const onScroll = () => {
      didScroll.current = true;

      if (!scrollTimeout.current) {
        scrollTimeout.current = window.setTimeout(() => {
          if (didScroll.current && navRef.current) {
            const st =
              window.pageYOffset || document.documentElement.scrollTop || 0;
            const el = navRef.current; // header element
            const navH = el ? el.offsetHeight : navbarHeight;

            if (st > navH) {
              if (st > lastScrollTop.current + delta) {
                // اسکرول رو به پایین — هدر رو بالاتر می‌فرستیم تا سایه پنهان شود
                const hideOffset = navH + EXTRA_SHADOW_CLEARANCE;
                el.style.top = `-${hideOffset}px`;
                // موقتاً سایه را پاک کن تا اثری نداشته باشد
                el.style.boxShadow = "none";
              } else if (st < lastScrollTop.current - delta) {
                // اسکرول رو به بالا — هدر رو نشان بده و سایه را بازگردان
                el.style.top = `0`;
                el.style.boxShadow = originalBoxShadow.current || "";
              }
            } else {
              // اگر در بالا صفحه هستیم (قبل از ارتفاع navbar) مقدار top را unset کن و سایه را برگردان
              el.style.top = "unset";
              el.style.boxShadow = originalBoxShadow.current || "";
            }

            lastScrollTop.current = st;
            didScroll.current = false;
          }

          // پاکسازی timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = null;
          }
        }, 250); // همون 250ms که در انگولار بود
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    };
  }, [navbarHeight]);

  return (
    <>
      {/* header wrapper شبیه انگولار — کلاس header برای CSS تو */}
      <header ref={navRef} className="header">
        <Navbar
          expand="md"
          className="shadow-sm navbar-tenex"
          expanded={expanded}
          onToggle={(next) => setExpanded(next)}
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to="/home"
              className="fw-bold text-purple"
              onClick={handleClose}
            >
              <i className="bi bi-lightning-charge-fill me-2 text-blue"></i>
              TENEX
            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls="main-nav"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <span aria-hidden="true" style={{ fontSize: 20 }}>
                  <i className="bi bi-x-lg"></i>
                </span>
              ) : (
                <span aria-hidden="true" style={{ fontSize: 20 }}>
                  <i className="bi bi-list"></i>
                </span>
              )}
            </Navbar.Toggle>

            <Navbar.Collapse id="main-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/user"
                  className="fw-semibold text-purple"
                  onClick={handleClose}
                >
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/mint"
                  className="fw-semibold text-purple"
                  onClick={handleClose}
                >
                  Mint
                </Nav.Link>
              </Nav>

              <div className="d-flex align-items-center">
                <Button size="sm" className="btn-outline-blue me-2">
                  <i className="bi bi-wallet2 me-1"></i> Connect Wallet
                </Button>

                <ClaimButton
                  className="d-none d-md-block"
                  commission={0.34}
                  cap={1.0}
                  onClaim={() => {}}
                  onUpgrade={() => {}}
                  dropDirection="down"
                />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
