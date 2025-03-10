import { Store } from "src/stores/entities/stores.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  

  @ManyToOne(() => Store, store => store.employees)
  store: Store;
}