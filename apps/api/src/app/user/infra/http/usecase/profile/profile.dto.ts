import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserProfileViewModel {
  @Expose()
  @ApiProperty({ example: 'John Doe' })
  readonly userName: string;
  @Expose()
  @ApiProperty({ example: 'john@doe.com' })
  readonly email: string;
  @Expose()
  @ApiProperty({ example: '+001456789123' })
  readonly phone: string;
  @Expose()
  @ApiProperty({ example: 'http://profilepic.com/my-profile-picture.svg' })
  readonly profilePictureUrl?: string;

  constructor(userName: string, email: string, phone: string, profilePictureUrl?: string) {
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.profilePictureUrl = profilePictureUrl;
  }
}
