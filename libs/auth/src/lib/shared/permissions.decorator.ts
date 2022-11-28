import { SetMetadata } from '@nestjs/common';

import { ApplicationPermissions } from '../domain/operator/application_permission';

export const PermissionMetadataKey = 'permissions';
export const Permissions = (permissions: Partial<ApplicationPermissions>) =>
  SetMetadata(PermissionMetadataKey, permissions);
