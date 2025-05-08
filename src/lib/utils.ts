
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  if (currency === 'ZAR') {
    return `R${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  } 
  else if (currency === 'USD') {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
  // Add more currencies here if needed
  
  // Generic currency format
  return `${currency} ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export function calculateMargin(cost: number, price: number): number {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}

// New helper function to convert amounts between currencies
export function convertCurrency(
  amount: number, 
  fromCurrency: string, 
  toCurrency: string, 
  exchangeRate?: number
): number {
  // If same currency, no conversion needed
  if (fromCurrency === toCurrency) return amount;
  
  // If exchange rate is provided, use it
  if (exchangeRate) {
    return amount * exchangeRate;
  }
  
  // Default fallback exchange rates (not ideal, should use live rates)
  const fallbackRates: Record<string, number> = {
    'USD_to_ZAR': 18.57, // 1 USD = 18.57 ZAR (sample rate)
    'ZAR_to_USD': 0.0538, // 1 ZAR = 0.0538 USD (sample rate)
  };
  
  const rateKey = `${fromCurrency}_to_${toCurrency}`;
  const reverseRateKey = `${toCurrency}_to_${fromCurrency}`;
  
  if (fallbackRates[rateKey]) {
    return amount * fallbackRates[rateKey];
  } else if (fallbackRates[reverseRateKey]) {
    return amount / fallbackRates[reverseRateKey];
  }
  
  // If no conversion rate found, return original amount
  console.warn(`No conversion rate found for ${fromCurrency} to ${toCurrency}`);
  return amount;
}
