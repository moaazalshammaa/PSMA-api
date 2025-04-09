import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SaleTransactionService } from './sale-transaction.service';
import { CreateSaleTransactionDto } from './dto/create-sale-transaction.dto';
import { UpdateSaleTransactionDto } from './dto/update-sale-transaction.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/employee/guards/jwt-auth.guard';

@Controller('sale-transaction')
@UseGuards(JwtAuthGuard)
export class SaleTransactionController {
  constructor(private readonly saleTransactionService: SaleTransactionService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.saleTransactionService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleTransactionService.findOne(id);
  }

  @Post()
  create(@Body() createSaleTransactionDto: CreateSaleTransactionDto) {
    console.log(createSaleTransactionDto instanceof CreateSaleTransactionDto)
    return this.saleTransactionService.create(createSaleTransactionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleTransactionDto: UpdateSaleTransactionDto) {
    return this.saleTransactionService.update(id, updateSaleTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleTransactionService.remove(id);
  }
}
