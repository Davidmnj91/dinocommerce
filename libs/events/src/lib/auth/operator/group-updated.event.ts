import { IsNotEmpty } from 'class-validator';

export class GroupUpdatedEvent {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
