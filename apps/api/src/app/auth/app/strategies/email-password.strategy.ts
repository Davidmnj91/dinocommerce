import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUser } from '../../domain/auth-user';
import { AuthService } from '../../domain/auth.service';

export const EMAIL_PASSWORD_STRATEGY = 'email_password';

@Injectable()
export class EmailPasswordStrategy extends PassportStrategy(Strategy, EMAIL_PASSWORD_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
