import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulosEntity } from 'src/articulos/articulos.entity';
import { MotocicletasEntity } from 'src/motocicletas/motocicletas.entity';
import { Articulos_motocicletasController } from './articulos_motocicletas.controller';
import { Articulos_motocicletasEntity } from './articulos_motocicletas.entity';
import { Articulos_motocicletasService } from './articulos_motocicletas.service';


@Module({
  
  imports: [
    TypeOrmModule.forFeature([Articulos_motocicletasEntity,ArticulosEntity,MotocicletasEntity]),
    ],
  controllers: [Articulos_motocicletasController],
  providers: [Articulos_motocicletasService]
})
export class Articulos_motocicletasModule {}
