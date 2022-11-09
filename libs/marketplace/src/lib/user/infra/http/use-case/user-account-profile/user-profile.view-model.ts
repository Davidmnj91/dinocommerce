import { Expose } from 'class-transformer';

import { UserProfileResponse } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileViewModel implements UserProfileResponse {
  @Expose()
  @ApiProperty({ example: 'John Doe' })
  readonly username: string;
  @Expose()
  @ApiProperty({ example: 'john@doe.com' })
  readonly email: string;
  @Expose()
  @ApiProperty({ example: '+001456789123' })
  readonly phone: string;
  @Expose()
  @ApiProperty({ example: 'http://profilepic.com/my-profile-picture.svg' })
  readonly profilePictureUrl?: string;

  constructor(username: string, email: string, phone: string, profilePictureUrl?: string) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.profilePictureUrl = profilePictureUrl;
  }
}
