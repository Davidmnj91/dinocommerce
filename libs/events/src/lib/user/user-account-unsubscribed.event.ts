import { IsNotEmpty } from 'class-validator';

export class UserAccountUnsubscribedEvent {
  @IsNotEmpty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
