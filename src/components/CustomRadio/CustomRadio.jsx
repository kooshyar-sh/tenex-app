import React from "react";
import "./CustomRadio.css";

export default function CustomRadio({ checked, disabled, label, onChange }) {
  const handleSelect = () => {
    if (disabled || checked) return;
    onChange(true);
  };

  return (
    <div
      className={`custom-radio-wrapper ${checked ? "checked" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleSelect}
    >
      <div className="radio-circle">
        <div className="radio-inner"></div>
      </div>
      <span className="radio-label">{label}</span>
    </div>
  );
}
