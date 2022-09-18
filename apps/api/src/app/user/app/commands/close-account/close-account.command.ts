import { IsNotEmpty } from 'class-validator';

export class CloseUserAccountCommand {
  @IsNotEmpty()
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
