import { AuthModule } from '@dinocommerce/auth';
import { WarehouseModule } from '@dinocommerce/warehouse';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, WarehouseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
