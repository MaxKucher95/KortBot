import { SMA } from "./SMA";
import { Indicator } from "./indicator";

export class EMA extends Indicator {
  constructor(marketName: string) {
    super(marketName);
  }

  public async getValue(
    resolution: number,
    length: number,
    smoothing = 2
  ): Promise<number> {
    const startTime: number = parseInt(
      ((Date.now() - 1000 * length * resolution) / 1000).toFixed(0)
    );
    this.history = await this.store.getHistoricalMarket(
      this.marketName,
      resolution,
      startTime,
      Date.now() / 1000
    );
    const smoothingMultiplier = this.getSmoothingMultiplier(length, smoothing);

    return this.getEMARecursive(resolution, length, 0, smoothingMultiplier);
  }

  private getSmoothingMultiplier(length: number, smoothing = 2): number {
    return smoothing / (length + 1);
  }

  private async getEMARecursive(
    resolution: number,
    length: number,
    inverseLength: number,
    smoothingMultiplier: number
  ): Promise<number> {
    const sma = new SMA(this.marketName);
    let emaPreviousDay = -1;

    if (length > 1) {
      emaPreviousDay = await this.getEMARecursive(
        resolution,
        length - 1,
        inverseLength + 1,
        smoothingMultiplier
      );
    }

    if (emaPreviousDay < 0) {
      emaPreviousDay = await sma.getHistoricalValue(
        resolution,
        inverseLength + 1,
        inverseLength + 1
      );
    }

    const closingPrice = this.history[length - 1].close;

    return (
      closingPrice * smoothingMultiplier +
      emaPreviousDay * (1 - smoothingMultiplier)
    );
  }
}
