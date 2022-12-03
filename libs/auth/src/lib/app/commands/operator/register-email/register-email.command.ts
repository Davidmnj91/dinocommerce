import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class RegisterOperatorByEmailCommand extends Command<void> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  password: string;

  groupIds?: string[];

  isSuperUser?: boolean;

  constructor({
    name,
    lastName,
    dateOfBirth,
    email,
    phone,
    password,
    groupIds,
    isSuperUser,
  }: OwnCommandProps<RegisterOperatorByEmailCommand>) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.groupIds = groupIds;
    this.isSuperUser = isSuperUser;
  }
}
