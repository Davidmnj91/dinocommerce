import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloseUserAccountCommandHandler } from './app/commands/close-account/close-account.handler';
import { CreateUserCommandHandler } from './app/commands/create/create-user.handler';
import { UserDetailsQueryHandler } from './app/queries/details/user-details.handler';
import { User } from './domain/user.entity';
import { UserService } from './domain/user.service';
import { CloseUserAccountController } from './infra/http/usecase/close-account/close-account.controller';
import { UserProfileController } from './infra/http/usecase/profile/profile.controller';

const commandHandlers = [CreateUserCommandHandler, CloseUserAccountCommandHandler];
const queryHandlers = [UserDetailsQueryHandler];
const eventHandlers = [];
const controllers = [UserProfileController, CloseUserAccountController];

@Module({
  imports: [MikroOrmModule.forFeature([User]), CqrsModule],
  controllers: [...controllers],
  providers: [UserService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [UserService],
})
export class UserModule {}
