import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Query } from './query';

export * from '@nestjs/cqrs';
export { Command, OwnCommandProps } from './command';
export { OwnQueryProps, Query } from './query';

import { Command } from './command';

declare module '@nestjs/cqrs/dist/query-bus' {
  export interface QueryBus {
    execute<X>(query: Query<X>): Promise<X>;
  }

  export type IInferredQueryHandler<QueryType extends Query<unknown>> = QueryType extends Query<infer ResultType>
    ? IQueryHandler<QueryType, ResultType>
    : never;
}

declare module '@nestjs/cqrs/dist/command-bus' {
  export interface CommandBus {
    execute<X>(command: Command<X>): Promise<X>;
  }

  export type IInferredCommandHandler<CommandType extends Command<unknown>> = CommandType extends Command<
    infer ResultType
  >
    ? ICommandHandler<CommandType, ResultType>
    : never;
}
