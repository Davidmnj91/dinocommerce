import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class CloseUserAccountCommand extends Command<void> {
  @IsNotEmpty()
  readonly userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
