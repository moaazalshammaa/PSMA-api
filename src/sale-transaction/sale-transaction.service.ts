import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleTransactionDto } from './dto/create-sale-transaction.dto';
import { UpdateSaleTransactionDto } from './dto/update-sale-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { SaleTransaction } from './entities/sale-transaction.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class SaleTransactionService {
  constructor(
    @InjectRepository(SaleTransaction)
    private saleTransactionRepository: Repository<SaleTransaction>,
    private readonly connection: Connection,
  ) {}
  
  findAll(paginationQuery: PaginationQueryDto): Promise<SaleTransaction[]> {
    const { limit, offset } = paginationQuery;
    return this.saleTransactionRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const saleTransaction = await this.saleTransactionRepository.findOne({
      where: { id: +id },
    });
    if (!saleTransaction) {
      throw new NotFoundException(`SaleTransaction with ID ${id} not found`);
    }
    return saleTransaction;
  }

  async create(createSaleTransactionDto: CreateSaleTransactionDto) {
     const saleTransaction = this.saleTransactionRepository.create({
      ...createSaleTransactionDto,
     });
     return this.saleTransactionRepository.save(saleTransaction);
  }

  async update(id: string, updateSaleTransactionDto: UpdateSaleTransactionDto) {
    const saleTransaction = await this.saleTransactionRepository.preload({
      id: +id,
      ...updateSaleTransactionDto,
    });
    if (!saleTransaction) {
      throw new NotFoundException(`SaleTransaction with ID ${id} not found`);
    }
    return this.saleTransactionRepository.save(saleTransaction)
  }

  async remove(id: string) {
    const saleTransaction = await this.findOne(id);
    return this.saleTransactionRepository.remove(saleTransaction);
  }
}
