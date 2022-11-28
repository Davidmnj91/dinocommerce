import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { OperatorAlreadyRegisteredException } from '../exception/operator-already-registered.exception';
import { OperatorNotFoundException } from '../exception/operator-not-found.exception';
import { Operator } from './operator';

@Injectable()
export class OperatorDomainService {
  constructor(@InjectRepository(Operator) private operatorRepository: EntityRepository<Operator>) {}

  async checkOperatorNotExists(email: string) {
    const operator = await this.operatorRepository.findOne({ email });

    if (operator) {
      throw new OperatorAlreadyRegisteredException(email);
    }
  }

  async findOperatorById(operatorId: string): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({ id: operatorId });

    if (!operator) {
      throw new OperatorNotFoundException(operatorId);
    }

    return operator;
  }

  async findOperatorByEmail(email: string): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({ email });

    if (!operator) {
      throw new OperatorNotFoundException(email);
    }

    return operator;
  }

  async saveOperator(operator: Operator): Promise<Operator> {
    const created = await this.operatorRepository.create(operator);
    await this.operatorRepository.persistAndFlush(created);

    return created;
  }
}
