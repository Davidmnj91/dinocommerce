import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthenticatedUser = {
  id: string;
};

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthenticatedUser => {
  const ctx = context.switchToHttp();
  return ctx.getRequest().user;
});
