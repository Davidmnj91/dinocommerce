import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { ApplicationPermissions } from '../domain/operator/application_permission';
import { resolveRequest } from './request.resolver';

export type AuthenticatedUser = {
  id: string;
  isSuperUser: boolean;
  permissions: Partial<ApplicationPermissions>;
};

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthenticatedUser => {
  const req = resolveRequest(context);
  return req.user;
});
