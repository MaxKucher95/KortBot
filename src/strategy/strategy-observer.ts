import { Container } from "typedi";
import { StoreController } from "../store/store-controller";
import { EMA } from "../store/indicator/EMA";

export class StrategyObserver {
  private store = Container.get("store") as StoreController;

  public async start(): Promise<void> {
    const ema = await new EMA("BTC/USD").getValue(900, 20);
    console.log(ema);
  }
}
