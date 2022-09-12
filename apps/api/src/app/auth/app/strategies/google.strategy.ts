import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { GoogleConfig, GOOGLE_CONFIG } from '../../../config/google.config';
import { AuthToken } from '../../domain/auth-token';
import { AuthUser } from '../../domain/auth-user';
import { AuthService } from '../../domain/auth.service';

export const GOOGLE_STRATEGY = 'google';

type GoogleProfile = {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  picture: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, GOOGLE_STRATEGY) {
  constructor(private configService: ConfigService, private domainService: AuthService) {
    super({
      clientID: configService.get<GoogleConfig>(GOOGLE_CONFIG).clientId,
      clientSecret: configService.get<GoogleConfig>(GOOGLE_CONFIG).clientSecret,
      callbackURL: configService.get<GoogleConfig>(GOOGLE_CONFIG).callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: GoogleProfile): Promise<AuthUser & AuthToken> {
    const { id, displayName, emails } = profile;
    const authUser = new AuthUser(id, displayName, emails[0].value, '', 'GOOGLE', 'USER');
    return await this.domainService.validateOAuthRequest(authUser);
  }
}
