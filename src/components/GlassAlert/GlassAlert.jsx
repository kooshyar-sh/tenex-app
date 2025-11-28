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
      {icon && <i className={icons[type]}></i>}
      <div>{children}</div>

      {dismissible && (
        <button
          className="dismiss-btn"
          onClick={() => setVisible(false)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}
