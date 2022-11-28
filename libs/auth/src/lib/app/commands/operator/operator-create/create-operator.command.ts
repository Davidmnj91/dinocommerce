import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

import { OperatorCreatedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class CreateOperatorCommand extends Command<OperatorCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly dateOfBirth: Date;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;

  readonly groups: string[];

  readonly isSuperUser: boolean;

  readonly profilePictureUrl?: string;

  constructor({
    name,
    lastName,
    dateOfBirth,
    email,
    phone,
    password,
    groups,
    isSuperUser,
    profilePictureUrl,
  }: Partial<OwnCommandProps<CreateOperatorCommand>>) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.groups = groups;
    this.isSuperUser = isSuperUser;
    this.profilePictureUrl = profilePictureUrl;
  }
}
