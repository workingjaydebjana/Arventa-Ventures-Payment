import React from 'react';
import { ArrowLeft, Headphones } from 'lucide-react';
import { ARVENTA_LOGO_DATA_URL } from '../assets/logo';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
  onNavigate?: (view: 'home' | 'privacy' | 'terms' | 'support' | 'sitemap') => void;
}

export const Header: React.FC<HeaderProps> = ({ onBackToHome, showBackButton, onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: 'home' | 'privacy' | 'terms' | 'support' | 'sitemap') => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    } else if (onBackToHome && view === 'home') {
      e.preventDefault();
      onBackToHome();
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBackToHome}
              className="p-2 -ml-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              title="Return to Generator"
              aria-label="Back to generator"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Generator</span>
            </button>
          )}

          <div
            onClick={(e) => handleNav(e, 'home')}
            className={`flex items-center gap-2.5 ${onBackToHome || onNavigate ? 'cursor-pointer group' : ''}`}
          >
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src={ARVENTA_LOGO_DATA_URL}
                alt="Arventa Ventures"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-tight block truncate">
                Arventa Ventures Payment
              </span>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                Create Secure UPI Payment Links Instantly
              </p>
            </div>
          </div>
        </div>

        {/* Navigation & Status */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className="hover:text-indigo-600 transition-colors"
            >
              Generator
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">
              FAQ
            </a>
            <a
              href="/support"
              onClick={(e) => handleNav(e, 'support')}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Support</span>
            </a>
            <a
              href="https://arventaventures.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Arventa Official ↗
            </a>
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% Client-Side Engine</span>
          </div>
        </div>
      </div>
    </header>
  );
};
