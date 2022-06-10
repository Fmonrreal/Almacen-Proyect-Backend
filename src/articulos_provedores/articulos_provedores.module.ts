import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulosEntity } from 'src/articulos/articulos.entity';
import { Articulos_provedoresEntity} from './articulos_provedores.entity'
import {Articulos_provedoresController} from './articulos_provedores.controller'
import {Articulos_provedoresService} from './articulos_provedores.service'
import { HttpModule} from '@nestjs/axios';



@Module({
  
  imports: [
    TypeOrmModule.forFeature([Articulos_provedoresEntity,ArticulosEntity]),
    HttpModule
    ],
  controllers: [Articulos_provedoresController],
  providers: [Articulos_provedoresService]
})
export class Articulos_provedoresModule {}
