import { Employee } from 'src/employee/entities/employee.entity';
import { Product } from 'src/products/entities/products.entity';
import { SaleTransaction } from 'src/sale-transaction/entities/sale-transaction.entity';
import { StoreProduct } from 'src/store-product/entities/store-product.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;



  // @ManyToMany(() => Product)
  // @JoinTable({
  //   name: 'store_products',
  //   joinColumn: { name: 'store_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  // })
  // products: Product[];

   @OneToMany(() => StoreProduct, (lp) => lp.store)
   productQuantities: StoreProduct[];

   @OneToMany(() => Employee, (employee) => employee.store)
   employees: Employee[];

   @OneToMany(() => SaleTransaction, (sale) => sale.store)
   sales: SaleTransaction[];
}
