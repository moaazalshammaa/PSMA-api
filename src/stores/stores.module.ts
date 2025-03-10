import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { Store } from './entities/stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from 'src/store-product/entities/store-product.entity';
import { empty } from 'rxjs';
import { Employee } from 'src/employee/entities/employee.entity';
import { SaleTransaction } from 'src/sale-transaction/entities/sale-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store , StoreProduct,Employee,SaleTransaction, Event])],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
