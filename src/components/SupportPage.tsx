import React, { useState } from 'react';
import { 
  Mail, 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  HelpCircle, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBack, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const supportEmail = 'Info@arventaventures.online';

  // Contact form state for direct email link composition
  const [subject, setSubject] = useState('Payment Link Assistance Inquiry');
  const [userMessage, setUserMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    onShowToast('Support email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSubject = encodeURIComponent(subject || 'Inquiry - Arventa Ventures Payment');
    const bodyText = `Hi Arventa Ventures Support Team,\n\nName: ${senderName || 'Not specified'}\n\nMessage:\n${userMessage || 'I need assistance regarding payment links.'}\n\n---\nSent from payment.arventaventures.online`;
    const encodedBody = encodeURIComponent(bodyText);
    
    window.location.href = `mailto:${supportEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    onShowToast('Opening your default mail app...');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Navigation Bar - Responsive Stack on Mobile */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="whitespace-nowrap">Back to Generator</span>
        </button>
        <span className="text-[11px] sm:text-xs text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg self-start sm:self-auto">
          Official Support Center
        </span>
      </div>

      {/* Hero Support Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-md mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-indigo-200 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Dedicated Customer Care &amp; Technical Help</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            How can we help you today?
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed mb-6">
            Have questions about UPI links, dynamic QR codes, or payment security? Our dedicated support team at Arventa Ventures is here to help.
          </p>

          {/* Primary Featured Support Email Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-white shrink-0">
                <Mail className="w-6 h-6 text-indigo-200" />
              </div>
              <div>
                <span className="text-xs text-indigo-200 block font-medium">Primary Support Email</span>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${supportEmail}?subject=Support%20Inquiry%20-%20Arventa%20Ventures%20Payment`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Write Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Support SLA & Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Fast Turnaround</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We respond to all support tickets and inquiries within <strong>24 business hours</strong>.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Official Assistance</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Direct verification and technical troubleshooting from Arventa Ventures engineers.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">100% Free Support</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Assistance with generating links, embedding QR codes, or UPI troubleshooting is completely free.
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column: Quick Contact Form & Troubleshooting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Email Composer (Left Column) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Send an Inquiry to Support</h2>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Fill in the details below to launch an email to <span className="font-semibold text-slate-700">{supportEmail}</span>.
          </p>

          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe or Business Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Inquiry Topic / Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Payment Link Assistance Inquiry">Payment Link Assistance</option>
                <option value="UPI QR Code Scanning Question">UPI QR Code Scanning Question</option>
                <option value="Payment App Deep Linking Issue">Payment App (GPay/PhonePe/Paytm) Deep Linking Issue</option>
                <option value="Security or Privacy Question">Security or Privacy Question</option>
                <option value="Business or Custom Integration Request">Business or Custom Integration Request</option>
                <option value="General Feedback or Suggestion">General Feedback or Suggestion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Message Details
              </label>
              <textarea
                rows={4}
                required
                placeholder="Please describe your question or issue in detail..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Compose Email to {supportEmail}</span>
            </button>
          </form>
        </div>

        {/* Common Troubleshooting Guides (Right Column) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Frequently Asked Support Topics</h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block mb-1">
                  Why does a payment link say &quot;Invalid Link&quot;?
                </span>
                <p className="leading-relaxed">
                  Payment links are tamper-protected with cryptographic tokens. If any character in the URL was altered or truncated when copying, the link will be rejected for security. Simply re-generate a new link from the home page.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block mb-1">
                  Can payers pay on a desktop computer?
                </span>
                <p className="leading-relaxed">
                  Yes! When viewing the payment page on a desktop, the payer simply scans the high-resolution QR code on screen using Google Pay, PhonePe, Paytm, or BHIM on their phone.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block mb-1">
                  Are payments delayed or held?
                </span>
                <p className="leading-relaxed">
                  Never. Payments transfer instantly bank-to-bank via the NPCI UPI network. Arventa Ventures never touches or routes funds.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Organization Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs text-xs text-slate-500">
            <span className="font-bold text-slate-800 block mb-1">Official Company Information</span>
            <p><strong>Platform:</strong> payment.arventaventures.online</p>
            <p><strong>Parent Organization:</strong> Arventa Ventures</p>
            <p><strong>Official Website:</strong> <a href="https://arventaventures.online" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">arventaventures.online</a></p>
            <p className="mt-2 text-[11px] text-slate-400">
              For security reports or business partnerships, contact <span className="font-mono text-slate-600">{supportEmail}</span>.
            </p>
          </div>
        </div>
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
