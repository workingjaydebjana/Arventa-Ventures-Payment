import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Check } from 'lucide-react';
import { ARVENTA_LOGO_DATA_URL } from '../assets/logo';

interface QRCodeCardProps {
  qrData: string;
  title?: string;
  subtitle?: string;
  downloadFilename?: string;
  size?: number;
}

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

    const renderQrWithCenterLogo = async () => {
      try {
        const canvas = document.createElement('canvas');
        const renderSize = Math.max(512, size * 2);
        canvas.width = renderSize;
        canvas.height = renderSize;

        // 1. Generate QR Code onto canvas with High ('H') error correction (up to 30% recovery)
        await QRCode.toCanvas(canvas, qrData, {
          width: renderSize,
          margin: 1.5,
          errorCorrectionLevel: 'H',
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        });

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const center = renderSize / 2;
          const badgeRadius = renderSize * 0.13; // ~26% diameter, completely safe with 30% error tolerance

          // 2. Draw circular white badge in the center
          ctx.save();
          ctx.beginPath();
          ctx.arc(center, center, badgeRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(15, 23, 42, 0.2)';
          ctx.shadowBlur = Math.round(renderSize * 0.015);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.lineWidth = Math.max(2, Math.round(renderSize * 0.01));
          ctx.strokeStyle = '#e2e8f0';
          ctx.stroke();

          // 3. Load & draw the bold Arventa Ventures logo directly onto the canvas
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.arc(center, center, badgeRadius - 2, 0, Math.PI * 2);
              ctx.clip();
              const logoSize = badgeRadius * 1.55;
              ctx.drawImage(
                img,
                center - logoSize / 2,
                center - logoSize / 2,
                logoSize,
                logoSize
              );
              ctx.restore();
              resolve();
            };
            img.onerror = () => resolve();
            img.src = ARVENTA_LOGO_DATA_URL;
          });
          ctx.restore();
        }

        if (isMounted) {
          setDataUrl(canvas.toDataURL('image/png'));
          setLoading(false);
        }
      } catch (err) {
        console.error('QR generation error:', err);
        // Fallback to basic QR code without logo on canvas
        try {
          const basicUrl = await QRCode.toDataURL(qrData, {
            width: size * 2,
            margin: 1.5,
            errorCorrectionLevel: 'H',
            color: { dark: '#0f172a', light: '#ffffff' },
          });
          if (isMounted) {
            setDataUrl(basicUrl);
            setLoading(false);
          }
        } catch {
          if (isMounted) setLoading(false);
        }
      }
    };

    renderQrWithCenterLogo();

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
              alt="Payment QR Code with Arventa Logo"
              width={size}
              height={size}
              className="rounded-lg object-contain mx-auto block"
              referrerPolicy="no-referrer"
            />
            {/* Center Company Logo Overlay for extra sharpness */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-13 h-13 rounded-full bg-white shadow-md border-2 border-slate-200 flex items-center justify-center p-1.5 overflow-hidden">
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
