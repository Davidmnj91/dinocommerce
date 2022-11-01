import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export default registerAs(
  DATABASE_CONFIG,
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
);
