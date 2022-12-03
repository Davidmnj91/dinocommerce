import { OperatorGroupPermissions } from './operator-group-permissions.model';

export type OperatorGroupModel = {
  id: string;
  name: string;
  permissions: Partial<OperatorGroupPermissions>;
};
