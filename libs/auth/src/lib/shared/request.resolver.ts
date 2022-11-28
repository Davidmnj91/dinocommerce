import { ExecutionContext } from '@nestjs/common';

export const resolveRequest = (context: ExecutionContext) => {
  const ctx = context.switchToHttp();
  return ctx.getRequest();
};
