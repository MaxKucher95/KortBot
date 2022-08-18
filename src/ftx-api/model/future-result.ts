export interface FutureResult {
  ask: number;
  bid: number;
  change1h: number;
  change24h: number;
  description: string;
  enabled: boolean;
  expired: boolean;
  expiry: string;
  index: number;
  last: number;
  lowerBound: number;
  mark: number;
  name: string;
  perpetual: boolean;
  postOnly: boolean;
  priceIncrement: number;
  sizeIncrement: number;
  underlying: string;
  upperBound: number;
  type: string;
}
