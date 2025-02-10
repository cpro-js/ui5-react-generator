// https://vitejs.dev/config/build-options.html#build-modulepreload
import "vite/modulepreload-polyfill";
import "reflect-metadata";

import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { createRoot } from "react-dom/client";
import { register } from "virtual:@cpro-js/vite-ui5-integration-plugin/runtime";
import { APPS } from "./app.config";
import { App } from "./domain/App";
import { getIntent } from "./domain/AppUtil";

register((rootNode, { component } = {}) => {
  if (component) {
    // initialized via UI5
    if (component.isLaunchpad()) {
      const { semanticObject } = component.getNavigationContext();

      if (semanticObject && APPS.length > 1) {
        // Related apps
        // Clicking on app title in shell bar shows related apps
        component.setRelatedApps(
          APPS.map((app) => {
            const { title, icon, action, path } = app;
            return { title, icon, intent: getIntent(semanticObject, action, path) };
          })
        );
      }
    }

    setAnimationMode(component.getAnimationMode());
    void setTheme(component.getTheme());
    component.subscribeToThemeChanges((theme) => {
      void setTheme(theme);
    });
  }

  const resolveUri = (path: string) => component?.resolveUri(path) ?? path;
  const locale = component?.getLocale();

  const root = createRoot(rootNode);
  root.render(<App resolveUri={resolveUri} locale={locale} />);

  // => clean up
  return () => {
    root.unmount();
  };
});
