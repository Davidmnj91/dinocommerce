import { OperatorGroupPermissions } from './operator-group-permissions.model';

export type CreateOperatorGroupApi = {
  createGroup: (group: CreateOperatorGroupRequest) => Promise<CreateOperatorGroupResponse>;
};

export type CreateOperatorGroupRequest = {
  name: string;
  permissions: Partial<OperatorGroupPermissions>;
};

export type CreateOperatorGroupResponse = string;
