import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/60 py-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block leading-tight">
              Arventa Ventures Payment
            </span>
            <span className="text-xs text-slate-500">
              Simple UPI Payment Links
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 Arventa Ventures. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
