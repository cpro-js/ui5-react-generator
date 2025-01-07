import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";
import { loadEnv } from "vite";

const envVars = loadEnv("", __dirname, "PROXY_");

const config: ConfigFileOptions = {
  mode: Modes.service,
  emitMode: EmitModes.ts,
  allowRenaming: true,
  services: {
    odata: {
      serviceName: "MainOData",
      sourceUrl: envVars.PROXY_URL,
      sourceUrlConfig: {
        username: envVars.PROXY_SAP_USERNAME,
        password: envVars.PROXY_SAP_PASSWORD,
        custom: {
          params: {
            "sap-client": envVars.PROXY_SAP_CLIENT,
          },
        },
      },
      source: "src/localService/main-service.xml",
      output: "src-generated/main-service",
      // if OData service is in development, set this to true
      // refreshFile: true
    },
  },
};

export default config;
