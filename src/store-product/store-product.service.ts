import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Patch,
  Query,
} from '@nestjs/common';
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
    private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<StoreProduct[]> {
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
    if (!storeProduct) {
      throw new NotFoundException(`StoreProduct #${id} not found`);
    }
    return this.storeProductRepository.save(storeProduct);
  }

  async remove(id: string) {
    const storeProduct = await this.findOne(id);
    return this.storeProductRepository.remove(storeProduct);
  }
  async getAllStoreProductQuantities() {
    return this.storeProductRepository.find({
      relations: ['store', 'product'],
    });
  }

  async decreaseProductQuantity(
    storeId: number,
    productId: number,
    amount: number,
  ) {
    const storeProduct = await this.storeProductRepository.findOne({
      where: {
        store: { id: storeId },
        product: { id: productId },
      },
      relations: ['store', 'product'],
    });

    if (!storeProduct) {
      throw new NotFoundException('Product in Store not found');
    }

    if (storeProduct.quantity < amount) {
      throw new BadRequestException('Not enough quantity in store');
    }

    storeProduct.quantity -= amount;
    await this.storeProductRepository.save(storeProduct);

    return {
      message: 'Quantity decreased successfully',
      storeId: storeProduct.store.id,
      productId: storeProduct.product.id,
      newQuantity: storeProduct.quantity,
    };
  }

  async getTotalQuantity(productId: number, storeId?: number) {
    const where: any = { product: { id: productId } };
    if (storeId) {
      where.store = { id: storeId };
    }

    const storeProducts = await this.storeProductRepository.find({
      where,
      relations: ['store', 'product'],
    });

    if (storeProducts.length === 0) {
      throw new NotFoundException('Product not found in store(s)');
    }

    const totalQuantity = storeProducts.reduce((sum, sp) => sum + sp.quantity, 0);

    return {
      productId,
      storeId: storeId || null,
      totalQuantity,
    };
  }
}
