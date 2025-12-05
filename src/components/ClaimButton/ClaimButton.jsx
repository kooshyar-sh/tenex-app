import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClaimButton({
  commission = 0.12,
  cap = 0.5,
  onClaim = null,
  onUpgrade = null,
  dropDirection = "up", // 'up' | 'down'
  label = "Claim",
  className = "",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const capRef = useRef(null);
  const menuRef = useRef(null);

  // وضعیت استایل منو: left/top و left position for arrow
  const [menuStyle, setMenuStyle] = useState({ left: null, top: null, arrowLeft: null });

  // آیا این حالت header است؟
  const isHeaderVariant = (className || "").includes("claim-button--header");

  useEffect(() => {
    function handleDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    setOpen((s) => !s);
  };

  const handleClaim = (e) => {
    if (typeof onClaim === "function") onClaim();
    else console.log("Claim clicked");
  };

  const handleUpgrade = (e) => {
    setOpen(false);
    if (typeof onUpgrade === "function") onUpgrade();
    else navigate("/user/cap-upgrade");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClaim();
    }
  };

  const fmt = (n) => {
    const num = Number(n) || 0;
    return `${num.toFixed(2)} BNB`;
  };

  // محاسبهٔ موقعیت منو نسبت به viewport (fixed) و محاسبهٔ arrow
  const updateMenuPosition = () => {
    if (!wrapperRef.current || !capRef.current || !menuRef.current) return;

    const capRect = capRef.current.getBoundingClientRect();
    const menuEl = menuRef.current;

    const menuWidth = Math.max(menuEl.offsetWidth || 220, 180);
    const menuHeight = menuEl.offsetHeight || 48;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // مرکز عدد cap نسبت به viewport
    const centerAbsX = capRect.left + capRect.width / 2;

    // هدف: قرار دادن مرکز منو روی مرکز cap
    let leftAbs = Math.round(centerAbsX - menuWidth / 2);

    // clamp درون viewport
    const margin = 8;
    const minLeftAbs = margin;
    const maxLeftAbs = Math.max(viewportWidth - menuWidth - margin, minLeftAbs);
    if (leftAbs < minLeftAbs) leftAbs = minLeftAbs;
    if (leftAbs > maxLeftAbs) leftAbs = maxLeftAbs;

    // محاسبه top بر حسب dropDirection
    let topAbs;
    const gap = 8; // فاصله بین cap و منو
    if (dropDirection === "down") {
      // منو زیر cap باز می‌شود
      topAbs = Math.round(capRect.bottom + gap);
      // اگر منو از viewport پایینی بیرون برود، تلاش می‌کنیم بالا بازش کنیم
      if (topAbs + menuHeight + margin > viewportHeight) {
        // باز کردن به بالا به عنوان fallback
        topAbs = Math.max(margin, Math.round(capRect.top - menuHeight - gap));
      }
    } else {
      // dropDirection 'up' => منو بالای cap باز می‌شود
      topAbs = Math.round(capRect.top - menuHeight - gap);
      if (topAbs < margin) {
        // اگر از بالای viewport خارج شد، fallback به پایین
        topAbs = Math.round(capRect.bottom + gap);
      }
    }

    // clamp top داخل viewport
    const minTopAbs = margin;
    const maxTopAbs = Math.max(viewportHeight - menuHeight - margin, minTopAbs);
    if (topAbs < minTopAbs) topAbs = minTopAbs;
    if (topAbs > maxTopAbs) topAbs = maxTopAbs;

    // محاسبهٔ موقعیت پیکان داخل منو (نسبت به عرض منو)
    const arrowCenterAbs = centerAbsX;
    const arrowLeftInsideMenu = arrowCenterAbs - leftAbs - 7; // 7 = half arrow width
    const arrowMin = 10;
    const arrowMax = Math.max(menuWidth - 10 - 14, arrowMin);
    let arrowPos = Math.round(arrowLeftInsideMenu);
    if (arrowPos < arrowMin) arrowPos = arrowMin;
    if (arrowPos > arrowMax) arrowPos = arrowMax;

    // set state
    setMenuStyle({
      left: `${leftAbs}px`,
      top: `${topAbs}px`,
      arrowLeft: `${arrowPos}px`,
    });
  };

  // هنگام open و تغییر سایز/اسکرول موقعیت را بروزرسانی کن
  useEffect(() => {
    if (open) {
      // timeout کوتاه تا منو render شود و اندازه گرفته شود
      // (ممکن است منو هنوز display:block نشده باشد)
      requestAnimationFrame(() => {
        updateMenuPosition();
      });
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
    } else {
      setMenuStyle({ left: null, top: null, arrowLeft: null });
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    }
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, commission, cap, dropDirection]);

  // NOTE: we DO NOT change icon class in JS anymore — we render a fixed icon and CSS rotates it.
  // Render
  return (
    <div className={`claim-wrapper ${className}`} ref={wrapperRef}>
      <div
        role="button"
        tabIndex={0}
        className="shining-button claim-button"
        onClick={handleClaim}
        onKeyDown={onKeyDown}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="claim-left">
          <span className="claim-label">{label}</span>
        </div>

        <div className="claim-values">
          <span className="collected">{fmt(commission)}</span>
          <span className="sep"> / </span>
          <span className="cap" ref={capRef}>
            {fmt(cap)}
          </span>
        </div>

        <button
          type="button"
          className={`toggle-area ${open ? "open" : ""}`}
          onClick={toggle}
          aria-label={open ? "Close options" : "Open options"}
        >
          {/* fixed icon, CSS will rotate it */}
          <i className="bi bi-chevron-up" />
        </button>
      </div>

      {/* منو: اکنون fixed و موقعیت left/top را مستقیماً از state می‌گیرم */}
      <div
        ref={menuRef}
        className={`claim-menu ${open ? "visible" : ""} ${
          dropDirection === "down" ? "claim-menu--down" : "claim-menu--up"
        }`}
        role="menu"
        style={{
          left: menuStyle.left ?? undefined,
          top: menuStyle.top ?? undefined,
          position: "fixed",
        }}
      >
        <div className="menu-inner">
          <button type="button" className="upgrade-text" onClick={handleUpgrade}>
            Upgrade Cap
            <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
          </button>
        </div>

        <div
          className="drop-arrow"
          style={{
            left: menuStyle.arrowLeft ?? undefined,
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
}
