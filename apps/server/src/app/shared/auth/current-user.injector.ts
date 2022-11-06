import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthUser } from '../../auth/domain/auth-user';
import { resolveRequest } from './request.resolver';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthUser => {
  const req = resolveRequest(context);
  return req.user;
});
