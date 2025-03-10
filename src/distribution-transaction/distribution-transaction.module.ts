import { Module } from '@nestjs/common';
import { DistributionTransactionService } from './distribution-transaction.service';
import { DistributionTransactionController } from './distribution-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributionTransaction } from './entities/distribution-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistributionTransactionModule , DistributionTransaction, Event])],
  controllers: [DistributionTransactionController],
  providers: [DistributionTransactionService,DistributionTransaction],
})
export class DistributionTransactionModule {}
