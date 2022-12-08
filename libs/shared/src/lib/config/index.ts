import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import facebookConfig from './facebook.config';
import googleConfig from './google.config';
import loggerConfig from './logger.config';
import mailConfig from './mail.config';
import microsoftConfig from './microsoft.config';

export { APP_CONFIG, AppConfig } from './app.config';
export { AUTH_CONFIG, AuthConfig } from './auth.config';
export { DATABASE_CONFIG, DatabaseConfig } from './database.config';
export { FACEBOOK_CONFIG, FacebookConfig } from './facebook.config';
export { GOOGLE_CONFIG, GoogleConfig } from './google.config';
export { LOGGER_CONFIG, LoggerConfig } from './logger.config';
export { MAIL_CONFIG, MailConfig } from './mail.config';
export { MICROSOFT_CONFIG, MicrosoftConfig } from './microsoft.config';

export const configurations = [
  appConfig,
  authConfig,
  databaseConfig,
  googleConfig,
  facebookConfig,
  microsoftConfig,
  mailConfig,
  loggerConfig,
];
