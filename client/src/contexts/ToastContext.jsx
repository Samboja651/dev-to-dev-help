import { createContext, useState } from "react";

export const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, variant = "info") => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 4000); // auto-dismiss
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {toast && (
        <div className={`toast align-items-center text-bg-${toast.variant} show position-fixed bottom-0 end-0 m-4`} role="alert">
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast(null)} />
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
