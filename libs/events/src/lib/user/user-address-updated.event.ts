import { IsNotEmpty } from 'class-validator';

export class UserAddressUpdatedEvent {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly userAddressId: string;

  constructor(userId: string, userAddressId: string) {
    this.userId = userId;
    this.userAddressId = userAddressId;
  }
}
