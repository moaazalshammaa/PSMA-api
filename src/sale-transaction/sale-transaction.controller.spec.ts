import { Test, TestingModule } from '@nestjs/testing';
import { SaleTransactionController } from './sale-transaction.controller';
import { SaleTransactionService } from './sale-transaction.service';

describe('SaleTransactionController', () => {
  let controller: SaleTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleTransactionController],
      providers: [SaleTransactionService],
    }).compile();

    controller = module.get<SaleTransactionController>(SaleTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
