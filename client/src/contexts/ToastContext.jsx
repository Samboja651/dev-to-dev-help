import { createContext, useState, useRef, useEffect } from "react";

export const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const showToast = (message, variant = "info") => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 4000); // auto-dismiss
  };

  // Focus toast for accessibility and visibility
  useEffect(() => {
    if (toast && toastRef.current) {
      toastRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {toast && (
        <div
          ref={toastRef}
          className={`toast align-items-center text-bg-${toast.variant} show position-fixed top-0 end-0 m-4`}
          role="alert"
          tabIndex={-1}
          style={{ zIndex: 9999, minWidth: 300 }}
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast(null)} />
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
