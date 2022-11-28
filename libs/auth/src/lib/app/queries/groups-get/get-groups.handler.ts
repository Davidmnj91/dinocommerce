import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { GroupDomainService } from '../../../domain/operator/group.service';
import { GroupQueryModel } from '../common/models/group.query-model';
import { GetGroupsQuery } from './get-groups.query';

@QueryHandler(GetGroupsQuery)
export class GetGroupsQueryHandler implements IInferredQueryHandler<GetGroupsQuery> {
  constructor(private domainService: GroupDomainService) {}

  async execute(_: GetGroupsQuery): Promise<GroupQueryModel[]> {
    const groups = await this.domainService.findAllGroups();

    return groups.map(
      (group) =>
        new GroupQueryModel(
          group.id,
          group.name,
          group.permissions.toArray().reduce((acc, p) => ({ ...acc, [p.module]: p.actions }), {})
        )
    );
  }
}
