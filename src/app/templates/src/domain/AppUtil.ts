import { APPS } from "../../app.config";

/**
 * Create the navigation intent, which is the full hash fragment needed to navigate to a specific app.
 *
 * @param semanticObject
 * @param action
 * @param initialPath
 */
export function getIntent(semanticObject: string, action: string, initialPath?: string) {
  return `#${semanticObject}-${action}${initialPath ? `?&${initialPath}` : ""}`;
}

/**
 * Get an app by its action name.
 * The first app is returned by default.
 *
 * @param action
 * @returns
 */
export function getAppByAction(action?: string) {
  return APPS.find((app) => app.action === action) ?? APPS[0];
}

/**
 * Get an app by matching its path attribute as prefix of an actual path.
 * The first app is returned by default.
 *
 * @param path the actual path to match
 * @returns
 */
export function getAppByPath(path: string) {
  if (!path) {
    return APPS[0];
  }

  return APPS.slice(1).find((app) => path.startsWith(app.path)) ?? APPS[0];
}

export function stripLeadingZeros(text: string) {
  return text.replace(/^0*/, "");
}


