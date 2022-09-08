#!/usr/bin/.env node
import dotenv from "dotenv";
import path from "path";
import { StrategyObserver } from "./strategy/strategy-observer";

let envFound = dotenv.config({ path: path.join(__dirname, ".env") });

if (envFound.error) {
  envFound = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  if (envFound.error) {
    console.warn("Couldn't find .env file");
  }
}

async function startKortBot() {
  try {
    console.log("kortbot started!");
    const strategy = new StrategyObserver();
  } catch (e) {
    console.log(`an error occured: ${e.message}`);
    console.log("kortbot shut down");
  }
}

startKortBot();
