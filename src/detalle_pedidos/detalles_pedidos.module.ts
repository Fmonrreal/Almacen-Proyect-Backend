import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Detalles_pedidosController } from "./detalles_pedidos.controller";
import { Detalles_pedidosEntity } from "./detalles_pedidos.entity";
import { Detalles_pedidosService } from "./detalles_pedidos.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Detalles_pedidosEntity]),
        ],
      controllers: [Detalles_pedidosController],
      providers: [Detalles_pedidosService]
})
export class Detalles_pedidosModule {}