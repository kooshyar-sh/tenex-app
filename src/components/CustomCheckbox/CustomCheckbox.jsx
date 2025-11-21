import React from "react";
import "./CustomCheckbox.css";

export default function CustomCheckbox({ checked, disabled, label, onChange }) {
  const toggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div
      className={`custom-checkbox-wrapper ${checked ? "checked" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={toggle}
    >
      <div className="checkbox-box">
        <div className="checkbox-inner"></div>
      </div>
      <span className="checkbox-label">{label}</span>
    </div>
  );
}
