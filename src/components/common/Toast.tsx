import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      onClose?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  // Colores según el tipo
  const bgColor = {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-info',
    warning: 'bg-warning',
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }[type];

  return (
    <div
      className={`position-fixed bottom-0 start-50 translate-middle-x mb-3 ${bgColor} text-white px-4 py-3 rounded shadow-lg d-flex align-items-center gap-2`}
      style={{
        maxWidth: '400px',
        zIndex: 9999,
        animation: 'slideUp 0.3s ease-in-out',
      }}
    >
      <span className="fs-5 fw-bold">{icon}</span>
      <span>{message}</span>
      <button
        type="button"
        className="btn-close btn-close-white ms-auto"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      />
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
