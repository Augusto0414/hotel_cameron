import React from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400 hover:text-red-300 font-bold text-xl">
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
