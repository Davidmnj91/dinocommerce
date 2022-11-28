import {
  Platform,
  Type,
} from '@mikro-orm/core';

export class StringType<T> extends Type<T, string> {
  convertToDatabaseValue(value: T, platform: Platform): string {
    return value as unknown as string;
  }

  convertToJSValue(value: T | string | undefined, platform: Platform): T {
    return value as unknown as T;
  }
}
