import { Indicator } from "./indicator";

export class SMA extends Indicator {
  constructor(marketName: string) {
    super(marketName);
  }

  public async getValue(resolution: number, length: number): Promise<number> {
    return this.getHistoricalValue(resolution, length, 0);
  }

  public async getHistoricalValue(
    resolution: number,
    length: number,
    stepsBack: number
  ): Promise<number> {
    const startTime: number = parseInt(
      ((Date.now() - 1000 * (length + stepsBack) * resolution) / 1000).toFixed(
        0
      )
    );

    this.history = await this.store.getHistoricalMarket(
      this.marketName,
      resolution,
      startTime,
      startTime + length * resolution
    );

    let sum = 0;
    this.history.forEach((pricePoint) => {
      sum += pricePoint.close;
    });

    return sum / length;
  }
}
