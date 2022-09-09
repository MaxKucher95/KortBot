import { StoreController } from "../store-controller";
import { Container } from "typedi";
import { HistoricalPrice } from "../../types/ftx-api-types";

export class Indicator {
  protected store = Container.get("store") as StoreController;
  protected history: HistoricalPrice[] = [];

  constructor(protected marketName: string) {}
}
