import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenController } from './almacen.controller';
import { AlmacenEntity } from './almacen.entity';
import { AlmacenService } from './almacen.service';
import { Articulos_provedoresEntity } from '../articulos_provedores/articulos_provedores.entity';




@Module({
    imports: [
        TypeOrmModule.forFeature([AlmacenEntity,Articulos_provedoresEntity]),
        ],
    controllers: [AlmacenController],
    providers: [AlmacenService]
})
export class AlmacenModule {}
