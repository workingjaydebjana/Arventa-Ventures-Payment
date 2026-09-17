import React from 'react';
import { ShieldCheck, ExternalLink, Mail, FileText, Scale, Headphones } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'home' | 'privacy' | 'terms' | 'support') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: 'home' | 'privacy' | 'terms' | 'support') => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/80 py-10 px-4 sm:px-6 mt-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 leading-tight">
                Arventa Ventures Payment
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Instant, secure client-side UPI payment link and dynamic QR code generator. 
              Zero server storage, 100% privacy, and universal compatibility with all Indian UPI apps.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Support: </span>
              <a
                href="mailto:Info@arventaventures.online"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Info@arventaventures.online
              </a>
            </div>
          </div>

          {/* Legal & Support Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Legal &amp; Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNav(e, 'privacy')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav(e, 'terms')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms &amp; Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  onClick={(e) => handleNav(e, 'support')}
                  className="flex items-center gap-1.5 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Support Center</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-indigo-600 transition-colors block pt-1"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Authoritative Resources (External Links for SEO) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Official &amp; Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a
                  href="https://arventaventures.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
                  <span>Arventa Ventures</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npci.org.in/what-we-do/upi/product-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
                  <span>NPCI UPI Specifications</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
                  <span>Reserve Bank of India (RBI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Quick Links */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Arventa Ventures. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className="hover:text-slate-600"
            >
              Home
            </a>
            <a
              href="/privacy"
              onClick={(e) => handleNav(e, 'privacy')}
              className="hover:text-slate-600"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => handleNav(e, 'terms')}
              className="hover:text-slate-600"
            >
              Terms
            </a>
            <a
              href="/support"
              onClick={(e) => handleNav(e, 'support')}
              className="text-indigo-600 hover:underline font-medium"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
