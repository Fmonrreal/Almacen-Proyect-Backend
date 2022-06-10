import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasController } from './ventas.controller';
import { VentasEntity } from './ventas.entity';
import { VentasService } from './ventas.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([VentasEntity]),
        ],
      controllers: [VentasController],
      providers: [VentasService]
})
export class VentasModule {}
