// src/components/ClaimButton/ClaimButton.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClaimButton({
  commission = 0.12,
  cap = 0.5,
  onClaim = null,
  onUpgrade = null,
  dropDirection = undefined, // optional override
  label = "Claim",
  className = "",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const [menuStyle, setMenuStyle] = useState({ left: null, top: null, arrowLeft: null, width: null });

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

  const handleClaim = () => {
    if (typeof onClaim === "function") onClaim();
    else console.log("Claim clicked");
  };

  const handleUpgrade = () => {
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

  // ساده: موقعیت منو را نسبت به خودِ toggle محاسبه کن
  const positionMenuSimple = () => {
    if (!toggleRef.current || !menuRef.current) return;

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const menuEl = menuRef.current;

    // set menu width equal to toggle width (nearly full width)
    const width = Math.max(toggleRect.width, 160);
    const menuHeight = menuEl.offsetHeight || 48;

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const margin = 8;
    const gap = 6;

    // direction: override prop > headerVariant > default mobile
    const effectiveDirection = dropDirection ? dropDirection : (isHeaderVariant ? "down" : "up");

    // left: align left edge of menu with left edge of toggle (clamp to viewport)
    let leftAbs = Math.round(toggleRect.left);
    const minLeftAbs = margin;
    const maxLeftAbs = Math.max(viewportWidth - width - margin, minLeftAbs);
    if (leftAbs < minLeftAbs) leftAbs = minLeftAbs;
    if (leftAbs > maxLeftAbs) leftAbs = maxLeftAbs;

    // top based on direction (down -> below toggle; up -> above toggle)
    let topAbs;
    if (effectiveDirection === "down") {
      topAbs = Math.round(toggleRect.bottom + gap);
      if (topAbs + menuHeight + margin > viewportHeight) {
        // fallback up
        topAbs = Math.max(margin, Math.round(toggleRect.top - menuHeight - gap));
      }
    } else {
      topAbs = Math.round(toggleRect.top - menuHeight - gap);
      if (topAbs < margin) {
        // fallback down
        topAbs = Math.round(toggleRect.bottom + gap);
      }
    }

    // arrow: place it near left side of toggle inside menu (clamped)
    const arrowCenterAbs = toggleRect.left + Math.max(12, Math.floor(toggleRect.width / 4));
    let arrowLeftInside = Math.round(arrowCenterAbs - leftAbs - 7); // 7 = half arrow width
    const arrowMin = 8;
    const arrowMax = Math.max(width - 8 - 14, arrowMin);
    if (arrowLeftInside < arrowMin) arrowLeftInside = arrowMin;
    if (arrowLeftInside > arrowMax) arrowLeftInside = arrowMax;

    setMenuStyle({
      left: `${leftAbs}px`,
      top: `${topAbs}px`,
      arrowLeft: `${arrowLeftInside}px`,
      width: `${width}px`,
    });
  };

  useEffect(() => {
    if (open) {
      // position immediately after render
      requestAnimationFrame(() => positionMenuSimple());
      window.addEventListener("resize", positionMenuSimple);
      window.addEventListener("scroll", positionMenuSimple, true);
    } else {
      setMenuStyle({ left: null, top: null, arrowLeft: null, width: null });
      window.removeEventListener("resize", positionMenuSimple);
      window.removeEventListener("scroll", positionMenuSimple, true);
    }
    return () => {
      window.removeEventListener("resize", positionMenuSimple);
      window.removeEventListener("scroll", positionMenuSimple, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isHeaderVariant, dropDirection]);

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
          <span className="cap">{fmt(cap)}</span>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={`toggle-area ${open ? "open" : ""}`}
          onClick={toggle}
          aria-label={open ? "Close options" : "Open options"}
        >
          <i className="bi bi-chevron-up" />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`claim-menu ${open ? "visible" : ""} ${
          (dropDirection ? dropDirection : (isHeaderVariant ? "down" : "up")) === "down"
            ? "claim-menu--down"
            : "claim-menu--up"
        }`}
        role="menu"
        style={{
          left: menuStyle.left ?? undefined,
          top: menuStyle.top ?? undefined,
          width: menuStyle.width ?? undefined,
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
          }}
        />
      </div>
    </div>
  );
}
