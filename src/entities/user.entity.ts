import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";

//decorador para Inicializar entidad y q se nos agregue a la db
@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column({ length: 1000 })
  name!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  jobPosition?: string;

  @Column()
  numberPhone!: number;
}
