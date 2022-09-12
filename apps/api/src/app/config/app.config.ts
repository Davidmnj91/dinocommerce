import { registerAs } from '@nestjs/config';

export const APP_CONFIG = 'APP_CONFIG';

export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
};

export default registerAs(
  APP_CONFIG,
  (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN,
    port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  })
);
