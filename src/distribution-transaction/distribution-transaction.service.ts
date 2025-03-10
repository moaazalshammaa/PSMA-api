import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateDistributionTransactionDto } from './dto/create-distribution-transaction.dto';
import { UpdateDistributionTransactionDto } from './dto/update-distribution-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DistributionTransaction } from './entities/distribution-transaction.entity';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class DistributionTransactionService {
constructor(
  @InjectRepository(DistributionTransaction)
  private distributionTransactionRepository: Repository<DistributionTransaction>,
  private readonly connection: Connection,
 ){}

  async create(createDistributionTransactionDto: CreateDistributionTransactionDto) {
    const DistributionTransaction = this.distributionTransactionRepository.create({
      ...createDistributionTransactionDto,
    });
    return this.distributionTransactionRepository.save(DistributionTransaction);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<DistributionTransaction[]> {
    const { limit, offset } = paginationQuery;
    return this.distributionTransactionRepository.find(
      {
        take: limit,
        skip: offset,
      }
    );
  }

  async findOne(id: string) {
    const DistributionTransaction = await this.distributionTransactionRepository.findOne({
      where: { id: +id },
    });
    if (!DistributionTransaction) {
      throw new NotFoundException(`DistributionTransaction with ID ${id} not found`);
    }
    return DistributionTransaction;

  }

  async update(id: string, updateDistributionTransactionDto: UpdateDistributionTransactionDto) {
   const distributionTransaction = await this.distributionTransactionRepository.preload({
      id: +id,
      ...updateDistributionTransactionDto,
    });
    if (!distributionTransaction){
      throw new NotAcceptableException(`DistributionTransaction with ID ${id} not found`);
    }
    return this.distributionTransactionRepository.save(distributionTransaction)  
  }

  async remove(id: string) {
   const distributionTransaction = await this.findOne(id);
   return this.distributionTransactionRepository.remove(distributionTransaction);
  }

 
}
