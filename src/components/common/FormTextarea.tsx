import React from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, error, helperText, className, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
          error ? "border-red-500" : "border-slate-600"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-slate-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

export default FormTextarea;
