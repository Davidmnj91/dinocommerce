import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { GroupDomainService } from '../../../domain/operator/group.service';
import { GroupQueryModel } from '../common/models/group.query-model';
import { GetGroupQuery } from './get-group.query';

@QueryHandler(GetGroupQuery)
export class GetGroupQueryHandler implements IInferredQueryHandler<GetGroupQuery> {
  constructor(private domainService: GroupDomainService) {}

  async execute(query: GetGroupQuery): Promise<GroupQueryModel> {
    const { id } = query;
    const group = await this.domainService.findGroupById(id);

    return new GroupQueryModel(
      group.id,
      group.name,
      group.permissions.toArray().reduce((acc, p) => ({ ...acc, [p.module]: p.actions }), {})
    );
  }
}
