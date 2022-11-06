import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/user.service';
import { UserDetailsQuery } from './user-details.query';
import { UserDetailsQueryModel } from './user-details.query-model';

@QueryHandler(UserDetailsQuery)
export class UserDetailsQueryHandler implements IInferredQueryHandler<UserDetailsQuery> {
  constructor(private domainService: UserDomainService) {}

  async execute(query: UserDetailsQuery): Promise<UserDetailsQueryModel> {
    const { userIdOrEmail } = query;

    const user = await this.domainService.findUserByUserId(userIdOrEmail);

    return new UserDetailsQueryModel(
      user?.id,
      user?.userId,
      user?.username,
      user?.email,
      user?.phone,
      user?.password,
      user?.authType,
      user?.role,
      user?.profilePictureUrl
    );
  }
}
