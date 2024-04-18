/// <reference types="vitest" />
import { createCommonConfig } from "@cpro-js/vite-ui5-common-config";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { mockServerConfig } from "./mockserver.config";
import manifest from "./ui5/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // load all PROXY_ env vars
  process.env = { ...process.env, ...loadEnv(mode, __dirname, "PROXY_") };

  const proxyConfig = {
    url: process.env.PROXY_URL,
    username: process.env.PROXY_SAP_USERNAME,
    password: process.env.PROXY_SAP_PASSWORD,
    queryParams: {
      "sap-client": process.env.PROXY_SAP_CLIENT,
    },
  };

  // infos from manifest
  const appId = manifest["sap.app"].id;
  const ui5Version = manifest["sap.ui5"]?.dependencies?.minUI5Version ?? "";

  return mergeConfig(
    createCommonConfig({
      appId,
      ui5Version,
      mockServerConfig: mode === "mock" ? mockServerConfig : undefined,
      proxy: proxyConfig,
    }),
    {
      test: {
        // see https://vitest.dev/config/#configuration
      },
    }
  );
});
