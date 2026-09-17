import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Map, 
  Copy, 
  Check, 
  ExternalLink, 
  FileCode, 
  Globe, 
  Calendar, 
  Sparkles,
  Search
} from 'lucide-react';

interface SitemapPageProps {
  onBack: () => void;
  onShowToast?: (message: string) => void;
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  description: string;
}

const SITEMAP_URLS: SitemapUrl[] = [
  {
    loc: 'https://payment.arventaventures.online/',
    lastmod: '2026-09-17',
    changefreq: 'daily',
    priority: '1.0',
    description: 'Instant UPI Payment Link Generator & Dynamic QR Code Maker',
  },
  {
    loc: 'https://payment.arventaventures.online/support',
    lastmod: '2026-09-17',
    changefreq: 'weekly',
    priority: '0.8',
    description: 'Official Customer Support Center (Info@arventaventures.online)',
  },
  {
    loc: 'https://payment.arventaventures.online/privacy',
    lastmod: '2026-09-17',
    changefreq: 'monthly',
    priority: '0.7',
    description: 'Privacy Policy & Zero-Data-Retention Security Architecture',
  },
  {
    loc: 'https://payment.arventaventures.online/terms',
    lastmod: '2026-09-17',
    changefreq: 'monthly',
    priority: '0.7',
    description: 'Terms of Service, Acceptable Use, and Transaction Guidelines',
  },
];

const RAW_XML_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage & Instant UPI Link / QR Generator -->
  <url>
    <loc>https://payment.arventaventures.online/</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Official Customer Support Center -->
  <url>
    <loc>https://payment.arventaventures.online/support</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Privacy Policy & Zero Data Retention Architecture -->
  <url>
    <loc>https://payment.arventaventures.online/privacy</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Terms & Conditions / Legal Guidelines -->
  <url>
    <loc>https://payment.arventaventures.online/terms</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

export const SitemapPage: React.FC<SitemapPageProps> = ({ onBack, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [showRawXml, setShowRawXml] = useState(false);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(RAW_XML_STRING);
    setCopied(true);
    if (onShowToast) {
      onShowToast('sitemap.xml content copied to clipboard!');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Navigation Bar - Responsive Stack */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="whitespace-nowrap">Back to Generator</span>
        </button>
        <span className="text-[11px] sm:text-xs text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg self-start sm:self-auto">
          Protocol: Sitemaps XML 0.9
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-md mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-indigo-200 text-xs font-semibold mb-4">
            <Map className="w-3.5 h-3.5 text-indigo-300" />
            <span>Search Engine Index &amp; Crawler Registry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            XML Sitemap Index
          </h1>
          <p className="text-indigo-100 text-xs sm:text-base leading-relaxed">
            This sitemap lists all publicly indexable URLs for Arventa Ventures Payment, formatted for Google Search Console, Bing Webmaster, and automated web crawlers.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-indigo-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-indigo-50 transition-colors"
            >
              <FileCode className="w-4 h-4 text-indigo-600" />
              <span>Open Raw /sitemap.xml</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </a>

            <button
              onClick={handleCopyXml}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300">XML Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-indigo-200" />
                  <span>Copy XML Code</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowRawXml(!showRawXml)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-500/30 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <FileCode className="w-4 h-4" />
              <span>{showRawXml ? 'Hide Raw XML Code' : 'View Raw XML Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Raw XML Code Box (Toggleable) */}
      {showRawXml && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 text-white animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>/public/sitemap.xml</span>
            <button
              onClick={handleCopyXml}
              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer font-sans text-xs font-bold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-indigo-200 overflow-x-auto whitespace-pre leading-relaxed p-2 bg-slate-950/60 rounded-xl">
            {RAW_XML_STRING}
          </pre>
        </div>
      )}

      {/* Indexed URLs Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Indexed Canonical URLs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              4 primary URLs actively submitted for Google Search indexing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target: payment.arventaventures.online</span>
          </div>
        </div>

        <div className="space-y-4">
          {SITEMAP_URLS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    0{idx + 1}.
                  </span>
                  <a
                    href={item.loc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline break-all inline-flex items-center gap-1"
                  >
                    <span>{item.loc}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>
                </div>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold font-mono text-[11px]">
                  Priority: {item.priority}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-medium text-[11px]">
                  {item.changefreq}
                </span>
                <span className="text-slate-400 text-[11px] inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.lastmod}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Search Console Submission Guide */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Google Search Console Submission
            </h3>
            <p className="text-xs text-slate-500">
              Submit your sitemap URL to speed up Google crawl and indexing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 block mb-1">Step 1</span>
            <p className="text-slate-500 leading-relaxed">
              Log in to <span className="font-medium text-slate-700">Google Search Console</span> and select your property.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 block mb-1">Step 2</span>
            <p className="text-slate-500 leading-relaxed">
              Navigate to <span className="font-medium text-slate-700">Indexing &gt; Sitemaps</span> in the left navigation sidebar.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 block mb-1">Step 3</span>
            <p className="text-slate-500 leading-relaxed">
              In "Add a new sitemap", type <code className="bg-slate-200/80 px-1 py-0.5 rounded text-indigo-700 font-bold">sitemap.xml</code> and click Submit.
            </p>
          </div>
        </div>
      </div>

      {/* Return to generator button */}
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
