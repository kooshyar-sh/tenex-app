import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type, message, options = {}) => {
    const id = crypto.randomUUID();

    const toast = {
      id,
      type,
      message,
      duration: options.duration || 3000,
      showProgressBar: options.showProgressBar ?? true,
    };

    setToasts((prev) => [...prev, toast]);
  }, []);

  const api = {
    showToast,
    success: (msg, opt) => showToast("success", msg, opt),
    error: (msg, opt) => showToast("error", msg, opt),
    info: (msg, opt) => showToast("info", msg, opt),
    warning: (msg, opt) => showToast("warning", msg, opt),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
