import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/stores.entity';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreProduct } from 'src/store-product/entities/store-product.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Store[]> {
    const { limit, offset } = paginationQuery;
    return this.storesRepository.find({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: string) {
    const store = await this.storesRepository.findOne({
      where: { id: +id },
    });
    if (!store) {
      throw new NotFoundException(`Store #${id} not found`);
    }
    return store;
  }
  async create(createStoreDto: CreateStoreDto) {
    const store = this.storesRepository.create({
      ...createStoreDto,
    });
    return this.storesRepository.save(store);
  }

  async update(id: string, updateStoreDtot: UpdateStoreDto) {
    const store = await this.storesRepository.preload({
      id: +id,
      ...updateStoreDtot,
    });
    if (!store) {
      throw new NotFoundException(`Store #${id} not found`);
    }
    return this.storesRepository.save(store);
  }

  async remove(id: string) {
    const store = await this.findOne(id);
    return this.storesRepository.remove(store);
  }

  async recommendStore(store: Store) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recommendEvent = {
        name: 'recommend_store',
        type: 'store',
        payload: { storeId: store.id },
      };
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
