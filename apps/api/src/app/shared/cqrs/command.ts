import { ICommand } from '@nestjs/cqrs';
import { ExcludeFunctionPropertyNames } from '../utils/excludeFunctionPropertyNames';

export type OwnCommandProps<T extends Command<unknown>> = Omit<
  T,
  keyof Command<unknown> | keyof ExcludeFunctionPropertyNames<T>
>;
export class Command<T> implements ICommand {
  resultType$e1ca39fa!: T;
}
