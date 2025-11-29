import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container-tenex">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} removeToast={removeToast} />
      ))}
    </div>
  );
}
