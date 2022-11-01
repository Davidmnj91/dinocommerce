import { registerAs } from '@nestjs/config';

export const FACEBOOK_CONFIG = 'FACEBOOK_CONFIG';

export type FacebookConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  callbackSuccess: string;
  callbackFailure: string;
};

export default registerAs(
  FACEBOOK_CONFIG,
  (): FacebookConfig => ({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback',
    callbackSuccess: process.env.FACEBOOK_CALLBACK_SUCCESS || 'http://localhost:3000/api',
    callbackFailure: process.env.FACEBOOK_CALLBACK_FAILURE || 'http://localhost:3000/api',
  })
);
