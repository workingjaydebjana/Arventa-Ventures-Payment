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
import { FaqSection } from './components/FaqSection';
import { SeoFeaturesSection } from './components/SeoFeaturesSection';
import { PrivacyNote } from './components/PrivacyNote';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { SupportPage } from './components/SupportPage';

export type AppView = 'home' | 'pay' | 'privacy' | 'terms' | 'support';

interface RouteState {
  currentView: AppView;
  activePaymentData: PaymentData | null;
  routeError: { title: string; message: string; buttonLabel: string } | null;
  isLoading: boolean;
}

/**
 * Parses pathname or hash to identify statutory legal or support views
 */
function detectStaticViewFromUrl(): 'privacy' | 'terms' | 'support' | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();

  if (path === '/privacy' || hash === '#/privacy' || hash === '#privacy') {
    return 'privacy';
  }
  if (path === '/terms' || hash === '#/terms' || hash === '#terms') {
    return 'terms';
  }
  if (
    path === '/support' ||
    hash === '#/support' ||
    hash === '#support' ||
    path === '/contact' ||
    hash === '#/contact'
  ) {
    return 'support';
  }
  return null;
}

/**
 * Evaluates the initial URL synchronously before first render
 * so the home page never flashes on payment or legal links.
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

  // 1. Check statutory pages (Privacy, Terms, Support)
  const staticView = detectStaticViewFromUrl();
  if (staticView) {
    return {
      currentView: staticView,
      activePaymentData: null,
      routeError: null,
      isLoading: false,
    };
  }

  // 2. Check payment deep link
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
    const staticView = detectStaticViewFromUrl();
    if (staticView) {
      setRouteState({
        currentView: staticView,
        activePaymentData: null,
        routeError: null,
        isLoading: false,
      });
      return;
    }

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

  // Listen to browser navigation (back/forward and hash changes)
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

  // Navigation router handler
  const handleNavigateTo = (view: AppView) => {
    if (view === 'home') {
      window.history.pushState({}, '', '/');
      setRouteState({
        currentView: 'home',
        activePaymentData: null,
        routeError: null,
        isLoading: false,
      });
    } else {
      window.history.pushState({}, '', `/${view}`);
      setRouteState({
        currentView: view,
        activePaymentData: null,
        routeError: null,
        isLoading: false,
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    handleNavigateTo('home');
  };

  // Generate payment link from form inputs
  const handleGenerateLink = (data: PaymentData) => {
    const shareableUrl = buildShareablePaymentUrl(data);
    setGeneratedResult({
      url: shareableUrl,
      data: data,
    });

    setToastMessage('UPI payment link generated successfully!');

    // Smoothly scroll down to the generated link section on mobile
    setTimeout(() => {
      const section = document.getElementById('generated-link-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Reset generator to initial clean state
  const handleResetGenerator = () => {
    setGeneratedResult(null);
    setToastMessage('Generator reset');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { currentView, activePaymentData, routeError, isLoading } = routeState;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header - Always rendered with view-aware actions */}
      <Header
        onBackToHome={currentView !== 'home' ? handleNavigateHome : undefined}
        showBackButton={currentView !== 'home'}
        onNavigate={handleNavigateTo}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {isLoading ? (
          // Transition Loader
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-white shadow-xs">
                  <img
                    src={ARVENTA_LOGO_DATA_URL}
                    alt="Arventa"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-slate-800 tracking-tight block">
                Arventa Ventures Payment
              </span>
              <span className="text-xs text-slate-400">
                Verifying secure payment parameters...
              </span>
            </div>
          </div>
        ) : currentView === 'privacy' ? (
          // Privacy Policy Page
          <PrivacyPolicyPage onBack={handleNavigateHome} />
        ) : currentView === 'terms' ? (
          // Terms & Conditions Page
          <TermsPage onBack={handleNavigateHome} />
        ) : currentView === 'support' ? (
          // Support & Contact Page
          <SupportPage onBack={handleNavigateHome} onShowToast={setToastMessage} />
        ) : currentView === 'pay' ? (
          // Payment Page View
          routeError ? (
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
              <h1 id="main-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Create Secure UPI Payment Links Instantly
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
                Generate shareable, self-contained payment links and dynamic QR codes with no server storage, database, or sign-up needed.
              </p>
            </div>

            {/* Generator Card */}
            <div id="generator" className="max-w-xl mx-auto scroll-mt-20">
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

            {/* Popular Use Cases & Features (High-Volume Search Intent) */}
            <SeoFeaturesSection />

            {/* Frequently Asked Questions (SEO & User Assurance) */}
            <FaqSection />
          </div>
        )}
      </main>

      {/* Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Universal Footer (Shown on all views except active payment view) */}
      {currentView !== 'pay' && <Footer onNavigate={handleNavigateTo} />}
    </div>
  );
}
