import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";

const { APP_BASE_URL, APP_SAP_PASSWORD, APP_SAP_USERNAME, APP_SAP_CLIENT, APP_MAIN_SERVICE_PATH } = process.env;

const config: ConfigFileOptions = {
  mode: Modes.service,
  emitMode: EmitModes.ts,
  allowRenaming: true,
  prettier: true,
  services: {
    odata: {
      serviceName: "MainOData",
      source: "src/localService/main-service.xml",
      output: "src-generated/main-service",
      sourceUrl: APP_BASE_URL + APP_MAIN_SERVICE_PATH,
      // if OData service is in development, set this to true
      refreshFile: false,
      sourceUrlConfig: {
        username: APP_SAP_USERNAME,
        password: APP_SAP_PASSWORD,
        custom: {
          params: {
            "sap-client": APP_SAP_CLIENT,
          },
        },
      },
    },
  },
};

export default config;
