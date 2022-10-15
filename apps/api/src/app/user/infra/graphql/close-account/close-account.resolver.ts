import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ID, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../shared/auth';
import { CloseUserAccountCommand } from '../../../app/commands/close-account/close-account.command';

@UseGuards(PassportAuthGuard)
@Resolver('Users')
export class CloseUserAccountResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async closeUserAccount(@CurrentUser() user: AuthenticatedUser) {
    const { username } = await this.commandBus.execute(new CloseUserAccountCommand({ userId: user.id }));
    return username;
  }
}
