import React, { useState } from 'react';
import { AtSign, User, MessageSquare, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { FormValues, FormErrors } from '../types';
import { validatePaymentForm } from '../utils/upi';

interface PaymentFormProps {
  onGenerate: (data: { upiId: string; amount: number; name: string; message: string }) => void;
  initialValues?: Partial<FormValues>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onGenerate, initialValues }) => {
  const [values, setValues] = useState<FormValues>({
    upiId: initialValues?.upiId || '',
    amount: initialValues?.amount || '',
    name: initialValues?.name || '',
    message: initialValues?.message || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof FormValues, val: string) => {
    let cleaned = val;
    if (field === 'amount') {
      // Prevent negative signs or multiple decimals
      cleaned = val.replace(/[^0-9.]/g, '');
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    const nextValues = { ...values, [field]: cleaned };
    setValues(nextValues);

    // If touched, re-validate
    if (touched[field]) {
      const { errors: newErrors } = validatePaymentForm(nextValues);
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field],
      }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { errors: newErrors } = validatePaymentForm(values);
    setErrors((prev) => ({
      ...prev,
      [field]: newErrors[field],
    }));
  };

  const handleQuickAmount = (amt: number) => {
    const current = parseFloat(values.amount) || 0;
    const nextAmount = (current + amt).toString();
    handleFieldChange('amount', nextAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      upiId: true,
      amount: true,
      name: true,
      message: true,
    });

    const { isValid, errors: validationErrors } = validatePaymentForm(values);
    setErrors(validationErrors);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onGenerate({
        upiId: values.upiId.trim(),
        amount: parseFloat(values.amount),
        name: values.name.trim(),
        message: values.message.trim(),
      });
      setIsSubmitting(false);
    }, 200);
  };

  const isFormIncomplete = !values.upiId.trim() || !values.amount.trim() || !values.name.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Field 1: UPI ID */}
      <div>
        <label htmlFor="upiId" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          UPI ID <span className="text-rose-500">*</span>
        </label>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <AtSign className="w-4 h-4" />
          </div>
          <input
            id="upiId"
            type="text"
            value={values.upiId}
            onChange={(e) => handleFieldChange('upiId', e.target.value)}
            onBlur={() => handleBlur('upiId')}
            placeholder="example@upi"
            className={`w-full pl-10 pr-4 py-2.5 bg-white border text-sm text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.upiId && touched.upiId
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/15'
            }`}
          />
        </div>
        {errors.upiId && touched.upiId && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.upiId}</span>
          </p>
        )}
      </div>

      {/* Field 2: Amount */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="amount" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Amount <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400 font-medium">Indian Rupees (INR)</span>
        </div>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-display font-semibold text-base">
            ₹
          </div>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={values.amount}
            onChange={(e) => handleFieldChange('amount', e.target.value)}
            onBlur={() => handleBlur('amount')}
            placeholder="Enter amount"
            className={`w-full pl-9 pr-4 py-2.5 bg-white border text-sm font-semibold text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.amount && touched.amount
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/15'
            }`}
          />
        </div>
        {/* Quick Amount Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className="text-[11px] text-slate-400 mr-1">Quick add:</span>
          {[100, 500, 1000, 2000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAmount(amt)}
              className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 transition-colors"
            >
              +₹{amt.toLocaleString('en-IN')}
            </button>
          ))}
          {values.amount && (
            <button
              type="button"
              onClick={() => handleFieldChange('amount', '')}
              className="text-[11px] text-slate-400 hover:text-slate-600 underline ml-auto"
            >
              Clear
            </button>
          )}
        </div>
        {errors.amount && touched.amount && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.amount}</span>
          </p>
        )}
      </div>

      {/* Field 3: Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Enter recipient name"
            className={`w-full pl-10 pr-4 py-2.5 bg-white border text-sm text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name && touched.name
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/15'
            }`}
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-400">
          Person or business receiving the payment (supports English, Bengali & Unicode)
        </p>
        {errors.name && touched.name && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Field 4: Payment Message */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Payment Message
          </label>
          <span className="text-xs text-slate-400 font-medium">Optional</span>
        </div>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <input
            id="message"
            type="text"
            value={values.message}
            onChange={(e) => handleFieldChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            placeholder="Enter payment message (e.g. Order #1042 or Services)"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-sm text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-600 focus:ring-indigo-600/15 transition-all"
          />
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          id="generate-payment-link-btn"
          type="submit"
          disabled={isSubmitting || isFormIncomplete}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
            isFormIncomplete
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Secure Link...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Generate Payment Link</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
