import { OperatorGroupModel } from './operator-group.model';

export type GetOperatorGroupApi = {
  getGroup: (groupId: string) => Promise<GetOperatorGroupResponse>;
};

export type GetOperatorGroupResponse = OperatorGroupModel;
