import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { resolveRequest } from './request.resolver';

export type AuthenticatedUser = {
  id: string;
};

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthenticatedUser => {
  const req = resolveRequest(context);
  return req.user;
});
