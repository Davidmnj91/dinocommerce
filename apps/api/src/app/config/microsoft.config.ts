import { registerAs } from '@nestjs/config';

export const MICROSOFT_CONFIG = 'MICROSOFT_CONFIG';

export type MicrosoftConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  callbackSuccess: string;
  callbackFailure: string;
};

export default registerAs(
  MICROSOFT_CONFIG,
  (): MicrosoftConfig => ({
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackUrl: process.env.MICROSOFT_CALLBACK_URL || 'http://localhost:3000/api/auth/microsoft/callback',
    callbackSuccess: process.env.MICROSOFT_CALLBACK_SUCCESS || 'http://localhost:3000/api',
    callbackFailure: process.env.MICROSOFT_CALLBACK_FAILURE || 'http://localhost:3000/api',
  })
);
