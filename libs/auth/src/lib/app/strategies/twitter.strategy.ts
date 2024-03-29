import { Strategy } from 'passport-twitter-oauth2';

import {
  TWITTER_CONFIG,
  TwitterConfig,
} from '@dinocommerce/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { AuthToken } from '../../domain/auth/auth-token';
import { AuthUser } from '../../domain/auth/auth-user';
import { AuthService } from '../../domain/auth/auth.service';
import { TWITTER_STRATEGY } from '../../shared';

type TwitterProfile = {
  id: string;
  email: string;
  displayName: string;
};

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, TWITTER_STRATEGY) {
  constructor(private configService: ConfigService, private domainService: AuthService) {
    super({
      clientID: configService.get<TwitterConfig>(TWITTER_CONFIG).clientId,
      clientSecret: configService.get<TwitterConfig>(TWITTER_CONFIG).clientSecret,
      callbackURL: configService.get<TwitterConfig>(TWITTER_CONFIG).callbackUrl,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: TwitterProfile): Promise<AuthUser & AuthToken> {
    const { id, email, displayName } = profile;
    const picture = this.domainService.createRandomAvatarUrl(email);

    const authUser = new AuthUser(null, id, email, displayName, '', 'TWITTER', picture);
    return await this.domainService.validateOAuthRequest(authUser);
  }
}
