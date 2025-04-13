/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface env {
    readonly VITE_API: string;
  }
  