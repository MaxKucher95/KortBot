#!/usr/bin/.env node
import dotenv from "dotenv";
import { FtxApiController } from "./ftx-api/ftx-api-controller";
import path from "path";

let envFound = dotenv.config({ path: path.join(__dirname, ".env") });

if (envFound.error) {
  envFound = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  if (envFound.error) {
    console.warn("Couldn't find .env file");
  }
}

console.log(`Your api key is ${process.env.PUBLIC_API_KEY}`);

async function startKortBot() {
  try {
    console.log("kortbot started!");
    const apiController = new FtxApiController();
    console.log(await apiController.getFuture("BTC-PERP"));
    console.log(await apiController.getAccount());
  } catch (e) {
    console.log(`an error occured: ${e.message}`);
    console.log("kortbot shut down");
  }
}

startKortBot();
