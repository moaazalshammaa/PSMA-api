import { Product } from "src/products/entities/products.entity";
import { Store } from "src/stores/entities/stores.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SaleTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, store => store.sales)
  store: Store;

  @ManyToOne(() => Product)
  product: Product;

  @Column("int")
  quantity: number;

  @Column("decimal")
  totalPrice: number;

  @Column()
  date: Date;
}