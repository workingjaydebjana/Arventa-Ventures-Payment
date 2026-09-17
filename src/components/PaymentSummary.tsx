import React from 'react';
import { User, AtSign, MessageSquare } from 'lucide-react';
import { PaymentData } from '../types';
import { formatInr } from '../utils/upi';

interface PaymentSummaryProps {
  data: PaymentData;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {/* Amount Display */}
      <div className="text-center py-4 px-3 bg-gradient-to-b from-indigo-50/60 to-white rounded-2xl border border-indigo-100/80">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
          Amount to Pay
        </span>
        <div className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {formatInr(data.amount)}
        </div>
        <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-indigo-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>Indian Rupees (INR)</span>
        </div>
      </div>

      {/* Recipient Details Card */}
      <div className="bg-slate-50/90 rounded-xl border border-slate-200/70 p-4 divide-y divide-slate-200/60 text-xs">
        {/* Recipient Name */}
        <div className="pb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">Recipient</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-slate-900 text-sm block">{data.name}</span>
          </div>
        </div>

        {/* UPI ID */}
        <div className="py-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <AtSign className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">UPI ID</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/50">
              {data.upiId}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="pt-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">Message</span>
          </div>
          <div className="text-right max-w-[60%]">
            {data.message ? (
              <span className="text-slate-800 font-medium italic break-words">
                "{data.message}"
              </span>
            ) : (
              <span className="text-slate-400 italic">No message specified</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
