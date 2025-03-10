import { Test, TestingModule } from '@nestjs/testing';
import { DistributionTransactionService } from './distribution-transaction.service';

describe('DistributionTransactionService', () => {
  let service: DistributionTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributionTransactionService],
    }).compile();

    service = module.get<DistributionTransactionService>(DistributionTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
