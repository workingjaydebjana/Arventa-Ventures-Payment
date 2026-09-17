import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  Building2, 
  Smartphone, 
  Briefcase, 
  ShoppingBag, 
  QrCode, 
  Link as LinkIcon, 
  ArrowRight 
} from 'lucide-react';

export const SeoFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Why Choose Arventa Ventures Payment</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          The Ultimate Free UPI Payment Link &amp; Dynamic QR Generator
        </h2>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
          Accept direct bank-to-bank UPI payments with zero transaction fees, no gateway onboarding delays, and 100% client-side privacy.
        </p>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              0% Gateway Fees &amp; Commissions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Save 2% to 3% transaction charges that traditional payment gateways take. Keep 100% of your earnings with direct peer-to-peer bank transfers.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant Bank Settlement</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Tamper-Proof Link Integrity
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every payment link is cryptographically protected. If any fraudster attempts to change the amount or UPI ID, the link immediately invalidates.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-indigo-700 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>100% Client-Side Engine</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Universal UPI App Compatibility
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              One link works everywhere. Automatically triggers Google Pay, PhonePe, Paytm, BHIM, CRED, Amazon Pay, or any bank app on mobile devices.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-purple-700 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>Official NPCI UPI Protocol</span>
          </div>
        </div>
      </div>

      {/* Supported Apps Badges */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs mb-10 text-center">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Supported Indian UPI Apps &amp; Mobile Banking Platforms
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { name: 'Google Pay (GPay)', color: 'border-blue-200 bg-blue-50/60 text-blue-700' },
            { name: 'PhonePe', color: 'border-purple-200 bg-purple-50/60 text-purple-700' },
            { name: 'Paytm UPI', color: 'border-sky-200 bg-sky-50/60 text-sky-700' },
            { name: 'BHIM UPI', color: 'border-amber-200 bg-amber-50/60 text-amber-700' },
            { name: 'CRED UPI', color: 'border-slate-200 bg-slate-50 text-slate-800' },
            { name: 'Amazon Pay', color: 'border-orange-200 bg-orange-50/60 text-orange-700' },
            { name: 'WhatsApp Pay', color: 'border-emerald-200 bg-emerald-50/60 text-emerald-700' },
            { name: 'SBI YONO', color: 'border-indigo-200 bg-indigo-50/60 text-indigo-700' },
            { name: 'HDFC PayZapp', color: 'border-blue-200 bg-blue-50/60 text-blue-800' },
            { name: 'ICICI iMobile', color: 'border-red-200 bg-red-50/60 text-red-700' },
            { name: 'Axis Mobile', color: 'border-pink-200 bg-pink-50/60 text-pink-700' },
          ].map((app) => (
            <span
              key={app.name}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${app.color} transition-all`}
            >
              {app.name}
            </span>
          ))}
        </div>
      </div>

      {/* Popular Use Cases for Search Ranking */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">
            High Search Intent Use Cases
          </span>
          <h3 className="text-lg sm:text-2xl font-bold tracking-tight">
            Who Can Benefit from Arventa Ventures Payment Links?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
            Designed for businesses, independent professionals, and merchants seeking zero-friction UPI collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2.5 mb-2">
              <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
              <h4 className="text-sm font-bold text-white">Freelancers &amp; Agency Invoicing</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Include direct UPI payment links with pre-set invoice amounts in PDF invoices or WhatsApp messages for instantaneous client payments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2.5 mb-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
              <h4 className="text-sm font-bold text-white">Social Commerce &amp; Instagram Sellers</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Send one-tap payment links via Instagram DM, WhatsApp Business, or Telegram without needing an expensive shopping cart gateway.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2.5 mb-2">
              <QrCode className="w-4 h-4 text-amber-400 shrink-0" />
              <h4 className="text-sm font-bold text-white">Shops &amp; Retail POS Counters</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate dynamic QR codes for custom billing amounts on counter tablets or screens, eliminating manual amount entry errors by customers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2.5 mb-2">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <h4 className="text-sm font-bold text-white">Events, Ticketing &amp; Donations</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Collect event entry fees or non-profit donations with clear transaction notes and transparent direct-to-bank settlement.
            </p>
          </div>
        </div>

        {/* Call to action anchor */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Ready to generate your first custom UPI link or dynamic QR code?
          </span>
          <a
            href="#generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
          >
            <span>Create Payment Link Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
