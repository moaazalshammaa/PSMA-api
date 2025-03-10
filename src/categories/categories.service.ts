import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private  categoriesRepository: Repository<Category>,
    private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Category[]> {
    const { limit, offset } = paginationQuery;
    return this.categoriesRepository.find(
        {
            take: limit,
            skip: offset,
        }
    );
  }

 async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: {id: +id} 
   });
   if (!category) { 
       throw new NotFoundException(`Category #${id} not found`);
   }
   return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create({
      ...createCategoryDto
    });
    return this.categoriesRepository.save(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      id: +id,
      ...updateCategoryDto,
    });
    if(!category){
      throw new NotFoundException(`Category #${id} not found`);
    }
    return this.categoriesRepository.save(category);
    }
  

  async remove(id: string) {
    const category = await this.findOne(id);
    return this.categoriesRepository.remove(category);
  }

  async recommendCategory(categories: Category) {
          const queryRunner = this.connection.createQueryRunner();
      
          await queryRunner.connect();
          await queryRunner.startTransaction();
          try {
              const recommendEvent = {
                  name: 'recommend_category',
                  type: 'category',
                  payload: { categoriesId: categories.id }
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
