import React, { useState } from 'react';
import { Smartphone, Info, ArrowUpRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PaymentData } from '../types';
import { buildUpiUri } from '../utils/upi';

interface ContinuePaymentButtonProps {
  paymentData: PaymentData;
}

export const ContinuePaymentButton: React.FC<ContinuePaymentButtonProps> = ({ paymentData }) => {
  const [initiated, setInitiated] = useState<boolean>(false);
  const [showDeviceHelp, setShowDeviceHelp] = useState<boolean>(false);

  const upiUri = buildUpiUri(paymentData);

  const handleOpenUpiApp = () => {
    setInitiated(true);

    // Create an invisible anchor tag to trigger the custom protocol
    try {
      const link = document.createElement('a');
      link.href = upiUri;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = upiUri;
    }

    // After 2.5 seconds, if the user is still on this browser tab (common on desktop or when no handler exists),
    // show the helpful instruction to scan the QR code instead.
    setTimeout(() => {
      setShowDeviceHelp(true);
    }, 2000);
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Continue Button */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Direct App Payment
          </span>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-full tracking-wide">
            Recommended on Mobile
          </span>
        </div>

        <button
          id="continue-to-payment-app-btn"
          type="button"
          onClick={handleOpenUpiApp}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all active:scale-[0.99] group"
        >
          <Smartphone className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
          <span>Continue to Payment App</span>
          <ArrowUpRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Safety & App Launch Notice */}
      {initiated ? (
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-left space-y-2 animate-in fade-in duration-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900">
                Complete the payment in your UPI app.
              </p>
              <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                We've prompted your default UPI application (PhonePe, Google Pay, Paytm, BHIM). Check your app to verify the amount and complete your PIN entry.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/50 text-[11px] text-amber-800 flex items-center justify-between">
            <span>Did your app not open automatically?</span>
            <button
              type="button"
              onClick={() => setShowDeviceHelp(true)}
              className="font-semibold underline hover:text-amber-950"
            >
              See alternative
            </button>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Opens supported UPI apps installed on your device.</span>
        </p>
      )}

      {/* Desktop / Fallback Help Card */}
      {showDeviceHelp && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>UPI App Didn't Open?</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            If you are using a desktop browser or an unsupported environment, please scan the QR code above using your mobile camera or your phone’s UPI app (Google Pay, PhonePe, Paytm, or BHIM).
          </p>
        </div>
      )}

      {/* Explicit Disclaimer mandated by requirement 10 */}
      <div className="text-[10px] text-slate-400 text-center leading-normal pt-1">
        Notice: Arventa Ventures Payment facilitates the UPI transaction initiation. We do not process banking funds or verify transaction completion.
      </div>
    </div>
  );
};
