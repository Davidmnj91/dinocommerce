import { registerAs } from '@nestjs/config';

export const TWITTER_CONFIG = 'TWITTER_CONFIG';

export type TwitterConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  callbackSuccess: string;
  callbackFailure: string;
};

export default registerAs(
  TWITTER_CONFIG,
  (): TwitterConfig => ({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/api/auth/microsoft/callback',
    callbackSuccess: process.env.TWITTER_CALLBACK_SUCCESS || 'http://localhost:3000/api',
    callbackFailure: process.env.TWITTER_CALLBACK_FAILURE || 'http://localhost:3000/api',
  })
);
