import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { PaymentData } from './types';
import {
  buildShareablePaymentUrl,
  parsePaymentDataFromUrl,
} from './utils/upi';
import { ARVENTA_LOGO_DATA_URL } from './assets/logo';
import { Header } from './components/Header';
import { PaymentForm } from './components/PaymentForm';
import { GeneratedLinkCard } from './components/GeneratedLinkCard';
import { PaymentPage } from './components/PaymentPage';
import { ErrorState } from './components/ErrorState';
import { HowItWorks } from './components/HowItWorks';
import { PrivacyNote } from './components/PrivacyNote';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

interface RouteState {
  currentView: 'home' | 'pay';
  activePaymentData: PaymentData | null;
  routeError: { title: string; message: string; buttonLabel: string } | null;
  isLoading: boolean;
}

/**
 * Evaluates the initial URL synchronously before first render
 * so the home page never flashes on payment links.
 */
function computeInitialRouteState(): RouteState {
  if (typeof window === 'undefined') {
    return {
      currentView: 'home',
      activePaymentData: null,
      routeError: null,
      isLoading: false,
    };
  }

  const { isPaymentRoute, data, error } = parsePaymentDataFromUrl();

  if (isPaymentRoute) {
    if (data) {
      return {
        currentView: 'pay',
        activePaymentData: data,
        routeError: null,
        isLoading: true, // Smooth branded loader before revealing payment page
      };
    } else {
      return {
        currentView: 'pay',
        activePaymentData: null,
        routeError: {
          title: 'Invalid Payment Link',
          message:
            error ||
            'This payment link is invalid or has been modified. The security pattern could not be verified.',
          buttonLabel: 'Create New Payment Link',
        },
        isLoading: false,
      };
    }
  }

  return {
    currentView: 'home',
    activePaymentData: null,
    routeError: null,
    isLoading: false,
  };
}

export default function App() {
  const [routeState, setRouteState] = useState<RouteState>(computeInitialRouteState);

  // Home generator state
  const [generatedResult, setGeneratedResult] = useState<{
    url: string;
    data: PaymentData;
  } | null>(null);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smoothly transition from loader to payment page
  useEffect(() => {
    if (routeState.isLoading) {
      const timer = setTimeout(() => {
        setRouteState((prev) => ({ ...prev, isLoading: false }));
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [routeState.isLoading]);

  // Parse location and sync view on browser back/forward buttons
  const syncRouteFromLocation = useCallback(() => {
    const { isPaymentRoute, data, error } = parsePaymentDataFromUrl();

    if (isPaymentRoute) {
      if (data) {
        setRouteState({
          currentView: 'pay',
          activePaymentData: data,
          routeError: null,
          isLoading: false,
        });
      } else {
        setRouteState({
          currentView: 'pay',
          activePaymentData: null,
          routeError: {
            title: 'Invalid Payment Link',
            message:
              error ||
              'This payment link is invalid or has been modified. The security pattern could not be verified.',
            buttonLabel: 'Create New Payment Link',
          },
          isLoading: false,
        });
      }
    } else {
      setRouteState({
        currentView: 'home',
        activePaymentData: null,
        routeError: null,
        isLoading: false,
      });
    }
  }, []);

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      syncRouteFromLocation();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [syncRouteFromLocation]);

  // Navigate to /pay client-side
  const handleOpenPaymentPage = (url?: string, data?: PaymentData) => {
    const targetUrl = url || (generatedResult ? generatedResult.url : null);
    const targetData = data || (generatedResult ? generatedResult.data : null);

    if (targetUrl && targetData) {
      window.history.pushState({}, '', targetUrl);
      setRouteState({
        currentView: 'pay',
        activePaymentData: targetData,
        routeError: null,
        isLoading: false,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigate back to generator home
  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setRouteState({
      currentView: 'home',
      activePaymentData: null,
      routeError: null,
      isLoading: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for "Generate Payment Link"
  const handleGenerateLink = (data: PaymentData) => {
    const shareableUrl = buildShareablePaymentUrl(data);
    setGeneratedResult({
      url: shareableUrl,
      data,
    });
    setToastMessage('Payment link generated!');

    // Smooth scroll down to result
    setTimeout(() => {
      const resultElem = document.getElementById('generated-link-section');
      if (resultElem) {
        resultElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleResetGenerator = () => {
    setGeneratedResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { currentView, activePaymentData, routeError, isLoading } = routeState;

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50/70 text-slate-900 selection:bg-indigo-500 selection:text-white ${
        currentView === 'pay' ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : ''
      }`}
    >
      {/* Universal Header (Only shown on home/generator view) */}
      {currentView !== 'pay' && (
        <Header
          onBackToHome={undefined}
          showBackButton={false}
        />
      )}

      {/* Main Container */}
      <main
        className={`flex-1 w-full ${
          currentView === 'pay'
            ? 'h-full max-h-[100dvh] overflow-hidden p-0'
            : 'max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10'
        }`}
      >
        {currentView === 'pay' ? (
          // Payment Page Route View
          isLoading ? (
            // Branded Loading State when opening a payment link
            <div className="w-full h-[100dvh] flex flex-col items-center justify-center p-4 bg-slate-50 select-none">
              <div className="relative mb-3.5">
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1.5 overflow-hidden">
                  <img
                    src={ARVENTA_LOGO_DATA_URL}
                    alt="Arventa Ventures"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="absolute -inset-1 rounded-full border-2 border-indigo-600/30 border-t-indigo-600 animate-spin" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Arventa Ventures Payment
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-1 animate-pulse">
                Securing payment session...
              </p>
            </div>
          ) : routeError ? (
            <div className="max-w-lg mx-auto py-8 px-4">
              <ErrorState
                title={routeError.title}
                message={routeError.message}
                buttonLabel={routeError.buttonLabel}
                onAction={handleNavigateHome}
              />
            </div>
          ) : activePaymentData ? (
            <PaymentPage
              data={activePaymentData}
              onNavigateHome={handleNavigateHome}
              onShowToast={setToastMessage}
            />
          ) : (
            <div className="max-w-lg mx-auto py-8 px-4">
              <ErrorState
                title="Payment Link Not Found"
                message="The payment link is missing or invalid."
                buttonLabel="Create Payment Link"
                onAction={handleNavigateHome}
              />
            </div>
          )
        ) : (
          // Homepage Generator View
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-4 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instant Client-Side UPI Generator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Create Secure UPI Payment Links Instantly
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
                Generate shareable, self-contained payment links and dynamic QR codes with no server storage, database, or sign-up needed.
              </p>
            </div>

            {/* Generator Card */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden transition-all">
                {/* Form Card Header */}
                <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/90 flex items-center justify-center text-white shadow-xs">
                      <ShieldCheck className="w-5 h-5 text-indigo-100" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight">
                        Payment Generator
                      </h3>
                      <p className="text-xs text-slate-400">
                        Enter payee details to create your link
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    UPI v2.0
                  </span>
                </div>

                {/* Form Inputs */}
                <div className="p-5 sm:p-7">
                  <PaymentForm onGenerate={handleGenerateLink} />
                </div>
              </div>
            </div>

            {/* Generated Link Result Section */}
            {generatedResult && (
              <div id="generated-link-section" className="max-w-xl mx-auto pt-2 animate-in fade-in duration-300">
                <GeneratedLinkCard
                  paymentUrl={generatedResult.url}
                  paymentData={generatedResult.data}
                  onOpenPaymentPage={() => handleOpenPaymentPage()}
                  onReset={handleResetGenerator}
                  onShowToast={setToastMessage}
                />
              </div>
            )}

            {/* Privacy Note */}
            <PrivacyNote />

            {/* How It Works Section */}
            <HowItWorks />
          </div>
        )}
      </main>

      {/* Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Universal Footer (Only shown on home view) */}
      {currentView !== 'pay' && <Footer />}
    </div>
  );
}
