import type { Currency, RateResponse } from '@/types/currencyTypes';

const BASE_URL = 'https://api.frankfurter.dev/v2';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getCurrencies = () => request<Currency[]>('/currencies');

export const getRate = (base: string, quote: string) =>
  request<RateResponse>(`/rate/${base}/${quote}`);

export const convert = async (amount: number, base: string, quote: string) => {
  const { rate } = await getRate(base, quote);
  return amount * rate;
};
