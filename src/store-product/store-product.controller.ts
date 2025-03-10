import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('store-product')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.storeProductService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeProductService.findOne(id);
  }

  @Post()
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
     console.log(createStoreProductDto instanceof CreateStoreProductDto );
    return this.storeProductService.create(createStoreProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreProductDto: UpdateStoreProductDto) {
    return this.storeProductService.update(id, updateStoreProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeProductService.remove(id);
  }
}
