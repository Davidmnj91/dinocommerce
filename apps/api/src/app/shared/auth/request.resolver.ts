import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const resolveRequest = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    const ctx = context.switchToHttp();
    return ctx.getRequest();
  } else if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
};
