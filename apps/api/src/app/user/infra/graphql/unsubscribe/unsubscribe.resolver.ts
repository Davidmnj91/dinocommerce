import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ID, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../shared/auth';
import { ChangeEmailSubscriptionCommand } from '../../../app/commands/change-email-subscription/change-email.subscription.command';

@UseGuards(PassportAuthGuard)
@Resolver('Users')
export class UnsubscribeUserResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async unsubscribe(@CurrentUser() user: AuthenticatedUser) {
    const { id } = await this.commandBus.execute(
      new ChangeEmailSubscriptionCommand({ userId: user.id, subscribe: false })
    );
    return id;
  }
}
