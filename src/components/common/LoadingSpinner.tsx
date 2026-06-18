import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", text }) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="text-slate-400 mt-4">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
