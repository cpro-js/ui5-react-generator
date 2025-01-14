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
    title: "<%= appTitle %>",
    icon: "sap-icon://accept",
    semanticObject: "<%= semanticObject %>",
    action: "<%= action %>",
    path: "/",
  },
];
