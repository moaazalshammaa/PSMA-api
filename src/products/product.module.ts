import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { Category } from 'src/categories/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, Event])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
