import { registerAs } from '@nestjs/config';

export const GOOGLE_CONFIG = 'GOOGLE_CONFIG';

export type GoogleConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  callbackSuccess: string;
  callbackFailure: string;
};

export default registerAs(
  GOOGLE_CONFIG,
  (): GoogleConfig => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
    callbackSuccess: process.env.GOOGLE_CALLBACK_SUCCESS || 'http://localhost:3000/api',
    callbackFailure: process.env.GOOGLE_CALLBACK_FAILURE || 'http://localhost:3000/api',
  })
);
