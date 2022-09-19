import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { FacebookConfig, FACEBOOK_CONFIG } from '../../../config/facebook.config';
import { FACEBOOK_STRATEGY } from '../../../shared/auth/auth.strategies';
import { AuthToken } from '../../domain/auth-token';
import { AuthUser } from '../../domain/auth-user';
import { AuthService } from '../../domain/auth.service';

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
    const authUser = new AuthUser(id, displayName, email, '', 'FACEBOOK', 'USER', picture && picture[0].value);
    return await this.domainService.validateOAuthRequest(authUser);
  }
}
