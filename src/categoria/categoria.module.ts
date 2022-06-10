import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria.controller';
import { CategoriaEntity } from './categoria.entity';
import { CategoriaService } from './categoria.service';



@Module({
  
  imports: [
    TypeOrmModule.forFeature([CategoriaEntity]),
    ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
