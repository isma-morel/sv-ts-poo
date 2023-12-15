import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

//Clase abstracta = es una clase que no se puede instanciar
//Solo se puede inicializar o extender como una herencia

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }
  public getEnvironment(k: string): string | undefined {
    return process.env[k];
  }
  public getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ["env"];
    if (path.length > 0) {
      const strToArr = path.split(".");
      arrEnv.unshift(...strToArr);
    }
    return "." + arrEnv.join(".");
  }

  /**
   * Configuracion del ORM para la base de datos.
   *
   * @readonly
   * @type {DataSourceOptions}
   * @memberof ConfigServer
   */

  public get typeORMConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnv("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_NAME"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      //type: "mysql",
      //host: "localhost",
      //port: 3306,
      //username: "root",
      //password: "<PASSWORD>",
      //database: "test",
      //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      //synchronize: true,
      //logging: true,
    };
  }
}
