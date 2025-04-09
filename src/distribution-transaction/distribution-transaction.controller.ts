import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DistributionTransactionService } from './distribution-transaction.service';
import { CreateDistributionTransactionDto } from './dto/create-distribution-transaction.dto';
import { UpdateDistributionTransactionDto } from './dto/update-distribution-transaction.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/employee/guards/jwt-auth.guard';

@Controller('distribution-transaction')
@UseGuards(JwtAuthGuard)
export class DistributionTransactionController {
  constructor(private readonly distributionTransactionService: DistributionTransactionService) {}

  @Post()
  create(@Body() createDistributionTransactionDto: CreateDistributionTransactionDto) {
    return this.distributionTransactionService.create(createDistributionTransactionDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto ) {
    return this.distributionTransactionService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributionTransactionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistributionTransactionDto: UpdateDistributionTransactionDto) {
    return this.distributionTransactionService.update(id, updateDistributionTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distributionTransactionService.remove(id);
  }
}
