import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/user.service';
import { UserDetailsDto } from './user-details.dto';
import { UserDetailsQuery } from './user-details.query';

@QueryHandler(UserDetailsQuery)
export class UserDetailsQueryHandler implements IInferredQueryHandler<UserDetailsQuery> {
  constructor(private domainService: UserDomainService) {}

  async execute(query: UserDetailsQuery): Promise<UserDetailsDto> {
    const { userIdOrEmail } = query;

    const user = await this.domainService.findUserByUserId(userIdOrEmail);

    return new UserDetailsDto(
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
