import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/products.entity';
import { Connection, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/create-product.dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity/event.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // private readonly storeProductRepository: Repository<storeP>,
    private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.productRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findProductsByCategory(
    paginationQuery: PaginationQueryDto,
    category_id: number,
  ) {
    const { limit, offset } = paginationQuery;

    return this.productRepository.find({
      where: { category: { id: category_id } },
      relations: ['category'],
      skip: offset,
      take: limit,
    });
  }

  //   async findByStore(store_id: number) {
  //     return this.storeProductRepository.find({
  //       where: { store: { id: store_id } },
  //       relations: ['product'],
  //     });
  //   }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: +id },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const Product = this.productRepository.create({
      ...createProductDto,
    });
    return this.productRepository.save(Product);
  }

  async update(id: string, updateProductDtot: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDtot,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  } // async تُستخدم في البرمجة لتحديد أن الدالة تعمل بشكل غير متزامن (Asynchronous)، مما يعني أنها لا توقف تنفيذ باقي الكود أثناء انتظار نتيجة العملية. يتم استخدامها عادةً مع await لجعل الكود أكثر سلاسة وسهولة في القراءة عند التعامل مع العمليات غير المتزامنة مثل طلبات الشبكة (HTTP requests)، أو التعامل مع الملفات، أو قواعد البيانات.

  async recommendProduct(product: Product) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_product';
      recommendEvent.type = 'product';
      recommendEvent.payload = { productId: product.id };
      await queryRunner.manager.save(product);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
