import fetch, { Response } from "node-fetch";
import { FutureResult } from "./model/future-result";
import { createHmac } from "crypto";
import { AccountResult } from "./model/account-result";
import { FTXResponse } from "./model/ftx-response";

const ENDPOINT = "https://ftx.com/api";

export class FtxApiController {
  public async getFuture(
    futureName: string
  ): Promise<FTXResponse<FutureResult>> {
    const uri = ENDPOINT + "/futures/" + futureName;
    const response = await fetch(uri, { method: "GET" });
    return (await response.text()) as unknown as FTXResponse<FutureResult>;
  }

  public async getAccount(): Promise<FTXResponse<AccountResult>> {
    const uri = ENDPOINT + "/account";
    const response = await this.fetchWithAuthentication(uri, "GET", "/account");
    return (await response.text()) as unknown as FTXResponse<AccountResult>;
  }

  private async fetchWithAuthentication(
    uri: string,
    requestMethod: string,
    requestPath: string
  ): Promise<Response> {
    const nonce = Date.now();
    const sign = this.getSign(nonce, requestMethod, requestPath);

    if (process.env.PUBLIC_API_KEY === undefined) {
      throw new Error("api public key missing in .env file!");
    }

    const headers = {
      "FTX-KEY": process.env.PUBLIC_API_KEY,
      "FTX-TS": nonce.toString(),
      "FTX-SIGN": sign,
    };
    return fetch(uri, { method: requestMethod, headers: headers });
  }

  private getSign(
    nonce: number,
    requestMethod: string,
    requestPath: string
  ): string {
    if (process.env.PRIVATE_API_KEY === undefined) {
      throw new Error("api private key missing in .env file!");
    }

    const hmac = createHmac("SHA256", process.env.PRIVATE_API_KEY);
    hmac.update(nonce.toString() + requestMethod + requestPath);
    return hmac.digest("hex");
  }
}
