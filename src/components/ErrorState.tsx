import React from 'react';
import { AlertTriangle, PlusCircle, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  buttonLabel?: string;
  onAction: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Payment Link Not Found',
  message = 'The payment link is missing or invalid.',
  buttonLabel = 'Create Payment Link',
  onAction,
}) => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h2>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        {message}
      </p>

      <button
        id="error-state-action-btn"
        type="button"
        onClick={onAction}
        className="w-full py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle className="w-4 h-4" />
        <span>{buttonLabel}</span>
      </button>

      <div className="mt-4">
        <button
          type="button"
          onClick={onAction}
          className="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Arventa Ventures Payment</span>
        </button>
      </div>
    </div>
  );
};
