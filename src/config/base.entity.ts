import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  //Decorators

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    name: "created_ad",
    type: "timestamp",
  })
  createdAt!: Date;

  @CreateDateColumn({
    name: "updated_ad",
    type: "timestamp",
  })
  updatedAt!: Date;
}

//Propiedades de una identidad para la base de datos: Buena practica
//id
//created_ad -> Cuando se creo
//updated_ad -> Cuando se actualizo
