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

  // وضعیت استایل منو: left و left position for arrow
  const [menuStyle, setMenuStyle] = useState({ left: null, arrowLeft: null });

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

  // تابعی که موقعیت منو و پیکان را محاسبه می‌کند
  const updateMenuPosition = () => {
    if (!wrapperRef.current || !capRef.current || !menuRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const capRect = capRef.current.getBoundingClientRect();
    const menuEl = menuRef.current;

    const menuWidth = Math.max(menuEl.offsetWidth, 180); // fallback
    const wrapperWidth = wrapperRef.current.clientWidth;

    // مرکز عدد cap نسبت به wrapper (px)
    const centerX = capRect.left + capRect.width / 2 - wrapperRect.left;

    // left محاسبه‌شده طوری که مرکز منو با مرکز cap تراز شود
    let leftPx = Math.round(centerX - menuWidth / 2);

    // clamp درون wrapper (8px padding)
    const minLeft = 8;
    const maxLeft = Math.max(wrapperWidth - menuWidth - 8, minLeft);
    if (leftPx < minLeft) leftPx = minLeft;
    if (leftPx > maxLeft) leftPx = maxLeft;

    // محاسبهٔ موقعیت پیکان داخل منو
    // پیکان اندازه 14px داریم، پس آن را به مرکز cap نسبت می‌دهیم
    const arrowCenterInWrapper = centerX; // px
    const arrowLeftInsideMenu = arrowCenterInWrapper - leftPx - 7; // 7 = half arrow width

    // clamp arrow داخل منو
    const arrowMin = 10;
    const arrowMax = Math.max(menuWidth - 10 - 14, arrowMin);
    let arrowPos = Math.round(arrowLeftInsideMenu);
    if (arrowPos < arrowMin) arrowPos = arrowMin;
    if (arrowPos > menuWidth - 10 - 14) arrowPos = arrowMax;

    setMenuStyle({ left: `${leftPx}px`, arrowLeft: `${arrowPos}px` });
  };

  // وقتی open شد یا اندازه تغییر کرد، موقعیت را بروزرسانی کن
  useEffect(() => {
    if (open) {
      // مقداردهی بلافاصله
      updateMenuPosition();
      // resize / scroll listener برای بروزرسانی پویا
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
    } else {
      // وقتی بسته شد حذف استایل‌ها (اختیاری)
      setMenuStyle({ left: null, arrowLeft: null });
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    }

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, commission, cap, dropDirection]);

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
          <i className={`bi ${open ? "bi-chevron-down" : "bi-chevron-up"}`} />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`claim-menu ${open ? "visible" : ""} ${
          dropDirection === "down" ? "claim-menu--down" : "claim-menu--up"
        }`}
        role="menu"
        style={{
          left: menuStyle.left ?? undefined,
        }}
      >
        <div className="menu-inner">
          {/* دکمه آپگریدِ متنی + فلش راست در سمت راست */}
          <button
            type="button"
            className="upgrade-text"
            onClick={handleUpgrade}
          >
            Upgrade Cap
            <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
          </button>
        </div>

        {/* arrow: موقعیت آن از state محاسبه می‌شود */}
        <div
          className="drop-arrow"
          style={{
            left: menuStyle.arrowLeft ?? undefined,
            // اگر dropdown باشد، فلش را در بالا قرار می‌دهیم (CSS پوشش می‌دهد)
          }}
        />
      </div>
    </div>
  );
}
