import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Detalles_ventasController } from "./detalles_ventas.controller";
import { Detalles_ventasEntity } from "./detalles_ventas.entity";
import { Detalles_ventasService } from "./detalles_ventas.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Detalles_ventasEntity]),
        ],
    controllers: [Detalles_ventasController],
    providers: [Detalles_ventasService]
    })

export class Detalles_ventasModule {}