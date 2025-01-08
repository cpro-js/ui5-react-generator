import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";

const { PROXY_URL, PROXY_SAP_USERNAME, PROXY_SAP_PASSWORD, PROXY_SAP_CLIENT } = process.env;

const config: ConfigFileOptions = {
  mode: Modes.service,
  emitMode: EmitModes.ts,
  allowRenaming: true,
  services: {
    odata: {
      serviceName: "MainOData",
      sourceUrl: PROXY_URL,
      sourceUrlConfig: {
        username: PROXY_SAP_USERNAME,
        password: PROXY_SAP_PASSWORD,
        custom: {
          params: {
            "sap-client": PROXY_SAP_CLIENT,
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
