import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { OperatorDomainService } from '../../../domain/operator/operator.service';
import { OperatorProfileQuery } from './operator-profile.query';
import { OperatorProfileQueryModel } from './operator-profile.query-model';

@QueryHandler(OperatorProfileQuery)
export class OperatorProfileQueryHandler implements IInferredQueryHandler<OperatorProfileQuery> {
  constructor(private domainService: OperatorDomainService) {}

  async execute(query: OperatorProfileQuery): Promise<OperatorProfileQueryModel> {
    const { operatorId } = query;

    const operator = await this.domainService.findOperatorById(operatorId);

    return new OperatorProfileQueryModel(
      operator.name,
      operator.lastName,
      operator.dateOfBirth,
      operator.email,
      operator.phone,
      operator.password,
      operator.profilePictureUrl
    );
  }
}
