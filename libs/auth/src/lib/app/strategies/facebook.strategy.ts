import { Strategy } from 'passport-facebook';

import {
  FACEBOOK_CONFIG,
  FacebookConfig,
} from '@dinocommerce/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { AuthToken } from '../../domain/auth/auth-token';
import { AuthUser } from '../../domain/auth/auth-user';
import { AuthService } from '../../domain/auth/auth.service';
import { FACEBOOK_STRATEGY } from '../../shared';

type FacebookProfile = {
  id: string;
  displayName: string;
  email: string;
  picture: Array<{ value: string }>;
};

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, FACEBOOK_STRATEGY) {
  constructor(private configService: ConfigService, private domainService: AuthService) {
    super({
      clientID: configService.get<FacebookConfig>(FACEBOOK_CONFIG).clientId,
      clientSecret: configService.get<FacebookConfig>(FACEBOOK_CONFIG).clientSecret,
      callbackURL: configService.get<FacebookConfig>(FACEBOOK_CONFIG).callbackUrl,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: FacebookProfile): Promise<AuthUser & AuthToken> {
    const { id, displayName, email, picture } = profile;
    const authUser = new AuthUser(null, id, displayName, email, '', 'FACEBOOK', picture && picture[0].value);
    return await this.domainService.validateOAuthRequest(authUser);
  }
}
