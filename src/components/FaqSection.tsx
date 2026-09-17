import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I create an instant UPI payment link?',
    answer:
      'Enter the recipient UPI ID (VPA), amount in Indian Rupees (INR), payee name, and an optional message or note. Click "Generate Payment Link" to instantly receive a shareable link and branded dynamic QR code ready for instant payments.',
  },
  {
    question: 'Can customers pay using Google Pay, PhonePe, Paytm, or BHIM?',
    answer:
      'Yes. The payment links and dynamic QR codes adhere strictly to the National Payments Corporation of India (NPCI) universal upi:// protocol standard, supporting Google Pay, PhonePe, Paytm, BHIM, CRED, Amazon Pay, and all Indian mobile banking apps.',
  },
  {
    question: 'Are my payment details or bank information saved on a server?',
    answer:
      'No. Arventa Ventures Payment uses 100% client-side cryptographic encoding. No database, server, or tracking cookie stores your payment details. All payment parameters are safely encapsulated directly within the self-contained URL.',
  },
  {
    question: 'Can the payment link be tampered with or modified?',
    answer:
      'No. Every generated payment link incorporates a deterministic cryptographic checksum signature. If any parameter (such as the amount or UPI ID) is modified in the URL, the link becomes invalid and the application prevents unauthorized transactions.',
  },
  {
    question: 'Can I share the payment link via WhatsApp, SMS, or Email?',
    answer:
      'Absolutely. With one click, you can copy the link or share it directly across WhatsApp, Telegram, SMS, or social media. Anyone opening the link is taken directly to the streamlined payment page with one-tap UPI app launching.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Everything You Need to Know
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
          Common questions about Arventa Ventures UPI payment link and QR generator.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-hidden hover:bg-slate-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-slate-800">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
