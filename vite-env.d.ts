/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}