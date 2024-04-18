import { Container, createI18nModuleRegistry, I18nService } from "@cpro-js/react-core";
import { createNotificationRegistry } from "@cpro-js/react-ui5-notification";
// @ts-ignore: no typings available
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language";
import { MainODataService } from "../../src-generated/odata-service/MainODataService";
import { createI18nConfig } from "./i18n.config";
import { createODataClient } from "./odata.config";

/**
 * Create the DI container
 * @param options
 */
export const createContainer = async (options: {
  locale?: string;
  resolveUri: (path: string) => string;
}): Promise<Container> => {
  // the Dependency Injection container
  const container = new Container();

  // initialize I18nService
  await container.loadAsync(createI18nModuleRegistry(createI18nConfig(options.locale)));
  const i18nService = container.get(I18nService);
  setLanguage(i18nService.getTranslationLocale());

  // initialize NotificationService
  await container.loadAsync(createNotificationRegistry());

  // initialize ODataService
  container.bindConstant(MainODataService, createODataClient(i18nService));

  // domain services
  // TODO: here you bind your own services
  // container.bindSingleton(MyService, MyService);

  return container;
};
