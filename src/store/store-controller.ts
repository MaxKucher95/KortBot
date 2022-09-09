import { AccountSummary, FuturesCoin, RestClient } from "ftx-api";
import { Subject } from "rxjs";
import { HistoricalPrice, Market } from "../types/ftx-api-types";

export class StoreController {
  private client = new RestClient(
    process.env.PUBLIC_API_KEY,
    process.env.PRIVATE_API_KEY,
    {
      baseUrl: "https://ftx.com/api",
      domain: "ftxcom",
      disable_time_sync: true,
    }
  );

  public BTCUSD$ = new Subject<Market>();
  public BTCUSDHistory = new Array<number>();

  constructor() {
    setInterval(
      this.getMarket.bind(this),
      60000,
      "BTC/USD",
      this.BTCUSD$,
      this.BTCUSDHistory
    );
  }

  private async getAccount(): Promise<AccountSummary | void> {
    const account = await this.client.getAccount();

    if (account.success) {
      return account.result;
    }
  }

  private async getFuture(name: string): Promise<FuturesCoin | void> {
    const future = await this.client.getFuture(name);

    if (future.success) {
      return future.result;
    }
  }

  private async getMarket(
    name: string,
    subject: Subject<Market>,
    history: Array<number>
  ): Promise<void> {
    const market = await this.client.getMarket(name);

    if (market.success) {
      subject.next(market.result);
      history.push(market.result.last);
    }
  }

  public async getHistoricalMarket(
    name: string,
    resolution: number,
    startTime?: number,
    endTime?: number
  ): Promise<HistoricalPrice[]> {
    const historicalPrices = await this.client.getHistoricalPrices({
      market_name: name,
      resolution: resolution,
      start_time: startTime,
      end_time: endTime,
    });

    if (historicalPrices.success) {
      return historicalPrices.result;
    } else {
      return [];
    }
  }
}
