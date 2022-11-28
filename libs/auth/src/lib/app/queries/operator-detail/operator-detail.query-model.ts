import {
  Expose,
  Type,
} from 'class-transformer';

import { AuthType } from '@dinocommerce/events';

import { GroupDetailQueryModel } from './group-detail.query-model';

export class OperatorDetailsQueryModel {
  @Expose()
  readonly id: string;
  @Expose()
  readonly operatorId: string;
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
  readonly username: string;
  @Expose()
  readonly password: string;
  @Expose()
  readonly authType: AuthType;
  @Expose()
  readonly profilePictureUrl?: string;
  @Expose()
  @Type(() => Array<GroupDetailQueryModel>)
  readonly groups: GroupDetailQueryModel[];
  @Expose()
  readonly isSuperUser: boolean;

  constructor(
    id: string,
    operatorId: string,
    name: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    username: string,
    password: string,
    authType: AuthType,
    profilePictureUrl: string,
    groups: GroupDetailQueryModel[],
    isSuperUser: boolean
  ) {
    this.id = id;
    this.operatorId = operatorId;
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.authType = authType;
    this.profilePictureUrl = profilePictureUrl;
    this.groups = groups;
    this.isSuperUser = isSuperUser;
  }
}
