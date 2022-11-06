import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Roles } from '../../../../../../../libs/events/src';
import { AuthConfig, AUTH_CONFIG } from '../../../config/auth.config';
import { AuthenticatedUser } from '../../../shared/auth';
import { JWT_STRATEGY } from '../../../shared/auth/auth.strategies';
import { AuthService } from '../../domain/auth.service';

type JwtPayload = { sub: string; role: Roles; iat: number; exp: number };

const extractJwtFromCookie =
  (cookieName: string): JwtFromRequestFunction =>
  (req: Request): string | null =>
    req.cookies[cookieName];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie(configService.get<AuthConfig>(AUTH_CONFIG).cookieName),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<AuthConfig>(AUTH_CONFIG).secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const { sub } = payload;
    const { id, role } = await this.authService.findUserFromToken(sub);

    return { id, role };
  }
}
