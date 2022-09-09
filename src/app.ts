#!/usr/bin/.env node
import dotenv from "dotenv";
import path from "path";
import { Container } from "typedi";
import { StoreController } from "./store/store-controller";
import { StrategyObserver } from "./strategy/strategy-observer";

let envFound = dotenv.config({ path: path.join(__dirname, ".env") });

if (envFound.error) {
  envFound = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  if (envFound.error) {
    console.warn("Couldn't find .env file");
  }
}

async function startKortBot(): Promise<void> {
  try {
    console.log("kortbot started!");
    Container.set("store", new StoreController());
    const strategy = new StrategyObserver();
    await strategy.start();
  } catch (e) {
    console.log(`an error occured: ${e.message}`);
    console.log("kortbot shut down");
  }
}

startKortBot();
