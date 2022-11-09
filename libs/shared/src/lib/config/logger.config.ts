import { registerAs } from '@nestjs/config';

export const LOGGER_CONFIG = 'LOGGER_CONFIG';

export type LoggerConfig = {
  level: string;
};

export default registerAs(
  LOGGER_CONFIG,
  (): LoggerConfig => ({
    level: process.env.LOGGER_LEVEL,
  })
);
