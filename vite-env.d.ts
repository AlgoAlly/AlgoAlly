/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_API_HOST: string;
  readonly VITE_USER_API_PORT: string;

  readonly VITE_PROBLEMS_API_HOST: string;
  readonly VITE_PROBLEMS_API_PORT: string;

  readonly VITE_JUDGE0_API_HOST: string;
  readonly VITE_JUDGE0_API_PORT: string;

  readonly VITE_MATCHMAKING_API_HOST: string;
  readonly VITE_MATCHMAKING_API_PORT: string;

  readonly VITE_CHAT_API_HOST: string;
  readonly VITE_CHAT_API_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
