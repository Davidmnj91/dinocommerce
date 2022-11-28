import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmailRequestModel {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '12/12/1888' })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ example: 'dino@dino.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+34123456789' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'dino' })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  groupIds: string[];

  @ApiProperty()
  isSuperUser: boolean;
}
