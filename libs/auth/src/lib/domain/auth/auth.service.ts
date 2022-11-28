import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import {
  CommandBus,
  QueryBus,
} from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserCommand } from '../../app/commands/user/create/create-user.command';
import { GetOperatorDetailsQuery } from '../../app/queries/operator-detail/operator-detail.query';
import { OperatorDetailsQueryModel } from '../../app/queries/operator-detail/operator-detail.query-model';
import { InvalidAuthProviderException } from '../exception/invalid-auth-provider.exception';
import { InvalidPasswordException } from '../exception/invalid-password.exception';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { AuthToken } from './auth-token';
import { AuthUser } from './auth-user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private queryBus: QueryBus, private commandBus: CommandBus) {}

  async validateOAuthRequest(authUser: AuthUser): Promise<AuthUser & AuthToken> {
    let queryModel: OperatorDetailsQueryModel;

    try {
      queryModel = await this.queryBus.execute(new GetOperatorDetailsQuery({ email: authUser.email }));
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    if (!queryModel) {
      await this.createUser(authUser);
    } else if (queryModel.authType !== authUser.authType) {
      throw new InvalidAuthProviderException(authUser.authType);
    }

    const jwt = await this.buildJwt(authUser);
    return { ...authUser, ...jwt };
  }

  async validateEmailAuthLogin(email: string, password: string): Promise<AuthUser & AuthToken> {
    let operator: OperatorDetailsQueryModel;
    try {
      operator = await this.queryBus.execute(new GetOperatorDetailsQuery({ email }));
    } catch (_) {
      throw new UserNotFoundException(email);
    }

    if (!(await this.passwordMatch(password, operator))) {
      throw new InvalidPasswordException();
    }

    const authUser = new AuthUser(
      operator.id,
      operator.email,
      operator.username,
      operator.email,
      operator.password,
      operator.authType
    );
    const jwt = await this.buildJwt(authUser);
    return { ...authUser, ...jwt };
  }

  async findUserFromToken(email: string): Promise<OperatorDetailsQueryModel> {
    let user: OperatorDetailsQueryModel;
    try {
      user = await this.queryBus.execute(new GetOperatorDetailsQuery({ email }));
    } catch (_) {
      throw new UserNotFoundException(email);
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
        role: 'USER',
        profilePictureUrl: authUser.profilePictureUrl,
      })
    );
  }

  createRandomAvatarUrl(seed: string): string {
    return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?mouth=smile&style=circle&eyes=happy&eyes=wink`;
  }

  private async buildJwt(authUser: AuthUser): Promise<AuthToken> {
    const token = this.jwtService.sign({ sub: authUser.userId });
    return new AuthToken(token);
  }

  private async passwordMatch(password: string, operator: OperatorDetailsQueryModel) {
    return await compare(password, operator.password);
  }
}
