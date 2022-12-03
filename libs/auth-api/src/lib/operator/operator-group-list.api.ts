import { OperatorGroupModel } from './operator-group.model';

export type ListOperatorGroupApi = {
  listGroups: () => Promise<ListOperatorGroupResponse>;
};

export type ListOperatorGroupResponse = OperatorGroupModel[];
