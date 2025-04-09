import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/employee/guards/jwt-auth.guard';

@Controller('store-product')
@UseGuards(JwtAuthGuard)
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.storeProductService.findAll(paginationQuery);
  }

  @Patch('decrease-product-quantity')
  async decreaseProductQuantity(
    @Body() body: { storeId: number; productId: number; amount: number },
  ) {
    return this.storeProductService.decreaseProductQuantity(
      body.storeId,
      body.productId,
      body.amount,
    );
  }

  @Get('/get-product-quantities')
  async getStoreProductQuantities() {
    const data = await this.storeProductService.getAllStoreProductQuantities();

    const grouped = {};

    data.forEach((item) => {
      const storeId = item.store.id;

      if (!grouped[storeId]) {
        grouped[storeId] = {
          storeId: item.store.id,
          storeName: item.store.name,
          products: [],
        };
      }

      grouped[storeId].products.push({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
      });
    });

    return Object.values(grouped); // Convert grouped object to array
  }

  @Get('total-quantity')
  async getTotalQuantity(
    @Query('productId') productId: number,
    @Query('storeId') storeId?: number,
  ) {
    return this.storeProductService.getTotalQuantity(
      +productId,
      storeId ? +storeId : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeProductService.findOne(id);
  }

  @Post()
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
    console.log(createStoreProductDto instanceof CreateStoreProductDto);
    return this.storeProductService.create(createStoreProductDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return this.storeProductService.update(id, updateStoreProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeProductService.remove(id);
  }
}
