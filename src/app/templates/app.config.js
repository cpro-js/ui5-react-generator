/**
 * Path to the main OData service.
 *
 * Used by
 * - mockserver.config.ts
 * - src/config/odata.config.ts
 */
export const MAIN_SERVICE_PATH = "<%= odataServicePath %>";

export const DEFAULT_LANGUAGE = "<%= defaultLanguage %>";

/**
 * Static configuration for all our "apps" as tiles within Launchpad.
 * entry points.
 */
export const APPS = [
  {
    title: "<%= appTitle %>",
    icon: "sap-icon://accept",
    action: "<%= action %>",
    path: "/",
  },
];
