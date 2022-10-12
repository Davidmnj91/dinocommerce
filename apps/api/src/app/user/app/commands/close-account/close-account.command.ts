import { UserAccountClosedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class CloseUserAccountCommand extends Command<UserAccountClosedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
