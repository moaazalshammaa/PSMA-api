import { Product } from "src/products/entities/products.entity";
import { Store } from "src/stores/entities/stores.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DistributionTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: "source_store_id" })
  sourceStore: Store;

  @ManyToOne(() => Store)
  @JoinColumn({ name: "destination_store_id" })
  destinationStore: Store;

  @ManyToOne(() => Product)
  product: Product;

  @Column("int")
  quantity: number;

  @Column()
  status: string; // e.g., 'pending', 'completed', 'failed'
}