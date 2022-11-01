import { UserAccountClosedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command, OwnCommandProps } from '../../../../shared/cqrs';

export class CloseUserAccountCommand extends Command<UserAccountClosedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  constructor({ userId }: OwnCommandProps<CloseUserAccountCommand>) {
    super();
    this.userId = userId;
  }
}
