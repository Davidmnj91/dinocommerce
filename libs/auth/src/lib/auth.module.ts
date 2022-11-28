import {
  AUTH_CONFIG,
  AuthConfig,
  JWT_STRATEGY,
} from '@dinocommerce/shared';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CreateGroupCommandHandler } from './app/commands/operator/group-create/create-group.handler';
import { UpdateGroupCommandHandler } from './app/commands/operator/group-update/update-group.handler';
import { CreateOperatorCommandHandler } from './app/commands/operator/operator-create/create-operator.handler';
import {
  ChangeEmailSubscriptionCommandHandler,
} from './app/commands/user/change-email-subscription/change-email-subscription.handler';
import { CloseUserAccountCommandHandler } from './app/commands/user/close-account/close-account.handler';
import { CreateUserCommandHandler } from './app/commands/user/create/create-user.handler';
import { RegisterEmailCommandHandler } from './app/commands/user/register-email/register-email.handler';
import { ArchiveUserAddressCommandHandler } from './app/commands/user/user-address-archive/archive-user-adress.handler';
import { CreateUserAddressCommandHandler } from './app/commands/user/user-address-create/create-user-address.handler';
import { UpdateUserAddressCommandHandler } from './app/commands/user/user-address-update/update-user-address.handler';
import { GetGroupQueryHandler } from './app/queries/group-get/get-group.handler';
import { GetGroupsQueryHandler } from './app/queries/groups-get/get-groups.handler';
import { GetOperatorDetailsQueryHandler } from './app/queries/operator-detail/operator-detail.handler';
import { OperatorProfileQueryHandler } from './app/queries/operator-profile/operator-profile.handler';
import { ListUserAddressesQueryHandler } from './app/queries/user-address-list/list-user-address.handler';
import { UserDetailsQueryHandler } from './app/queries/user-details/user-details.handler';
import { UserProfileQueryHandler } from './app/queries/user-profile/user-profile.handler';
import { EmailPasswordStrategy } from './app/strategies/email-password.strategy';
import { FacebookStrategy } from './app/strategies/facebook.strategy';
import { GoogleStrategy } from './app/strategies/google.strategy';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { MicrosoftStrategy } from './app/strategies/microsoft.strategy';
import { TwitterStrategy } from './app/strategies/twitter.strategy';
import { AuthService } from './domain/auth/auth.service';
import { Group } from './domain/operator/group';
import { GroupDomainService } from './domain/operator/group.service';
import { Operator } from './domain/operator/operator';
import { OperatorDomainService } from './domain/operator/operator.service';
import { Permission } from './domain/operator/permission';
import { PermissionDomainService } from './domain/operator/permission.service';
import { UserAddressDomainService } from './domain/user/user-address.service';
import { UserAddress } from './domain/user/user-adress.entity';
import { User } from './domain/user/user.entity';
import { UserDomainService } from './domain/user/user.service';
import { EmailAuthUserController } from './infra/http/use-case/operator/auth/email-auth/email-auth.controller';
import { CreateGroupController } from './infra/http/use-case/operator/group/group-create/create-group.controller';
import { GetGroupController } from './infra/http/use-case/operator/group/group-get/get-group.controller';
import { ListGroupsController } from './infra/http/use-case/operator/group/group-list/get-groups.controller';
import { UpdateGroupController } from './infra/http/use-case/operator/group/group-update/update-group.controller';
import { OperatorProfileController } from './infra/http/use-case/operator/operator-profile/operator-profile.controller';
import {
  CloseUserAccountController,
} from './infra/http/use-case/user/user-account-close/close-user-account.controller';
import { UserProfileController } from './infra/http/use-case/user/user-account-profile/user-profile.controller';
import {
  UnsubscribeUserController,
} from './infra/http/use-case/user/user-account-unsubscribe/unsubscribe-user-account.controller';
import {
  UserAddressArchiveController,
} from './infra/http/use-case/user/user-address-archive/archive-user-address.controller';
import {
  UserAddressCreateController,
} from './infra/http/use-case/user/user-address-create/create-user-address.controller';
import { UserAddressListController } from './infra/http/use-case/user/user-address-list/list-user-address.controller';
import {
  UserAddressUpdateController,
} from './infra/http/use-case/user/user-address-update/update-user-address.controller';

const commandHandlers = [
  RegisterEmailCommandHandler,
  CreateGroupCommandHandler,
  UpdateGroupCommandHandler,
  CreateOperatorCommandHandler,
];
const queryHandlers = [
  GetOperatorDetailsQueryHandler,
  GetGroupsQueryHandler,
  GetGroupQueryHandler,
  OperatorProfileQueryHandler,
  ListUserAddressesQueryHandler,
  UserDetailsQueryHandler,
  UserProfileQueryHandler,
];
const eventHandlers = [];
const controllers = [
  EmailAuthUserController,
  CreateGroupController,
  UpdateGroupController,
  ListGroupsController,
  GetGroupController,
  OperatorProfileController,
];
const authStrategies = [
  JwtStrategy,
  EmailPasswordStrategy,
  GoogleStrategy,
  FacebookStrategy,
  MicrosoftStrategy,
  TwitterStrategy,
];

const userCommandHandlers = [
  CreateUserCommandHandler,
  CloseUserAccountCommandHandler,
  ChangeEmailSubscriptionCommandHandler,
  CreateUserAddressCommandHandler,
  UpdateUserAddressCommandHandler,
  ArchiveUserAddressCommandHandler,
];
const userQueryHandlers = [UserDetailsQueryHandler, UserProfileQueryHandler, ListUserAddressesQueryHandler];
const userEventHandlers = [];
const userControllers = [
  UserProfileController,
  CloseUserAccountController,
  UnsubscribeUserController,
  UserAddressCreateController,
  UserAddressUpdateController,
  UserAddressListController,
  UserAddressArchiveController,
];

@Module({
  imports: [
    MikroOrmModule.forFeature([Operator, Group, Permission, User, UserAddress]),
    CqrsModule,
    PassportModule.register({
      defaultStrategy: JWT_STRATEGY,
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>(AUTH_CONFIG);

        return {
          secret: authConfig.secret,
          signOptions: {
            expiresIn: authConfig.expiresIn,
          },
        };
      },
    }),
  ],
  providers: [
    OperatorDomainService,
    GroupDomainService,
    PermissionDomainService,
    AuthService,
    UserDomainService,
    UserAddressDomainService,
    ...authStrategies,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...userCommandHandlers,
    ...userQueryHandlers,
    ...userEventHandlers,
  ],
  controllers: [...controllers, ...userControllers],
  exports: [AuthService],
})
export class AuthModule {}
