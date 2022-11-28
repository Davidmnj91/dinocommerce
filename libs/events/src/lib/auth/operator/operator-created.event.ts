import { IsNotEmpty } from 'class-validator';

export class OperatorCreatedEvent {
  @IsNotEmpty()
  readonly operatorId: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly lastName: string;

  constructor(operatorId: string, email: string, name: string, lastName: string) {
    this.operatorId = operatorId;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
  }
}
