import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { StoreProductController } from './store-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from './entities/store-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct,Event])],
  controllers: [StoreProductController],
  providers: [StoreProductService],
})
export class StoreProductModule {}
