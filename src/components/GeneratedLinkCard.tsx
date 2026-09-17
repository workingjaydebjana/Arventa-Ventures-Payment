import React, { useState } from 'react';
import { Copy, Check, ExternalLink, RefreshCw, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PaymentData } from '../types';
import { formatInr, buildUpiUri } from '../utils/upi';
import { QRCodeCard } from './QRCodeCard';

interface GeneratedLinkCardProps {
  paymentUrl: string;
  paymentData: PaymentData;
  onOpenPaymentPage: () => void;
  onReset: () => void;
  onShowToast: (message: string) => void;
}

export const GeneratedLinkCard: React.FC<GeneratedLinkCardProps> = ({
  paymentUrl,
  paymentData,
  onOpenPaymentPage,
  onReset,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const upiUri = buildUpiUri(paymentData);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(paymentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = paymentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      onShowToast('Payment link copied!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
      onShowToast('Could not copy link to clipboard');
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Payment Request: ${formatInr(paymentData.amount)} for ${paymentData.name}`,
          text: `Pay ${formatInr(paymentData.amount)} to ${paymentData.name} (${paymentData.upiId}) via UPI`,
          url: paymentUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-transparent border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Payment Link Generated
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Self-contained, shareable, client-side link ready to distribute
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New Link</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Recipient & Amount Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Recipient:</span>
            <span className="font-semibold text-slate-800 text-sm">{paymentData.name}</span>
            <span className="text-slate-500 font-mono block text-[11px] mt-0.5">{paymentData.upiId}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-slate-400 font-medium block">Amount:</span>
            <span className="font-display font-bold text-indigo-700 text-base">
              {formatInr(paymentData.amount)}
            </span>
            {paymentData.message && (
              <span className="text-slate-500 block truncate text-[11px] mt-0.5" title={paymentData.message}>
                Note: {paymentData.message}
              </span>
            )}
          </div>
        </div>

        {/* Generated URL Box */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Shareable Payment URL
          </label>
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="flex-1 bg-slate-900 text-slate-200 font-mono text-xs px-3.5 py-3 rounded-xl overflow-x-auto whitespace-nowrap border border-slate-800 shadow-inner flex items-center">
              <span className="select-all">{paymentUrl}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="copy-payment-link-btn"
                onClick={handleCopy}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleShareNative}
                  className="p-3 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl border border-slate-200/80 transition-colors"
                  title="Share payment link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action to Open Payment Page */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            id="open-payment-page-btn"
            onClick={onOpenPaymentPage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
          >
            <span>Open Payment Page</span>
            <ExternalLink className="w-4 h-4 text-slate-300" />
          </button>

          <p className="text-xs text-slate-500 text-center sm:text-right">
            Anyone with this link can scan or open their UPI app directly.
          </p>
        </div>

        {/* Embedded QR Code preview */}
        <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
          <QRCodeCard
            qrData={upiUri}
            title="Instant QR Code"
            subtitle="Payer can scan this code with Google Pay, PhonePe, Paytm, or BHIM"
            size={200}
            downloadFilename={`upi-pay-${paymentData.amount}.png`}
          />
        </div>

        {/* Trust badge */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            This link is tamper-proof and encrypted. No payee details or amounts are visible in the URL. Any modification or pattern break will immediately invalidate the link.
          </p>
        </div>
      </div>
    </div>
  );
};
