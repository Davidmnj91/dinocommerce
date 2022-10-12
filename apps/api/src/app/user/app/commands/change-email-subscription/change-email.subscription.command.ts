import { UserAccountUnsubscribedEvent } from '@dinocommerce/events';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class ChangeEmailSubscriptionCommand extends Command<UserAccountUnsubscribedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  @IsBoolean()
  readonly subscribe: boolean;

  constructor(userId: string, subscribe: boolean) {
    super();
    this.userId = userId;
    this.subscribe = subscribe;
  }
}
