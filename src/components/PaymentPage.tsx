import React, { useState, useEffect } from 'react';
import { Share2, Clock, Smartphone, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import QRCode from 'qrcode';
import { PaymentData } from '../types';
import { buildUpiUri, formatInr, buildShareablePaymentUrl } from '../utils/upi';
import { ARVENTA_LOGO_DATA_URL } from '../assets/logo';

interface PaymentPageProps {
  data: PaymentData;
  onNavigateHome: () => void;
  onShowToast: (message: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  data,
  onNavigateHome,
  onShowToast,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState<boolean>(true);
  
  // 10-minute countdown timer (600 seconds)
  const TOTAL_SECONDS = 600;
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [appLaunched, setAppLaunched] = useState<boolean>(false);

  const upiUri = buildUpiUri(data);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Generate QR Code with optimal size, high error correction for center logo embedding
  useEffect(() => {
    let isMounted = true;
    setQrLoading(true);

    QRCode.toDataURL(upiUri, {
      width: 512,
      margin: 1,
      errorCorrectionLevel: 'H', // High error correction (30%) ensures reliable scanning with center logo
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setQrLoading(false);
        }
      })
      .catch((err) => {
        console.error('QR generation error:', err);
        if (isMounted) setQrLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  // Format countdown minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = Math.max(0, (timeLeft / TOTAL_SECONDS) * 100);

  const handleLaunchUpiApp = () => {
    setAppLaunched(true);
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
  };

  const handleShare = async () => {
    const shareUrl = buildShareablePaymentUrl(data);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Pay via UPI',
          text: `Pay ${formatInr(data.amount)} to ${data.name} via UPI`,
          url: shareUrl,
        });
      } catch {
        // Dismissed
      }
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        onShowToast('Payment URL copied!');
      }
    }
  };

  if (isExpired) {
    return (
      <div className="w-full h-full min-h-[100dvh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Session Expired</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            The 10-minute payment session has timed out. Please generate a new payment link to continue safely.
          </p>
          <button
            onClick={onNavigateHome}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate New Link</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between py-2 px-3 sm:px-4 max-w-md mx-auto">
      {/* 1. Sleek Top Navigation Bar (Back button removed as requested) */}
      <div className="flex items-center justify-between pb-1.5 pt-1 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 overflow-hidden">
            <img
              src={ARVENTA_LOGO_DATA_URL}
              alt="Arventa Ventures"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            Arventa Ventures Payment
          </span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="p-2 text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-xs transition-colors"
          title="Share Link"
          aria-label="Share Link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Single Compact Payment Card (All contents fit without scroll) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm p-3 sm:p-3.5 flex-1 flex flex-col justify-between my-1">
        {/* Top Info Section */}
        <div>
          {/* Timer Bar */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Link Expires In</span>
            </span>
            <span
              className={`font-mono px-2 py-0.5 rounded-md font-bold text-xs ${
                timeLeft <= 60
                  ? 'bg-rose-50 text-rose-600 animate-pulse'
                  : timeLeft <= 180
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              {formattedTime}
            </span>
          </div>

          {/* Progress countdown indicator bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                timeLeft <= 60
                  ? 'bg-rose-500'
                  : timeLeft <= 180
                  ? 'bg-amber-500'
                  : 'bg-indigo-600'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>

          {/* Amount Display */}
          <div className="text-center py-1.5 px-3 bg-gradient-to-b from-indigo-50/70 to-slate-50/40 rounded-xl border border-indigo-100/70 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
              Amount to Pay
            </span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {formatInr(data.amount)}
            </div>
          </div>

          {/* Recipient Details (UPI ID removed) */}
          <div className="bg-slate-50/90 rounded-xl border border-slate-200/70 px-3 py-1 text-xs mb-1 flex items-center justify-between">
            <div className="truncate">
              <span className="text-slate-400 text-[9px] block font-medium leading-none mb-0.5">Recipient</span>
              <span className="font-bold text-slate-800 text-xs sm:text-sm truncate block">{data.name}</span>
            </div>
            {data.message && (
              <div className="text-right truncate max-w-[160px] pl-2 border-l border-slate-200/80">
                <span className="text-slate-400 text-[9px] block font-medium leading-none mb-0.5">Note</span>
                <span className="text-slate-700 text-xs font-medium italic truncate block">"{data.message}"</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Scaled Dynamic QR Code with Larger Size & Crisp Center Company Logo */}
        <div className="flex flex-col items-center justify-center my-auto py-0.5">
          <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-slate-200 shadow-sm relative">
            {qrLoading ? (
              <div className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] flex items-center justify-center bg-slate-50 rounded-xl">
                <div className="w-8 h-8 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={qrDataUrl}
                  alt="UPI QR Code"
                  className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] object-contain rounded-xl block"
                />
                {/* Center Company Circular Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white shadow-md border-2 border-slate-200 flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={ARVENTA_LOGO_DATA_URL}
                      alt="Arventa Ventures Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase mt-1.5">
            Scan to Pay via any UPI App
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium mt-0.5">
            <span>Google Pay</span>
            <span>•</span>
            <span>PhonePe</span>
            <span>•</span>
            <span>Paytm</span>
            <span>•</span>
            <span>BHIM</span>
          </div>
        </div>

        {/* 4. Action Button Area */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-1 text-[10px]">
            <span className="font-semibold text-slate-500 uppercase tracking-wider">
              Pay Directly
            </span>
            <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-1.5 py-0.2 rounded-full">
              Recommended on Mobile
            </span>
          </div>

          <button
            id="continue-to-payment-app-btn"
            type="button"
            onClick={handleLaunchUpiApp}
            className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 active:scale-[0.99] transition-all"
          >
            <Smartphone className="w-4 h-4 text-indigo-200" />
            <span>Continue to Payment App</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-200" />
          </button>

          {appLaunched && (
            <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/80 rounded-lg p-1.5 mt-1 text-center font-medium">
              Complete the payment in your UPI app.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
