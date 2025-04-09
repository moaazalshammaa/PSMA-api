import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { StoresModule } from './stores/stores.module';
import { EmployeeModule } from './employee/employee.module';
import { DistributionTransactionModule } from './distribution-transaction/distribution-transaction.module';
import { StoreProductModule } from './store-product/store-product.module';
import { SaleTransactionModule } from './sale-transaction/sale-transaction.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StoresModule,
    EmployeeModule,
    SaleTransactionModule,
    StoreProductModule,
    DistributionTransactionModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
