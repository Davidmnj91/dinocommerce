import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/user.service';
import { UserProfileQuery } from './user-profile.query';
import { UserProfileQueryModel } from './user-profile.query-model';

@QueryHandler(UserProfileQuery)
export class UserProfileQueryHandler implements IInferredQueryHandler<UserProfileQuery> {
  constructor(private domainService: UserDomainService) {}

  async execute(query: UserProfileQuery): Promise<UserProfileQueryModel> {
    const { userId } = query;

    const user = await this.domainService.findUserById(userId);

    return new UserProfileQueryModel(
      user.userId,
      user.username,
      user.email,
      user.phone,
      user.password,
      user.authType,
      user.role,
      user.profilePictureUrl
    );
  }
}
