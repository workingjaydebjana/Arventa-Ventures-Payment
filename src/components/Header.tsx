import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ARVENTA_LOGO_DATA_URL } from '../assets/logo';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onBackToHome, showBackButton }) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBackToHome}
              className="p-2 -ml-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              title="Return to Generator"
              aria-label="Back to generator"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Generator</span>
            </button>
          )}

          <div
            onClick={onBackToHome}
            className={`flex items-center gap-2.5 ${onBackToHome ? 'cursor-pointer group' : ''}`}
          >
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src={ARVENTA_LOGO_DATA_URL}
                alt="Arventa Ventures"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Arventa Ventures Payment
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Create Secure UPI Payment Links Instantly
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>100% Client-Side Engine</span>
        </div>
      </div>
    </header>
  );
};
