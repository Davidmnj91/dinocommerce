import { DATABASE_CONFIG } from '@dinocommerce/shared';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MickroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    const logger = new Logger('DATABASE');

    const { host, port, username, password, database } = this.configService.get(DATABASE_CONFIG);
    const url = `postgresql://${username}:${password}@${host}:${port}/${database}`;
    return {
      type: 'postgresql',
      clientUrl: url,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entitiesTs: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: {
        pathTs: __dirname + '/migrations/**/*{.ts,.js}',
      },
      debug: true,
      logger: (msg) => logger.log(msg),
      autoLoadEntities: true,
    };
  }
}
