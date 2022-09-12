import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig, AUTH_CONFIG } from '../../../config/auth.config';

type JwtPayload = { sub: string; role: string; iat: number; exp: number };

export const JWT_STRATEGY = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>(AUTH_CONFIG).secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    return payload.sub;
  }
}
