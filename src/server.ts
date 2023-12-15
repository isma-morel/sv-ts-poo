//Levantar server estilo ts, con clases.

import express from "express";

import morgan from "morgan";

import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigServer } from "./config/config";
import { Connection, createConnection } from "mysql2";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express(); //Tiene toda la configuracion real
  //Node por defecto no lee variables de entorno
  //Por eso existe dotenv
  private port: number = this.getNumberEnv("PORT"); //En un entorno de produccion peude variar el port, por eso mismo se cambiara a una variable de entorno mas adelante

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.dbConnect();

    this.app.use(morgan("dev"));
    this.app.use(cors());

    //Rutas
    this.app.use("/api", this.routers());

    this.listen();
  }

  routers(): Array<express.Router> {
    //Example para mas rutas: [new UserRouter().router, new EjemploRouter().router, ...]
    return [new UserRouter().router];
  }

  /**
   * Apertura de conexion a base de datos usando el DataSource
   *
   * @return {*}  {Promise<DataSource>}
   * @memberof ServerBoostrap
   */

  async dbConnect(): Promise<void> {
    try {
      await new DataSource(this.typeORMConfig).initialize();
      console.log("Database connected");
    } catch (error) {
      console.log(`DB connection error: ${error}`);
    }
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log("sv listening on port " + this.port)
    );
  }
}

new ServerBootstrap();
