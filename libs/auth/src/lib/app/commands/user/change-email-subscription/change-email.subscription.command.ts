import {
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

import { UserAccountUnsubscribedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class ChangeEmailSubscriptionCommand extends Command<UserAccountUnsubscribedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  @IsBoolean()
  readonly subscribe: boolean;

  constructor({ userId, subscribe }: OwnCommandProps<ChangeEmailSubscriptionCommand>) {
    super();
    this.userId = userId;
    this.subscribe = subscribe;
  }
}
