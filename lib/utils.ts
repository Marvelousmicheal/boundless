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

export async function getXLMPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd'
    );
    const data = await response.json();
    return data.stellar.usd;
  } catch (error) {
    throw new Error('Failed to fetch XLM price', { cause: error });
  }
}

export function convertUSDToStroops(
  usdAmount: number,
  xlmPrice: number
): bigint {
  const xlmAmount = usdAmount / xlmPrice;
  return BigInt(Math.floor(xlmAmount * 10_000_000));
}
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatMillions = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return formatCurrency(value);
};
