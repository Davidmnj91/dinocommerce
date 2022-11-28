import { plainToInstance } from 'class-transformer';

import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { OperatorDomainService } from '../../../domain/operator/operator.service';
import { GetOperatorDetailsQuery } from './operator-detail.query';
import { OperatorDetailsQueryModel } from './operator-detail.query-model';

@QueryHandler(GetOperatorDetailsQuery)
export class GetOperatorDetailsQueryHandler implements IInferredQueryHandler<GetOperatorDetailsQuery> {
  constructor(private operatorDomainService: OperatorDomainService) {}

  async execute(query: GetOperatorDetailsQuery): Promise<OperatorDetailsQueryModel> {
    const { email: operatorId } = query;

    const operator = await this.operatorDomainService.findOperatorByEmail(operatorId);

    return plainToInstance(OperatorDetailsQueryModel, operator, { excludeExtraneousValues: true });
  }
}
