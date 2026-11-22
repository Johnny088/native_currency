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

type currencyCode =
  | 'AUD'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HKD'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'INR'
  | 'ISK'
  | 'JPY'
  | 'KRW'
  | 'MXN'
  | 'MYR'
  | 'NOK'
  | 'NZD'
  | 'PHP'
  | 'PLN'
  | 'RON'
  | 'SEK'
  | 'SGD'
  | 'THB'
  | 'TRY'
  | 'USD'
  | 'ZAR';

export interface CurrencyCodeType {
  code: currencyCode;
}
