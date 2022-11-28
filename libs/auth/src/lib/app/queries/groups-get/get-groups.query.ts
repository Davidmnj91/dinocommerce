import { Query } from '@dinocommerce/shared';

import { GroupQueryModel } from '../common/models/group.query-model';

export class GetGroupsQuery extends Query<GroupQueryModel[]> {}
