import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportAuthGuard } from '../shared/auth';
import { ChangeEmailSubscriptionCommandHandler } from './app/commands/change-email-subscription/change-email-subscription.handler';
import { CloseUserAccountCommandHandler } from './app/commands/close-account/close-account.handler';
import { CreateUserCommandHandler } from './app/commands/create/create-user.handler';
import { UserDetailsQueryHandler } from './app/queries/details/user-details.handler';
import { User } from './domain/user.entity';
import { UserService } from './domain/user.service';
import { CloseUserAccountResolver } from './infra/graphql/close-account/close-account.resolver';
import { UsersResolver } from './infra/graphql/profile/profile.resolver';
import { UnsubscribeUserResolver } from './infra/graphql/unsubscribe/unsubscribe.resolver';
import { CloseUserAccountController } from './infra/http/usecase/close-account/close-account.controller';
import { UserProfileController } from './infra/http/usecase/profile/profile.controller';
import { UnsubscribeUserController } from './infra/http/usecase/unsubscribe/unsubscribe.controller';

const commandHandlers = [
  CreateUserCommandHandler,
  CloseUserAccountCommandHandler,
  ChangeEmailSubscriptionCommandHandler,
];
const queryHandlers = [UserDetailsQueryHandler];
const eventHandlers = [];
const controllers = [UserProfileController, CloseUserAccountController, UnsubscribeUserController];
const resolvers = [UsersResolver, CloseUserAccountResolver, UnsubscribeUserResolver];

@Module({
  imports: [MikroOrmModule.forFeature([User]), CqrsModule],
  controllers: [...controllers],
  providers: [UserService, PassportAuthGuard, ...resolvers, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [],
})
export class UserModule {}
