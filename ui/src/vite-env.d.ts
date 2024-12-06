/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_KINDE_HOST: string;
  readonly VITE_PUBLIC_APP_HOST: string;
  readonly VITE_PUBLIC_KINDE_CLIENT_ID: string;
  readonly VITE_PUBLIC_KINDE_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
