import { Expose } from 'class-transformer';

import { OperatorProfileResponse } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

export class OperatorProfileViewModel implements OperatorProfileResponse {
  @Expose()
  @ApiProperty({ example: 'John' })
  readonly name: string;
  @Expose()
  @ApiProperty({ example: 'Doe' })
  readonly lastName: string;
  @Expose()
  @ApiProperty({ example: '31/05/1991' })
  readonly dateOfBirth: Date;
  @Expose()
  @ApiProperty({ example: 'john@doe.com' })
  readonly email: string;
  @Expose()
  @ApiProperty({ example: '+001456789123' })
  readonly phone: string;
  @Expose()
  @ApiProperty({ example: 'http://profilepic.com/my-profile-picture.svg' })
  readonly profilePictureUrl?: string;

  constructor(
    name: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    profilePictureUrl: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.profilePictureUrl = profilePictureUrl;
  }
}
