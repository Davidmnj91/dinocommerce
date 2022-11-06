import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PassportAuthGuard } from '../shared/auth';
import { ChangeEmailSubscriptionCommandHandler } from './app/commands/change-email-subscription/change-email-subscription.handler';
import { CloseUserAccountCommandHandler } from './app/commands/close-account/close-account.handler';
import { CreateUserCommandHandler } from './app/commands/create/create-user.handler';
import { ArchiveUserAddressCommandHandler } from './app/commands/user-address-archive/archive-user-adress.handler';
import { CreateUserAddressCommandHandler } from './app/commands/user-address-create/create-user-address.handler';
import { UpdateUserAddressCommandHandler } from './app/commands/user-address-update/update-user-address.handler';
import { ListUserAddressesQueryHandler } from './app/queries/user-address-list/list-user-address.handler';
import { UserDetailsQueryHandler } from './app/queries/user-details/user-details.handler';
import { UserAddressDomainService } from './domain/user-address.service';
import { UserAddress } from './domain/user-adress.entity';
import { User } from './domain/user.entity';
import { UserDomainService } from './domain/user.service';
import { CloseUserAccountController } from './infra/http/usecase/user-account-close/close-account.controller';
import { UserProfileController } from './infra/http/usecase/user-account-profile/profile.controller';
import { UnsubscribeUserController } from './infra/http/usecase/user-account-unsubscribe/unsubscribe.controller';
import { UserAddressArchiveController } from './infra/http/usecase/user-address-archive/archive-user-address.controller';
import { UserAddressCreateController } from './infra/http/usecase/user-address-create/create-user-address.controller';
import { UserAddressListController } from './infra/http/usecase/user-address-list/list-user-address.controller';
import { UserAddressUpdateController } from './infra/http/usecase/user-address-update/update-user-address.controller';

const commandHandlers = [
  CreateUserCommandHandler,
  CloseUserAccountCommandHandler,
  ChangeEmailSubscriptionCommandHandler,
  CreateUserAddressCommandHandler,
  UpdateUserAddressCommandHandler,
  ArchiveUserAddressCommandHandler,
];
const queryHandlers = [UserDetailsQueryHandler, ListUserAddressesQueryHandler];
const eventHandlers = [];
const controllers = [
  UserProfileController,
  CloseUserAccountController,
  UnsubscribeUserController,
  UserAddressCreateController,
  UserAddressUpdateController,
  UserAddressListController,
  UserAddressArchiveController,
];

@Module({
  imports: [MikroOrmModule.forFeature([User, UserAddress]), CqrsModule],
  controllers: [...controllers],
  providers: [
    UserDomainService,
    UserAddressDomainService,
    PassportAuthGuard,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
  ],
  exports: [],
})
export class UserModule {}
