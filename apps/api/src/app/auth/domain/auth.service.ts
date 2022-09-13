import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserCommand } from '../../user/app/commands/create/create-user.command';
import { UserDetailsDto } from '../../user/app/queries/details/user-details.dto';
import { UserDetailsQuery } from '../../user/app/queries/details/user-details.query';
import { User } from '../../user/domain/user.entity';
import { AuthToken } from './auth-token';
import { AuthUser } from './auth-user';
import { InvalidAuthProviderException } from './exception/invalid-auth-provider.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private queryBus: QueryBus, private commandBus: CommandBus) {}

  async validateOAuthRequest(authUser: AuthUser): Promise<AuthUser & AuthToken> {
    let user;

    try {
      user = await this.queryBus.execute<UserDetailsQuery, UserDetailsDto>(new UserDetailsQuery(authUser.email));
    } catch (err) {}

    if (!user) {
      user = await this.createUser(authUser);
    }

    if (user.authType !== authUser.authType) {
      throw new InvalidAuthProviderException();
    }

    const jwt = await this.buildJwt(authUser);
    return { ...authUser, ...jwt };
  }

  async validateUser(email: string, password: string): Promise<AuthUser & AuthToken> {
    const user = await this.queryBus.execute<UserDetailsQuery, UserDetailsDto>(new UserDetailsQuery(email));
    if (user && user.authType === 'EMAIL' && (await this.passwordMatch(password, user))) {
      const authUser = new AuthUser(user.userId, user.username, user.email, user.password, user.authType, user.role);
      const jwt = await this.buildJwt(authUser);
      return { ...authUser, ...jwt };
    }
    throw new UserNotFoundException();
  }

  async createUser(authUser: AuthUser) {
    return this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(
        authUser.userId,
        authUser.username,
        authUser.email,
        authUser.password,
        authUser.authType,
        authUser.role
      )
    );
  }

  private async buildJwt(authUser: AuthUser): Promise<AuthToken> {
    const token = this.jwtService.sign({ sub: authUser.userId });
    return new AuthToken(token);
  }

  private async passwordMatch(password: string, user: UserDetailsDto) {
    return await compare(password, user.password);
  }
}