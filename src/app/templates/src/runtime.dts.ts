/// <reference types="@cpro-js/vite-ui5-integration-plugin/runtime" />
import type Component from "../ui5/Component.ts";

declare module "virtual:@cpro-js/vite-ui5-integration-plugin/runtime" {

  interface RenderOptions {
    // enhance RenderOptions here
    component?: Component;
  }
}
