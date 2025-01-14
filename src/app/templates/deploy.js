#!/usr/bin/env node

/**
 * Little deploy script in order to support cross environment deployments.
 * */
import { spawn } from "node:child_process";
import dotenv from "dotenv";

// Load env vars from .env.local
dotenv.config({ path: ".env.local" });
const { SAP_USERNAME, SAP_PASSWORD } = process.env;

// Validation: env vars must have been set!
if (!SAP_USERNAME || !SAP_PASSWORD) {
  console.error("SAP_USERNAME and/or SAP_PASSWORD haven't been set in .env.local!");
  process.exit(1);
}

// Now deploy using the provided credentials
const childProcess = spawn(
  "ui5-deployer",
  ["deploy", "--user", SAP_USERNAME, "--pwd", SAP_PASSWORD],

  { shell: true }
);

// Pass on stdout messages
childProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

// Error Handling
childProcess.stderr.on("data", (data) => {
  console.error(data.toString());
});
