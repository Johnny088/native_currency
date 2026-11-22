export interface Currency {
  iso_code: string;
  iso_numeric: string | null;
  name: string;
  symbol: string | null;
  type: 'currency' | 'crypto' | 'metal';
  start_date: string;
  end_date: string;
}

export interface RateResponse {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
