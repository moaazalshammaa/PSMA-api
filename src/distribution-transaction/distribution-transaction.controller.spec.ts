import { Test, TestingModule } from '@nestjs/testing';
import { DistributionTransactionController } from './distribution-transaction.controller';
import { DistributionTransactionService } from './distribution-transaction.service';

describe('DistributionTransactionController', () => {
  let controller: DistributionTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributionTransactionController],
      providers: [DistributionTransactionService],
    }).compile();

    controller = module.get<DistributionTransactionController>(DistributionTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
