import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ToolbarBottom.scss";

export default function ToolbarBottom({
  commission = 0.12,
  cap = 0.5,
  onClaim = null,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // بسته شدن popup در کلیک بیرون
  useEffect(() => {
    function handleDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  const handleToggle = (e) => {
    // جلوگیری از trigger شدن handleClaim (propagation)
    e.stopPropagation();
    setOpen((s) => !s);
  };

  const handleUpgrade = () => {
    setOpen(false);
    navigate("/user/cap-upgrade");
  };

  const handleClaim = () => {
    if (typeof onClaim === "function") onClaim();
    else console.log("Claim clicked");
  };

  // keyboard accessibility برای div نقش-button
  const onClaimKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClaim();
    }
  };

  // فرمت عدد با دو رقم اعشار و اضافه کردن BNB
  const formatBNB = (n) => {
    const num = Number(n) || 0;
    return `${num.toFixed(2)} BNB`;
  };

  return (
    <div className="toolbar-bottom d-md-none">
      <div className="tb-claim-wrapper" ref={wrapperRef}>
        <div className="claim-row">
          {/* دکمهٔ اصلی Claim به صورت div با role=button تا بتوان داخلش button گذاشت */}
          <div
            role="button"
            tabIndex={0}
            className="shining-button claim-button d-flex align-items-center"
            onClick={handleClaim}
            onKeyDown={onClaimKeyDown}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <div className="claim-left">
              <span className="claim-label">Claim</span>
            </div>

            <div className="claim-values ms-3">
              <span className="collected">{formatBNB(commission)}</span>
              <span className="sep"> / </span>
              <span className="cap">{formatBNB(cap)}</span>
            </div>

            {/* Toggle داخل خود دکمه — یک button مستقل که propagation را stop می‌کند */}
            <button
              type="button"
              className={`toggle-area btn-icon ${open ? "open" : ""}`}
              onClick={handleToggle}
              aria-label={open ? "Close options" : "Open options"}
            >
              <i className="bi bi-chevron-up" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Dropup: ظاهر بالاتر از دکمه */}
        <div className={`claim-dropup ${open ? "visible" : ""}`} role="menu">
          <div className="dropup-inner">
            <button
              type="button"
              className="btn btn-sm btn-light upgrade-btn"
              onClick={handleUpgrade}
            >
              Upgrade Cap
            </button>
          </div>
          <div className="dropup-arrow" />
        </div>
      </div>
    </div>
  );
}
