import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I create a free UPI payment link with custom amount?',
    answer:
      'Enter the payee UPI ID (Virtual Payment Address like yourname@okaxis, yourname@ybl, or mobile@paytm), recipient name, exact amount in Indian Rupees (INR), and an optional memo/note. Click "Generate Payment Link" to instantly receive a tamper-proof shareable URL and dynamic scannable QR code.',
  },
  {
    question: 'Can customers pay using Google Pay, PhonePe, Paytm, or BHIM?',
    answer:
      'Yes. The payment links and dynamic QR codes adhere strictly to the National Payments Corporation of India (NPCI) universal upi://pay specification. It works seamlessly with Google Pay (GPay), PhonePe, Paytm, BHIM, CRED UPI, Amazon Pay, WhatsApp Pay, and all Indian mobile banking apps (SBI YONO, HDFC PayZapp, ICICI iMobile, Axis Pay).',
  },
  {
    question: 'Is there any transaction fee, commission, or hidden charge?',
    answer:
      'No. Arventa Ventures Payment is 100% free with 0% transaction fees. Unlike commercial payment gateways that charge 2% to 3% plus GST on every transaction, Arventa Ventures uses direct peer-to-peer (P2P) and peer-to-merchant (P2M) UPI protocols where funds settle directly into your bank account without deductions.',
  },
  {
    question: 'How is this different from payment gateways like Razorpay or Cashfree?',
    answer:
      'Traditional payment gateways require company registration, KYC approvals, days of merchant onboarding, and hold your funds for 2-3 settlement days before depositing them. Arventa Ventures requires zero sign-up, zero paperwork, zero database storage, and delivers instant bank settlement directly to your UPI-linked bank account in seconds.',
  },
  {
    question: 'Are my payment details or bank information saved on any server?',
    answer:
      'No. Arventa Ventures Payment operates with a strict Zero-Data-Retention architecture. Everything is calculated in client-side browser memory. No server database stores your UPI ID, recipient name, or payment amount. All data is securely encapsulated inside the URL with cryptographic tamper-proofing.',
  },
  {
    question: 'Can a buyer tamper with or alter the payment amount in the link?',
    answer:
      'No. Every generated payment link incorporates a deterministic cryptographic checksum token. If anyone alters the amount, recipient UPI ID, or payee name in the URL parameters, the payment page automatically detects tampering, flags the link as invalid, and blocks the payment flow for security.',
  },
  {
    question: 'What is the maximum UPI payment limit per transaction in India?',
    answer:
      'As per Reserve Bank of India (RBI) and NPCI guidelines, standard UPI peer-to-peer transactions allow up to ₹1,00,000 (1 Lakh INR) per transaction/day. Verified merchant categories (such as education, healthcare, and capital markets) permit limits up to ₹2,00,000 to ₹5,00,000 depending on the issuing bank.',
  },
  {
    question: 'Can I share the payment link via WhatsApp, SMS, or Email?',
    answer:
      'Yes. You can copy the generated payment link with one click and send it via WhatsApp, Telegram, SMS, Email, or social media. When mobile users click the link, it opens a clean payment screen with instant buttons to launch Google Pay, PhonePe, Paytm, or BHIM directly.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Everything You Need to Know About UPI Payment Links
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
          Answers to common questions about generating UPI links, dynamic QR codes, zero gateway fees, and payment security.
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
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-hidden hover:bg-slate-50/50 transition-colors cursor-pointer"
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
