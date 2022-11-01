import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { MicrosoftConfig, MICROSOFT_CONFIG } from '../../../config/microsoft.config';
import { MICROSOFT_STRATEGY } from '../../../shared/auth/auth.strategies';
import { AuthToken } from '../../domain/auth-token';
import { AuthUser } from '../../domain/auth-user';
import { AuthService } from '../../domain/auth.service';

type MicrosoftProfile = {
  id: string;
  displayName: string;
  userPrincipalName: string; // Microsoft email field
};

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, MICROSOFT_STRATEGY) {
  constructor(private configService: ConfigService, private domainService: AuthService) {
    super({
      clientID: configService.get<MicrosoftConfig>(MICROSOFT_CONFIG).clientId,
      clientSecret: configService.get<MicrosoftConfig>(MICROSOFT_CONFIG).clientSecret,
      callbackURL: configService.get<MicrosoftConfig>(MICROSOFT_CONFIG).callbackUrl,
      scope: ['user.read'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: MicrosoftProfile
  ): Promise<AuthUser & AuthToken> {
    const { id, displayName, userPrincipalName } = profile;
    const picture = this.domainService.createRandomAvatarUrl(userPrincipalName);

    const authUser = new AuthUser(id, displayName, userPrincipalName, '', 'MICROSOFT', 'USER', picture);
    return await this.domainService.validateOAuthRequest(authUser);
  }
}
