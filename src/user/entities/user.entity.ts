import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

//decorador para Inicializar entidad y q se nos agregue a la db
//Generas tabla user
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  //Generas columnas 1 por 1
  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
