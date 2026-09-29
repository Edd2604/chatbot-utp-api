declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PORT: string
    DATABASE_URL: string
    JWT_SECRET: string
    REFRESH_JWT_SECRET: string
    GEMINI_API_KEY: string
    RENIEC_TOKEN: string
  }
}
