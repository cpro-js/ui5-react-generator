import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";

const { BASE_URL, SAP_PASSWORD, SAP_USERNAME, SAP_CLIENT, APP_MAIN_SERVICE_PATH } = process.env;

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
      sourceUrl: BASE_URL + APP_MAIN_SERVICE_PATH,
      // if OData service is in development, set this to true
      refreshFile: false,
      sourceUrlConfig: {
        username: SAP_USERNAME,
        password: SAP_PASSWORD,
        custom: {
          params: {
            "sap-client": SAP_CLIENT,
          },
        },
      },
    },
  },
};

export default config;
