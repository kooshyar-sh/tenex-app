import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ClaimButton({
  commission = 0.12,
  cap = 0.5,
  onClaim = null,
  onUpgrade = null,
  dropDirection = "up",
  label = "Claim",
  className = "",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

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

        {/* toggle داخل خود دکمه — propagation متوقف می‌شود */}
        <button
          type="button"
          className={`toggle-area ${open ? "open" : ""}`}
          onClick={toggle}
          aria-label={open ? "Close options" : "Open options"}
        >
          <i className={`bi ${open ? "bi-chevron-down" : "bi-chevron-up"}`} />
        </button>
      </div>

      {/* منو: position absolute نسبت به wrapper؛ جهت با prop تنظیم می‌شود */}
      <div
        className={`claim-menu ${open ? "visible" : ""} ${
          dropDirection === "down" ? "claim-menu--down" : "claim-menu--up"
        }`}
        role="menu"
      >
        <div className="menu-inner">
          <button
            type="button"
            className="btn upgrade-btn"
            onClick={handleUpgrade}
          >
            Upgrade Cap
          </button>
        </div>
        <div className="drop-arrow" />
      </div>
    </div>
  );
}
