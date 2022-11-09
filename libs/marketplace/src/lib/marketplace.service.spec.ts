import { Test } from '@nestjs/testing';
import { MarketplaceService } from './marketplace.service';

describe('MarketplaceService', () => {
  let service: MarketplaceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MarketplaceService],
    }).compile();

    service = module.get(MarketplaceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
