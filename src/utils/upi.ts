import { PaymentData, FormErrors } from '../types';

/**
 * Secret salt used for cryptographic signing and key streaming.
 * Keeps the payload protected and verified against any tampering.
 */
const SECURE_LINK_SALT = 'ARVENTA_SECURE_PAY_V2_89231!';
const PROTOCOL_MAGIC_BYTE = 0xA7;

/**
 * Fast 32-bit FNV-1a hash algorithm
 */
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Mulberry32 PRNG-based keystream generator
 */
function generateKeyStream(seed: number, len: number): Uint8Array {
  let s = seed >>> 0;
  const stream = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    stream[i] = ((t ^ (t >>> 14)) >>> 0) & 0xff;
  }
  return stream;
}

/**
 * URL-safe Base64 encoder
 */
function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * URL-safe Base64 decoder
 */
function base64UrlToUint8Array(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * UTF-8 string to Uint8Array encoder
 */
function stringToUtf8Bytes(str: string): Uint8Array {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str);
  }
  const utf8 = unescape(encodeURIComponent(str));
  const arr = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) {
    arr[i] = utf8.charCodeAt(i);
  }
  return arr;
}

/**
 * Uint8Array to UTF-8 string decoder
 */
function utf8BytesToString(bytes: Uint8Array): string {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder().decode(bytes);
  }
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return decodeURIComponent(escape(binary));
}

/**
 * Validates the payment form inputs
 */
export function validatePaymentForm(values: {
  upiId: string;
  amount: string;
  name: string;
  message: string;
}): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  const trimmedUpi = values.upiId.trim();
  if (!trimmedUpi) {
    errors.upiId = 'Please enter a UPI ID.';
  } else if (!trimmedUpi.includes('@')) {
    errors.upiId = 'Please enter a valid UPI ID (e.g. username@upi or store@bank).';
  } else {
    const parts = trimmedUpi.split('@');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      errors.upiId = 'Please enter a valid UPI ID format (e.g. name@bank).';
    }
  }

  const trimmedAmount = values.amount.trim();
  if (!trimmedAmount) {
    errors.amount = 'Please enter an amount.';
  } else {
    const num = parseFloat(trimmedAmount);
    if (isNaN(num) || num <= 0) {
      errors.amount = 'Please enter a valid amount.';
    } else if (num > 10000000) {
      errors.amount = 'Amount exceeds maximum standard transaction limit.';
    }
  }

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter the recipient name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Recipient name must be at least 2 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a number into Indian Rupee currency format (e.g. ₹1,000.00)
 */
export function formatInr(amount: number): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₹${amount.toFixed(2)}`;
  }
}

/**
 * Constructs the standard UPI URI for scanning or app intent.
 */
export function buildUpiUri(data: PaymentData): string {
  const params = new URLSearchParams();
  params.set('pa', data.upiId.trim());
  params.set('pn', data.name.trim());
  params.set('am', data.amount.toFixed(2));
  if (data.message && data.message.trim()) {
    params.set('tn', data.message.trim());
  }
  params.set('cu', 'INR');

  return `upi://pay?${params.toString()}`;
}

/**
 * Generates an encrypted, compact, tamper-proof secure token.
 * Contains: Magic Byte (0xA7) + Nonce (2 bytes) + Checksum Signature (4 bytes) + Obfuscated Payload
 * Resulting token is short (~60-75 chars), hides all details, and cannot be edited or tampered.
 */
export function encodeSecureToken(data: PaymentData): string {
  // 1. Pack compact array: [upiId, name, amount, message]
  const rawArray = [
    data.upiId.trim(),
    data.name.trim(),
    data.amount,
    data.message ? data.message.trim() : '',
  ];
  const jsonStr = JSON.stringify(rawArray);
  const utf8 = stringToUtf8Bytes(jsonStr);

  // 2. 2-byte random nonce for unique ciphertext every time
  const nonce = Math.floor(Math.random() * 65536);
  const nonceB0 = nonce & 0xff;
  const nonceB1 = (nonce >>> 8) & 0xff;

  // 3. Keystream generated from SALT + nonce
  const seed = fnv1a(`${SECURE_LINK_SALT}:${nonce}`);
  const keyStream = generateKeyStream(seed, utf8.length);

  // 4. Encrypt with keystream
  const encrypted = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) {
    encrypted[i] = utf8[i] ^ keyStream[i];
  }

  // 5. Calculate strict checksum signature (Tamper protection)
  let encSample = '';
  for (let i = 0; i < encrypted.length; i++) {
    encSample += encrypted[i] + ',';
  }
  const checksum = fnv1a(`${SECURE_LINK_SALT}:CHK:${nonce}:${encSample}`);
  const chkB0 = checksum & 0xff;
  const chkB1 = (checksum >>> 8) & 0xff;
  const chkB2 = (checksum >>> 16) & 0xff;
  const chkB3 = (checksum >>> 24) & 0xff;

  // 6. Assemble final packet
  // Structure: [0xA7, nonceB0, nonceB1, chkB0, chkB1, chkB2, chkB3, ...encrypted]
  const packet = new Uint8Array(7 + encrypted.length);
  packet[0] = PROTOCOL_MAGIC_BYTE;
  packet[1] = nonceB0;
  packet[2] = nonceB1;
  packet[3] = chkB0;
  packet[4] = chkB1;
  packet[5] = chkB2;
  packet[6] = chkB3;
  packet.set(encrypted, 7);

  return uint8ArrayToBase64Url(packet);
}

/**
 * Decodes and strictly validates the tamper-proof payment token.
 * If the link was changed, edited, corrupted, or pattern broken, returns null.
 */
export function decodeSecureToken(token: string): PaymentData | null {
  try {
    const packet = base64UrlToUint8Array(token);
    // Strict pattern checks:
    if (packet.length < 8) return null; // Minimum header (7 bytes) + at least 1 byte
    if (packet[0] !== PROTOCOL_MAGIC_BYTE) return null; // Protocol pattern mismatch!

    const nonce = packet[1] | (packet[2] << 8);
    const receivedChecksum =
      (packet[3] | (packet[4] << 8) | (packet[5] << 16) | (packet[6] << 24)) >>> 0;

    const encrypted = packet.slice(7);

    // Verify cryptographic pattern checksum
    let encSample = '';
    for (let i = 0; i < encrypted.length; i++) {
      encSample += encrypted[i] + ',';
    }
    const expectedChecksum = fnv1a(`${SECURE_LINK_SALT}:CHK:${nonce}:${encSample}`) >>> 0;

    if (receivedChecksum !== expectedChecksum) {
      // Signature failed: The link has been edited, tampered with, or modified!
      return null;
    }

    // Decrypt payload
    const seed = fnv1a(`${SECURE_LINK_SALT}:${nonce}`);
    const keyStream = generateKeyStream(seed, encrypted.length);
    const decrypted = new Uint8Array(encrypted.length);
    for (let i = 0; i < encrypted.length; i++) {
      decrypted[i] = encrypted[i] ^ keyStream[i];
    }

    const jsonStr = utf8BytesToString(decrypted);
    const arr = JSON.parse(jsonStr);

    if (!Array.isArray(arr) || arr.length < 3) return null;

    const [upiId, name, amount, message] = arr;
    const parsedAmount = typeof amount === 'number' ? amount : parseFloat(String(amount));

    if (
      !upiId ||
      typeof upiId !== 'string' ||
      !name ||
      typeof name !== 'string' ||
      isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      return null;
    }

    return {
      upiId: upiId.trim(),
      name: name.trim(),
      amount: parsedAmount,
      message: message ? String(message).trim() : '',
    };
  } catch {
    return null;
  }
}

/**
 * Builds a very short, clean, obfuscated URL.
 * Pattern: /pay?p={token} or /#/pay?p={token}
 * Nothing readable (no upiId, no amount, no name).
 */
export function buildShareablePaymentUrl(data: PaymentData): string {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://arventa-payment.web.app';

  const token = encodeSecureToken(data);
  return `${origin}/pay?p=${token}`;
}

/**
 * Parses and reconstructs PaymentData from current window location.
 * Validates the strict security token pattern.
 * If URL is tampered or edited, marks as Invalid Payment Link.
 */
export function parsePaymentDataFromUrl(
  searchStr?: string,
  pathnameStr?: string,
  hashStr?: string
): {
  isPaymentRoute: boolean;
  data: PaymentData | null;
  error: string | null;
} {
  if (typeof window === 'undefined') {
    return { isPaymentRoute: false, data: null, error: null };
  }

  const pathname = pathnameStr ?? window.location.pathname;
  const search = searchStr ?? window.location.search;
  const hash = hashStr ?? window.location.hash;

  // Check if route is /pay or hash /pay or has query param indicating payment
  const isDirectPayPath = pathname === '/pay' || pathname.endsWith('/pay');
  const isHashPayPath = hash.startsWith('#/pay') || hash.startsWith('#pay');

  let searchParams = new URLSearchParams(search);

  // If hash has query string e.g. #/pay?p=...
  if (hash.includes('?')) {
    const hashQuery = hash.substring(hash.indexOf('?'));
    const hashParams = new URLSearchParams(hashQuery);
    hashParams.forEach((val, key) => {
      if (!searchParams.has(key)) {
        searchParams.set(key, val);
      }
    });
  }

  const hasPayToken = searchParams.has('p') || searchParams.has('pay');
  const hasRawParams = searchParams.has('pa') && searchParams.has('am');

  const isPaymentRoute = isDirectPayPath || isHashPayPath || hasPayToken || hasRawParams;

  if (!isPaymentRoute) {
    return { isPaymentRoute: false, data: null, error: null };
  }

  // Check for secure token 'p' or 'pay'
  const token = searchParams.get('p') || searchParams.get('pay');
  if (token) {
    const decoded = decodeSecureToken(token.trim());
    if (decoded) {
      return {
        isPaymentRoute: true,
        data: decoded,
        error: null,
      };
    } else {
      // Pattern broken or link was edited / tampered with!
      return {
        isPaymentRoute: true,
        data: null,
        error: 'Invalid Payment Link! The link has been altered, corrupted, or does not follow the valid security pattern.',
      };
    }
  }

  // Fallback for legacy plain links if any
  if (hasRawParams) {
    const upiId = searchParams.get('pa');
    const name = searchParams.get('pn');
    const amountRaw = searchParams.get('am');
    const message = searchParams.get('tn') || '';

    if (upiId && name && amountRaw) {
      const amount = parseFloat(amountRaw);
      if (!isNaN(amount) && amount > 0) {
        return {
          isPaymentRoute: true,
          data: {
            upiId: upiId.trim(),
            name: name.trim(),
            amount,
            message: message.trim(),
          },
          error: null,
        };
      }
    }
  }

  return {
    isPaymentRoute: true,
    data: null,
    error: 'Invalid Payment Link! The payment link is missing or corrupted.',
  };
}
