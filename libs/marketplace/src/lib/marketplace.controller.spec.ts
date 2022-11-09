import { Test } from '@nestjs/testing';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';

describe('MarketplaceController', () => {
  let controller: MarketplaceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MarketplaceService],
      controllers: [MarketplaceController],
    }).compile();

    controller = module.get(MarketplaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
