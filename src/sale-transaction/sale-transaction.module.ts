import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleTransactionService } from './sale-transaction.service';
import { SaleTransactionController } from './sale-transaction.controller';
import { SaleTransaction } from './entities/sale-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleTransaction])], // هنا نضيف الكيان فقط
  controllers: [SaleTransactionController],
  providers: [SaleTransactionService],
  exports: [SaleTransactionService], // تصدير الخدمة إذا كانت ستُستخدم في موديول آخر
})
export class SaleTransactionModule {}
