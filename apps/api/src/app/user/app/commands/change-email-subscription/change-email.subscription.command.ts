import { Command } from 'apps/api/src/app/shared/cqrs';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ChangeEmailSubscriptionCommand extends Command<void> {
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
