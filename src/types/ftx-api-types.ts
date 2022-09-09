export interface Market {
  name: string;
  baseCurrency: string | null;
  quoteCurrency: string | null;
  quoteVolume24h: number;
  change1h: number;
  change24h: number;
  changeBod: number;
  higherLeverageFeeExempt: boolean;
  minProvideSize: number;
  type: string;
  underlying: string;
  enabled: boolean;
  ask: number;
  bid: number;
  last: number;
  postOnly: boolean;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
  restricted: boolean;
  volumeUsd24h: number;
  largeOrderThreshold: number;
  isEtfMarket: boolean;
}

export interface HistoricalPrice {
  close: number;
  high: number;
  low: number;
  open: number;
  startTime: string;
  volume: number;
}
