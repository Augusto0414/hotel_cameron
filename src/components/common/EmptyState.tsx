import { AlertCircle } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="text-slate-500 mb-4">{icon || <AlertCircle size={48} />}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-center mb-6">{description}</p>}
      {action && (
        <button onClick={action.onClick} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          {action.label} →
        </button>
      )}
    </div>
  );
};

export default EmptyState;
