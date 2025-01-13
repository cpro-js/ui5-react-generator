/// <reference types="vitest" />
import { createCommonConfig } from "@cpro-js/vite-ui5-common-config";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { mockServerConfig } from "./mockserver.config";
import manifest from "./ui5/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // load all env vars, also .local
  process.env = { ...process.env, ...loadEnv(mode, __dirname, "") };

  const proxyConfig = {
    url: process.env.BASE_URL + process.env.PROXY_PATH,
    username: process.env.SAP_USERNAME,
    password: process.env.SAP_PASSWORD,
    queryParams: {
      "sap-client": process.env.SAP_CLIENT,
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
      envPrefix: "APP_",
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
            quietDeps: true,
          },
        },
      },
      test: {
        // see https://vitest.dev/config/#configuration
      },
    }
  );
});
