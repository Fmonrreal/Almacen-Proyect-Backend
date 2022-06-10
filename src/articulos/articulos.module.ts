import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulosEntity } from './articulos.entity';
import { ArticulosController } from './articulos.controller';
import { ArticulosService } from './articulos.service';
import { Articulos_provedoresEntity } from '../articulos_provedores/articulos_provedores.entity';
import { AlmacenEntity } from 'src/almacen/almacen.entity';



@Module({
    imports: [
        TypeOrmModule.forFeature([ArticulosEntity,Articulos_provedoresEntity,AlmacenEntity]),
        ],
    controllers: [ArticulosController],
    providers: [ArticulosService]
})
export class ArticulosModule {}
