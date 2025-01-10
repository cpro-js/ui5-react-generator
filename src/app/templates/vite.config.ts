/// <reference types="vitest" />
import { createCommonConfig } from "@cpro-js/vite-ui5-common-config";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { mockServerConfig } from "./mockserver.config";
import manifest from "./ui5/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // load all env vars
  const appEnvs = loadEnv(mode, __dirname, "APP_");

  const proxyConfig = {
    url: appEnvs.APP_BASE_URL + appEnvs.APP_PROXY_PATH,
    username: appEnvs.APP_SAP_USERNAME,
    password: appEnvs.APP_SAP_PASSWORD,
    queryParams: {
      "sap-client": appEnvs.APP_SAP_CLIENT,
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
