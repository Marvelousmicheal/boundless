import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  // Split into whole and decimal parts
  const [whole, decimal] = formatted.split('.');

  return {
    whole: whole,
    decimal: decimal ? `.${decimal}` : '',
    full: formatted,
  };
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatPublicKey(key: string) {
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}
export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard', {
    description: 'You can now paste it anywhere',
  });
}
