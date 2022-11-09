import { Strategy } from 'passport-local';

import { EMAIL_PASSWORD_STRATEGY } from '@dinocommerce/shared';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthUser } from '../../domain/auth-user';
import { AuthService } from '../../domain/auth.service';

@Injectable()
export class EmailPasswordStrategy extends PassportStrategy(Strategy, EMAIL_PASSWORD_STRATEGY) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    const user = await this.authService.validateEmailAuthLogin(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
