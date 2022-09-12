import { registerAs } from '@nestjs/config';

export const AUTH_CONFIG = 'AUTH_CONFIG';

export type AuthConfig = {
  secret: string;
  expiresIn: string;
};

export default registerAs(
  AUTH_CONFIG,
  (): AuthConfig => ({
    secret: process.env.AUTH_JWT_SECRET,
    expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  })
);
