import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserCommand } from '../../user/app/commands/create/create-user.command';
import { UserDetailsDto } from '../../user/app/queries/user-details/user-details.dto';
import { UserDetailsQuery } from '../../user/app/queries/user-details/user-details.query';
import { AuthToken } from './auth-token';
import { AuthUser } from './auth-user';
import { InvalidAuthProviderException } from './exception/invalid-auth-provider.exception';
import { InvalidPasswordException } from './exception/invalid-password.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private queryBus: QueryBus, private commandBus: CommandBus) {}

  async validateOAuthRequest(authUser: AuthUser): Promise<AuthUser & AuthToken> {
    let user: UserDetailsDto;

    try {
      user = await this.queryBus.execute(new UserDetailsQuery({ userIdOrEmail: authUser.email }));
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    if (!user) {
      user = await this.createUser(authUser);
    }

    if (user.authType !== authUser.authType) {
      throw new InvalidAuthProviderException(authUser.authType);
    }

    const jwt = await this.buildJwt(authUser);
    return { ...authUser, ...jwt };
  }

  async validateEmailAuthLogin(email: string, password: string): Promise<AuthUser & AuthToken> {
    let user: UserDetailsDto;
    try {
      user = await this.queryBus.execute(new UserDetailsQuery({ userIdOrEmail: email }));
    } catch (_) {
      throw new UserNotFoundException(email);
    }

    if (user.authType !== 'EMAIL') {
      throw new InvalidAuthProviderException(user.email, user.authType);
    }

    if (!(await this.passwordMatch(password, user))) {
      throw new InvalidPasswordException();
    }

    const authUser = new AuthUser(
      user.id,
      user.userId,
      user.username,
      user.email,
      user.password,
      user.authType,
      user.role
    );
    const jwt = await this.buildJwt(authUser);
    return { ...authUser, ...jwt };
  }

  async findUserFromToken(userId: string): Promise<AuthUser> {
    let user: UserDetailsDto;
    try {
      user = await this.queryBus.execute(new UserDetailsQuery({ userIdOrEmail: userId }));
    } catch (_) {
      throw new UserNotFoundException(userId);
    }
    return user;
  }

  async createUser(authUser: AuthUser) {
    return this.commandBus.execute(
      new CreateUserCommand({
        userId: authUser.userId,
        username: authUser.username,
        email: authUser.email,
        password: authUser.password,
        authType: authUser.authType,
        role: authUser.role,
        profilePictureUrl: authUser.profilePictureUrl,
      })
    );
  }

  createRandomAvatarUrl(seed: string): string {
    return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?mouth=smile&style=circle&eyes=happy&eyes=wink`;
  }

  private async buildJwt(authUser: AuthUser): Promise<AuthToken> {
    const token = this.jwtService.sign({ sub: authUser.userId, role: authUser.role });
    return new AuthToken(token);
  }

  private async passwordMatch(password: string, user: UserDetailsDto) {
    return await compare(password, user.password);
  }
}
