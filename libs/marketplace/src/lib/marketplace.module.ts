import { Module } from '@nestjs/common';

import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
