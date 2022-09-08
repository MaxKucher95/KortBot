import { StoreController } from "../store/store-controller";

export class StrategyObserver {
  private store = new StoreController();

  constructor() {
    this.store.account$.subscribe((summary) => {
      console.log(summary.freeCollateral);
    });
  }
}
