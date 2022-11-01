import { registerAs } from '@nestjs/config';

export const MAIL_CONFIG = 'MAIL_CONFIG';

export type MailConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  defaultEmail: string;
  defaultName: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
};

export default registerAs(
  MAIL_CONFIG,
  (): MailConfig => ({
    port: parseInt(process.env.MAIL_PORT, 10),
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
    defaultName: process.env.MAIL_DEFAULT_NAME,
    ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
    secure: process.env.MAIL_SECURE === 'true',
    requireTLS: process.env.MAIL_REQUIRE_TLS === 'true',
  })
);
