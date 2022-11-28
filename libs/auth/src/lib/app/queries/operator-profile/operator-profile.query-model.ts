import { Expose } from 'class-transformer';

export class OperatorProfileQueryModel {
  @Expose()
  readonly name: string;
  @Expose()
  readonly lastName: string;
  @Expose()
  readonly dateOfBirth: Date;
  @Expose()
  readonly email: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly password: string;
  @Expose()
  readonly profilePictureUrl?: string;

  constructor(
    name: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    password: string,
    profilePictureUrl: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.profilePictureUrl = profilePictureUrl;
  }
}
