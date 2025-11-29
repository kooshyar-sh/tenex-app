import { useEffect, useState } from "react";

export default function Toast({ toast, removeToast }) {
  const { id, type, message, duration, showProgressBar } = toast;

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => removeToast(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  const icons = {
    success: "bi bi-check-circle",
    error: "bi bi-x-octagon",
    warning: "bi bi-exclamation-triangle",
    info: "bi bi-info-circle",
  };

  return (
    <div className={`tenex-toast glass ${type} ${fadeOut ? "fade-out" : ""}`}>
      <i className={`toast-icon ${icons[type]}`} />

      <div className="toast-text">{message}</div>

      {showProgressBar && (
        <div
          className={`toast-progress ${type}-bar`}
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
}
