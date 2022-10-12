import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../shared/auth';
import { UserDetailsQuery } from '../../../app/queries/details/user-details.query';
import { UserProfile } from './user-profile.type';

@UseGuards(PassportAuthGuard)
@Resolver('Users')
export class UsersResolver {
  constructor(private queryBus: QueryBus) {}

  @Query(() => UserProfile)
  async getProfile(@CurrentUser() user: AuthenticatedUser): Promise<UserProfile> {
    const { username, email, phone, profilePictureUrl } = await this.queryBus.execute(new UserDetailsQuery(user.id));

    return new UserProfile(username, email, phone, profilePictureUrl);
  }
}
