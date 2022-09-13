import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'John Doe' })
  readonly userName: string;
  @ApiProperty({ example: 'john@doe.com' })
  readonly email: string;
  @ApiProperty({ example: '+001456789123' })
  readonly phone: string;

  constructor(userName: string, email: string, phone: string) {
    this.userName = userName;
    this.email = email;
    this.phone = phone;
  }
}
