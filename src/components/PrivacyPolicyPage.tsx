import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, Server, Mail, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Navigation Bar - Responsive Stack on Mobile to prevent text collision */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="whitespace-nowrap">Back to Generator</span>
        </button>
        <span className="text-[11px] sm:text-xs text-slate-500 font-medium bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-lg self-start sm:self-auto">
          Last Updated: March 2026
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xs mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Data Retention Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          At Arventa Ventures Payment (<span className="font-semibold text-slate-800">payment.arventaventures.online</span>), your privacy is our architectural foundation. We believe the safest way to protect financial data is to never collect or store it in the first place.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">No Database</h4>
              <p className="text-xs text-slate-500 mt-0.5">We run zero databases. Nothing you enter is saved.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Client-Side Only</h4>
              <p className="text-xs text-slate-500 mt-0.5">All encryption and link generation occur in your browser.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">No Tracking</h4>
              <p className="text-xs text-slate-500 mt-0.5">Zero tracking cookies or marketing profiling pixels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Legal Content Sections */}
      <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">1</span>
            Information We Do NOT Collect
          </h2>
          <p className="mb-3">
            Unlike traditional payment gateways or link shorteners, Arventa Ventures Payment does not operate any backend database or persistent user logging mechanism. We do <strong className="font-semibold text-slate-900">NOT</strong> collect, record, or store:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 mb-4 list-disc pl-5">
            <li>Your Virtual Payment Address (UPI ID / VPA)</li>
            <li>Recipient or Payee names and phone numbers</li>
            <li>Transaction amounts, transaction notes, or memos</li>
            <li>Bank account numbers, IFSC codes, or credit/debit card credentials</li>
            <li>Browser fingerprinting or IP tracking histories</li>
          </ul>
          <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <strong>Key takeaway:</strong> Every payment link and QR code is computed strictly in client memory on your device. Once you close or reload the browser, all transient form inputs disappear from local memory.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">2</span>
            How Payment Links &amp; QR Codes Operate
          </h2>
          <p className="mb-3">
            When you generate a payment link or QR code:
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600">
            <p>
              • <strong>Stateless URL Encoding:</strong> The payment parameters (UPI ID, amount, recipient name, note) are packed into the URL query string using URL-safe Base64 and cryptographic checksum validation.
            </p>
            <p>
              • <strong>Browser Decoding:</strong> When a recipient opens your payment link, their browser reads and verifies the URL parameters locally without querying any Arventa Ventures server.
            </p>
            <p>
              • <strong>Direct UPI Redirection:</strong> When clicking &quot;Pay with Google Pay&quot;, &quot;PhonePe&quot;, &quot;Paytm&quot;, or &quot;BHIM&quot;, the application triggers the standard National Payments Corporation of India (NPCI) deep link schema (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">upi://pay</code>). The actual payment occurs entirely inside the user&apos;s installed banking application.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">3</span>
            Zero Financial Intermediation
          </h2>
          <p className="mb-3">
            Arventa Ventures is <strong>not</strong> a bank, non-banking financial company (NBFC), or payment aggregator. 
          </p>
          <p className="text-slate-600 text-xs sm:text-sm">
            We never handle, escrow, touch, or hold funds. Payments transfer directly from the payer&apos;s bank account to the payee&apos;s bank account through the Reserve Bank of India (RBI) and NPCI Unified Payments Interface infrastructure.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">4</span>
            Cookies &amp; Local Storage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We do not use tracking cookies, advertising beacons, or third-party behavioral profiling scripts. Any local browser storage utilized by this web app is restricted strictly to functional interface preferences (such as maintaining copy state and navigation context).
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">5</span>
            Contact Our Privacy Officer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            If you have questions, concerns, or inquiries regarding our zero-retention privacy architecture or data security practices, please contact our support team at:
          </p>
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <span className="text-xs text-indigo-900 font-bold block">Official Privacy &amp; Support Email</span>
                <a
                  href="mailto:Info@arventaventures.online"
                  className="text-sm font-extrabold text-indigo-700 hover:underline"
                >
                  Info@arventaventures.online
                </a>
              </div>
            </div>
            <a
              href="mailto:Info@arventaventures.online"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
            >
              Send Email
            </a>
          </div>
        </section>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl transition-all shadow-xs cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Payment Generator</span>
        </button>
      </div>
    </div>
  );
};
