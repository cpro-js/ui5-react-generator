import { I18nModuleRegistryOptions } from "@cpro-js/react-core";
import { DEFAULT_LANGUAGE } from "../../app.config";

export const createI18nConfig = (locale?: string): I18nModuleRegistryOptions => ({
  debug: false,
  fallbackLocale: DEFAULT_LANGUAGE,
  getTranslations: (localeToLoad) => import(`../i18n/${localeToLoad}.i18n.json`),
  // when integrated into launchpad, then launchpad will provide the locale;
  // in standalone mode query string & browser setting are supported
  localeResolver: locale ?? {
    order: ["querystring", "navigator"],
    lookupQuerystring: "sap-language",
  },
  // specify all maintained translations, i.e. files existing in src/i18n,
  // e.g. ["en", "en-GB", "de"] if you have en.i18n.json, en-GB.i18n.json & de.i18n.json
  maintainedTranslations: [DEFAULT_LANGUAGE],
  // restrict locale to be used for formatting
  // supportedFormattingLocales: ["en-*"],
});
