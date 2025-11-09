import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    bonus: '🎉'
  };

  const colors = {
    success: 'from-green-500 to-emerald-600',
    info: 'from-blue-500 to-cyan-600',
    warning: 'from-orange-500 to-amber-600',
    bonus: 'from-purple-500 to-pink-600'
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-slide-down">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-[90vw] animate-bounce-in`}>
        <span className="text-3xl animate-pulse">{icons[type]}</span>
        <span className="font-medium text-sm flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
