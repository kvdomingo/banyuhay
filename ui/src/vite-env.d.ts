/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_STYTCH_PUBLIC_TOKEN: string;
  readonly VITE_PUBLIC_APP_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
