/**
 * Core type definitions for Arventa Ventures Payment
 */

export interface PaymentData {
  upiId: string;
  amount: number;
  name: string;
  message: string;
}

export interface FormValues {
  upiId: string;
  amount: string;
  name: string;
  message: string;
}

export interface FormErrors {
  upiId?: string;
  amount?: string;
  name?: string;
  message?: string;
}

export interface RouteState {
  view: 'home' | 'pay';
  paymentData: PaymentData | null;
  error: string | null;
}
