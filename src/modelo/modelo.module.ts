import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloController } from './modelo.controller';
import { ModeloEntity } from './modelo.entity';
import { ModeloService } from './modelo.service';



@Module({
    imports: [
        TypeOrmModule.forFeature([ModeloEntity]),
        ],
      controllers: [ModeloController],
      providers: [ModeloService]
})
export class ModeloModule {}
