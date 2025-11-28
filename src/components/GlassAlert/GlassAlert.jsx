import { useState } from "react";

export default function GlassAlert({
  type = "info",
  dismissible = false,
  icon = true,
  children,
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const icons = {
    info: "bi bi-info-circle",
    success: "bi bi-check-circle",
    warning: "bi bi-exclamation-triangle",
    danger: "bi bi-x-octagon",
    secondary: "bi bi-dot",
    purple: "bi bi-star",
  };

  return (
    <div className={`glass-alert alert-${type}-glass`}>
      <div className="glass-alert-row">
        {icon && <i className={icons[type]}></i>}
        <div className="glass-alert-text">{children}</div>
      </div>

      {dismissible && (
        <button className="glass-alert-close-btn" onClick={() => setVisible(false)}>
          Close
        </button>
      )}
    </div>
  );
}
