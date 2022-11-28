import { IsNotEmpty } from 'class-validator';

import { UserAddressArchivedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class ArchiveUserAddressCommand extends Command<UserAddressArchivedEvent> {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly userAddressId: string;

  constructor({ userId, userAddressId }: OwnCommandProps<ArchiveUserAddressCommand>) {
    super();
    this.userId = userId;
    this.userAddressId = userAddressId;
  }
}
