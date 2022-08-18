export interface AccountResult {
  backstopProvider: boolean;
  collateral: number;
  freeCollateral: number;
  initialMarginRequirement: number;
  leverage: number;
  liquidating: boolean;
  maintenanceMarginRequirement: number;
  makerFee: number;
  marginFraction: number;
  openMarginFraction: number;
  takerFee: number;
  totalAccountValue: number;
  totalPositionSize: number;
  username: string;
  positions: Position[];
}

export interface Position {
  cost: number;
  entryPrice: number;
  future: string;
  initialMarginRequirement: number;
  longOrderSize: number;
  maintenanceMarginRequirement: number;
  netSize: number;
  openSize: number;
  realizedPnl: number;
  shortOrderSize: number;
  side: string;
  size: number;
  unrealizedPnl: number;
}
