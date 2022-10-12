import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field()
  readonly userName: string;

  @Field()
  readonly email: string;

  @Field()
  readonly phone: string;

  @Field({ nullable: true })
  readonly profilePictureUrl?: string;

  constructor(userName: string, email: string, phone: string, profilePictureUrl?: string) {
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.profilePictureUrl = profilePictureUrl;
  }
}
