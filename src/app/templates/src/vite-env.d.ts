/// <reference types="vite/client" />

interface ImportMetaEnv {
  // all env variables with prefix APP_ are available
  readonly APP_DEFAULT_LANGUAGE: string;
  readonly APP_MAIN_SERVICE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
