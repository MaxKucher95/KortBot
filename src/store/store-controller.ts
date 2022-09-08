import { AccountSummary, APIResponse, FuturesCoin, RestClient } from "ftx-api";
import { GenericAPIResponse } from "ftx-api/lib/util/requestUtils";
import { Subject } from "rxjs";

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

  public account$ = new Subject<AccountSummary>();
  public BTCPERP$ = new Subject<APIResponse<FuturesCoin>>();

  constructor() {
    setInterval(this.getAccount.bind(this), 1000);
    setInterval(this.getFuture.bind(this), 1000, "BTCPERP", this.BTCPERP$);
  }

  private async getAccount(): Promise<GenericAPIResponse> {
    let account = await this.client.getAccount();

    if (account.success) {
      this.account$.next(account.result);
    } else {
      account = await this.client.getAccount();
      if (account.success) {
        this.account$.next(account.result);
      }
    }
  }

  private async getFuture(
    name: string,
    subject: Subject<APIResponse<FuturesCoin>>
  ) {
    let future = await this.client.getFuture(name);

    if (future.success) {
      subject.next(future.result);
    } else {
      future = await this.client.getFuture(name);
      if (future.success) {
        subject.next(future.result);
      }
    }
  }
}
