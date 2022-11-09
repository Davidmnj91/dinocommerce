import { IsNotEmpty } from 'class-validator';

import { UserAccountClosedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class CloseUserAccountCommand extends Command<UserAccountClosedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  constructor({ userId }: OwnCommandProps<CloseUserAccountCommand>) {
    super();
    this.userId = userId;
  }
}
