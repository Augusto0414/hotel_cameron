import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, helperText, className, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
          error ? "border-red-500" : "border-slate-600"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-slate-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

export default FormInput;
