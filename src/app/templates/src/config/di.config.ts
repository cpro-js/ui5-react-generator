import { Container, createI18nModuleRegistry, I18nService } from "@cpro-js/react-core";
import { createNotificationRegistry } from "@cpro-js/react-ui5-notification";
import { FetchClient } from "@odata2ts/http-client-fetch";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { MainODataService } from "../../src-generated/main-service/MainODataService";
import { createI18nConfig } from "./i18n.config";

const { APP_MAIN_SERVICE_PATH } = import.meta.env;

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

  // initialize OData service(s)
  const odataClient = createODataClient(i18nService);
  container.bindConstant(MainODataService<FetchClient>, new MainODataService(odataClient, APP_MAIN_SERVICE_PATH));

  // domain services
  // TODO: here you bind your own services
  // container.bindSingleton(MyService, MyService);

  return container;
};

/**
 * Helper function to bundle logic around creating the OData client
 * @param i18nService
 */
export function createODataClient(i18nService: I18nService) {
  // initialize ODataService
  return new FetchClient(
    {
      headers: {
        // Needed to override language from browser by default.
        // Also needed for some requests to look up language specific data.
        "Accept-Language": i18nService.getTranslationLocale(),
      },
    },
    // enable automatic CSRF protection handling
    {
      useCsrfProtection: true,
      csrfTokenFetchUrl: APP_MAIN_SERVICE_PATH + "/",
    }
  );
}
