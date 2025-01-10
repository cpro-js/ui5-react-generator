import { AppTileInfo } from "./domain/AppModel";

/**
 * Static configuration for all our "apps" as tiles within Launchpad.
 *
 * Currently,this is only used for the related apps feature.
 *
 * TODO: find way to integrate this info into flpSandbox.html
 */
export const APPS: Array<AppTileInfo> = [
  {
    title: "SmartPack",
    icon: "sap-icon://accept",
    action: "outbound",
    path: "/",
  },
];
