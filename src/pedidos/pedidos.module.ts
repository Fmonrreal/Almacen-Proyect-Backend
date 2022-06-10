import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosController } from './pedidos.controller';
import { PedidosEntity } from './pedidos.entity';
import { PedidosService } from './pedidos.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([PedidosEntity]),
        ],
      controllers: [PedidosController],
      providers: [PedidosService]
})
export class PedidosModule {}
