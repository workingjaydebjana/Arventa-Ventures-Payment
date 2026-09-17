import React from 'react';
import { PenTool, Link2, Smartphone } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Enter Details',
      desc: 'Enter UPI ID, amount, name and payment message.',
      icon: PenTool,
    },
    {
      num: '02',
      title: 'Generate Link',
      desc: 'Create a unique shareable payment URL instantly.',
      icon: Link2,
    },
    {
      num: '03',
      title: 'Share & Pay',
      desc: 'Copy the link or scan the QR code and continue with a UPI app.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center mb-8">
        <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-600 mb-1">
          Simple Workflow
        </h3>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How It Works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-2xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1.5">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
