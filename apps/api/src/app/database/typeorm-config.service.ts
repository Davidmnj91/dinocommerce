import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONFIG } from '../config/database.config';

@Injectable()
export class MickroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    const { host, port, username, password, database } = this.configService.get(DATABASE_CONFIG);
    return {
      type: 'mongo',
      clientUrl: `mongodb://${username}:${password}@${host}:${port}/${database}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entitiesTs: [__dirname + '../../../**/*.entity{.ts,.js}'],
      migrations: {
        pathTs: __dirname + '/migrations/**/*{.ts,.js}',
      },
      autoLoadEntities: true,
    };
  }
}
