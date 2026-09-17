import React from 'react';
import { Lock, Shield } from 'lucide-react';

export const PrivacyNote: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto my-6 p-4 rounded-xl bg-white/70 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
        <Lock className="w-3.5 h-3.5" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
          <span>Client-Side Payment Link Generation</span>
          <Shield className="w-3 h-3 text-indigo-600" />
        </h4>
        <p className="text-slate-500 mt-1 leading-relaxed text-[11px]">
          Your entered payment details are encoded directly into the payment link and are not stored in a server database by this application. Anyone opening your link decodes the details in their own browser.
        </p>
      </div>
    </div>
  );
};
