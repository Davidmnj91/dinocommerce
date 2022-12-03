import { OperatorGroupPermissions } from './operator-group-permissions.model';

export type UpdateOperatorGroupApi = {
  updateGroup: (groupId: string, group: UpdateOperatorGroupRequest) => Promise<UpdateOperatorGroupResponse>;
};

export type UpdateOperatorGroupRequest = {
  name: string;
  permissions: Partial<OperatorGroupPermissions>;
};

export type UpdateOperatorGroupResponse = string;
