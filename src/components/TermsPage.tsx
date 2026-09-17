import React from 'react';
import { FileText, ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Scale, Mail } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-4">
          <Scale className="w-4 h-4 text-indigo-600" />
          <span>Legal Agreement &amp; Acceptable Use</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Please read these Terms and Conditions carefully before using Arventa Ventures Payment (<span className="font-semibold text-slate-800">payment.arventaventures.online</span>). By accessing or generating links through this utility, you acknowledge and agree to be bound by these terms.
        </p>
      </div>

      {/* Main Legal Content Sections */}
      <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">1</span>
            Nature of the Service
          </h2>
          <p className="mb-3">
            Arventa Ventures Payment provides a lightweight, client-side cryptographic generator that formats Unified Payments Interface (UPI) query strings and QR codes compliant with the National Payments Corporation of India (NPCI) guidelines.
          </p>
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed">
              <strong>Non-Financial Intermediary Disclaimer:</strong> Arventa Ventures is not a bank, payment gateway, payment aggregator, or financial institution. Arventa Ventures does not process, route, hold, escrow, custody, or guarantee any funds transmitted through UPI applications.
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">2</span>
            User Responsibilities &amp; Input Accuracy
          </h2>
          <p className="mb-3">
            When creating or sharing payment links:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
            <li>
              <strong>UPI ID Accuracy:</strong> You are solely responsible for ensuring that the Virtual Payment Address (UPI ID) and recipient name you enter are accurate and actively linked to your verified bank account.
            </li>
            <li>
              <strong>Transaction Verification:</strong> Payers must always verify the payee details displayed within their authentic banking app (such as Google Pay, PhonePe, Paytm, or BHIM) before entering their UPI PIN.
            </li>
            <li>
              <strong>No Reversals via Arventa Ventures:</strong> Because no money passes through Arventa Ventures, we cannot cancel, freeze, or reverse transactions. In case of erroneous transfers, users must contact their respective bank or payment service provider (PSP).
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">3</span>
            Prohibited Activities
          </h2>
          <p className="mb-2">
            You agree not to use Arventa Ventures Payment for any of the following unlawful purposes:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc pl-5">
            <li>Conducting fraudulent schemes, phishing, unauthorized collections, or impersonation</li>
            <li>Selling illegal goods, prohibited contraband, or unauthorized digital assets</li>
            <li>Transmitting malicious code, attempting reverse-engineering, or tampering with cryptographic tokens</li>
            <li>Any activities that violate the Information Technology Act, Reserve Bank of India (RBI) directives, or applicable local laws</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">4</span>
            Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Under no circumstances shall Arventa Ventures, its founders, affiliates, or licensors be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from:
          </p>
          <ul className="space-y-1 text-xs text-slate-500 list-disc pl-5">
            <li>Failed transactions caused by bank network downtime or NPCI server errors</li>
            <li>Incorrect recipient details inputted by users</li>
            <li>Incompatibility between specific device operating systems and third-party UPI apps</li>
            <li>Unauthorized access resulting from compromised end-user devices</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">5</span>
            Governing Law &amp; Legal Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of India. For legal notices, compliance queries, or policy clarification, please contact:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-700 shrink-0" />
              <div>
                <span className="text-xs text-slate-800 font-bold block">Legal &amp; Compliance Inquiries</span>
                <a
                  href="mailto:Info@arventaventures.online"
                  className="text-sm font-bold text-indigo-600 hover:underline"
                >
                  Info@arventaventures.online
                </a>
              </div>
            </div>
            <a
              href="mailto:Info@arventaventures.online"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              Contact Legal
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
