#!/usr/bin/env node

/**
 * Little deploy script in order to support cross environment deployments.
 * */
import { spawn } from "node:child_process";
import dotenv from "dotenv";

// Load env vars from .env.local and .env (first value set for a variable will win)
dotenv.config({ path: ['.env.local', '.env'] });
const {
  BASE_URL,
  SAP_CLIENT,
  SAP_USERNAME,
  SAP_PASSWORD,
  SAP_DEPLOY_BASE_URL,
  SAP_DEPLOY_CLIENT,
  SAP_DEPLOY_USERNAME,
  SAP_DEPLOY_PASSWORD,
} = process.env;

const server = SAP_DEPLOY_BASE_URL || BASE_URL;
const client = SAP_DEPLOY_CLIENT || SAP_CLIENT;

const user = SAP_DEPLOY_USERNAME || SAP_USERNAME;
const password = SAP_DEPLOY_PASSWORD || SAP_PASSWORD;

// Validation: env vars must have been set!
if (!server) {
  console.error("SAP_DEPLOY_BASE_URL or BASE_URL haven't been set in .env or .env.local!");
  process.exit(1);
}

if (!client) {
  console.error("SAP_DEPLOY_CLIENT or SAP_CLIENT haven't been set in .env or .env.local!");
  process.exit(1);
}

if (!user) {
  console.error("SAP_DEPLOY_USERNAME and/or SAP_USERNAME haven't been set in .env.local!");
  process.exit(1);
}

if (!password) {
  console.error("SAP_DEPLOY_PASSWORD and/or SAP_PASSWORD haven't been set in .env.local!");
  process.exit(1);
}

// Now deploy using the provided credentials
const childProcess = spawn(
  "ui5-deployer",
  ["deploy", "--server", server, "--client", client, "--user", user, "--pwd", password],

  { shell: true },
);

// Pass on stdout messages
childProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

// Error Handling
childProcess.stderr.on("data", (data) => {
  console.error(data.toString());
});
