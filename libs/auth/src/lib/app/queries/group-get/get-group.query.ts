import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { GroupQueryModel } from '../common/models/group.query-model';

export class GetGroupQuery extends Query<GroupQueryModel> {
  readonly id: string;

  constructor({ id }: OwnQueryProps<GetGroupQuery>) {
    super();
    this.id = id;
  }
}
