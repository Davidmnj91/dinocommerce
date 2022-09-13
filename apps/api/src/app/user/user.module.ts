import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserCommandHandler } from './app/commands/create/create-user.handler';
import { UserDetailsQueryHandler } from './app/queries/details/user-details.handler';
import { User } from './domain/user.entity';
import { UserService } from './domain/user.service';
import { UserProfileController } from './infra/http/usecase/profile/profile.controller';

const commandHandlers = [CreateUserCommandHandler];
const queryHandlers = [UserDetailsQueryHandler];
const eventHandlers = [];
const controllers = [UserProfileController];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [...controllers],
  providers: [UserService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [UserService],
})
export class UserModule {}
