import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Check } from 'lucide-react';

interface QRCodeCardProps {
  qrData: string;
  title?: string;
  subtitle?: string;
  downloadFilename?: string;
  size?: number;
}

const ARVENTA_LOGO_URL = 'https://i.ibb.co/sd4BdMsr/FB-IMG-1786329349374-removebg-preview.png';

export const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrData,
  title = 'Scan to Pay',
  subtitle = 'Scan this QR code using your UPI app to continue',
  downloadFilename = 'arventa-payment-qr.png',
  size = 240,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedQr, setCopiedQr] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    QRCode.toDataURL(qrData, {
      width: size * 2, // render 2x for retina sharpness
      margin: 1.5,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) {
          setDataUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('QR generation error:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [qrData, size]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyImage = async () => {
    if (!dataUrl || !navigator.clipboard) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopiedQr(true);
      setTimeout(() => setCopiedQr(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {title && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
          <QrCode className="w-4 h-4 text-indigo-600" />
          <span>{title}</span>
        </div>
      )}

      {/* QR Container */}
      <div className="relative p-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-transform hover:scale-[1.01]">
        {loading ? (
          <div
            className="flex items-center justify-center bg-slate-50 rounded-xl"
            style={{ width: size, height: size }}
          >
            <div className="w-8 h-8 border-2 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative group">
            <img
              src={dataUrl}
              alt="Payment QR Code"
              width={size}
              height={size}
              className="rounded-lg object-contain mx-auto block"
              referrerPolicy="no-referrer"
            />
            {/* Center Company Logo Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white shadow-md border-2 border-slate-100 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src={ARVENTA_LOGO_URL}
                  alt="Company Logo"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!dataUrl}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
          title="Download QR code image"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save QR</span>
        </button>

        {typeof ClipboardItem !== 'undefined' && (
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={!dataUrl}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
            title="Copy QR image to clipboard"
          >
            {copiedQr ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <QrCode className="w-3.5 h-3.5" />
                <span>Copy QR</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* UPI Brand logos strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 w-full max-w-xs flex items-center justify-center gap-3 text-[11px] text-slate-400 font-semibold tracking-wider">
        <span className="text-slate-500">BHIM</span>
        <span>•</span>
        <span className="text-slate-500">Google Pay</span>
        <span>•</span>
        <span className="text-slate-500">PhonePe</span>
        <span>•</span>
        <span className="text-slate-500">Paytm</span>
      </div>
    </div>
  );
};
