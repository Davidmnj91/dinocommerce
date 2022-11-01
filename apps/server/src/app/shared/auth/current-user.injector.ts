import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles } from '../../../../../../libs/events/src';
import { resolveRequest } from './request.resolver';

export type AuthenticatedUser = {
  id: string;
  role: Roles;
};

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthenticatedUser => {
  const req = resolveRequest(context);
  return req.user;
});
