import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../../domain/user.service';
import { UserDetailsDto } from './user-details.dto';
import { UserDetailsQuery } from './user-details.query';

@QueryHandler(UserDetailsQuery)
export class UserDetailsQueryHandler implements IQueryHandler<UserDetailsQuery> {
  constructor(private domainService: UserService) {}

  async execute(query: UserDetailsQuery): Promise<UserDetailsDto> {
    const { email } = query;

    const user = await this.domainService.findUserByEmail(email);

    return new UserDetailsDto(
      user?.userId,
      user?.username,
      user?.email,
      user?.phone,
      user?.password,
      user?.authType,
      user?.role
    );
  }
}
