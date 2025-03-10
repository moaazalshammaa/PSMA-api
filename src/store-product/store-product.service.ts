import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class StoreProductService {
  constructor(
    @InjectRepository(StoreProduct)
    private storeProductRepository: Repository<StoreProduct>,
    private readonly connection: Connection 
  ) {}
  
  findAll(paginationQuery:PaginationQueryDto ): Promise<StoreProduct[]> {
    const { limit, offset } = paginationQuery;
    return this.storeProductRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const storeProduct = await this.storeProductRepository.findOne({
      where: { id: +id },
    });
    if (!storeProduct) {
      throw new NotFoundException(`StoreProduct #${id} not found`);
    }
    return storeProduct;
  }

  async create(createStoreProductDto: CreateStoreProductDto) {
    const storeProduct = this.storeProductRepository.create({
      ...createStoreProductDto,
    });
    return this.storeProductRepository.save(storeProduct);
  }

  async update(id: string, updateStoreProductDto: UpdateStoreProductDto) {
    const storeProduct = await this.storeProductRepository.preload({
      id: +id,
      ...updateStoreProductDto,
    });
    if (!storeProduct){
      throw new NotFoundException(`StoreProduct #${id} not found`);
    }
    return this.storeProductRepository.save(storeProduct);
  }

  async remove(id: string) {
    const storeProduct = await this.findOne(id);
    return this.storeProductRepository.remove(storeProduct);
  }
}
