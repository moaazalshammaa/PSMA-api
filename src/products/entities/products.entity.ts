import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity() //sql table === 'product'
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
