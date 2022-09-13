import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from '../config/database.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } = this.configService.get(DATABASE_CONFIG);
    return {
      type: 'mongodb',
      host,
      port,
      username,
      password,
      database,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: 'all',
      entities: [__dirname + '\\**\\**.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      autoLoadEntities: true,
    };
  }
}
