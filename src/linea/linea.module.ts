import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaController } from './linea.controller';
import { LineaService } from './linea.service';
import { LineaEntity } from './linea.entity';



@Module({
    
    imports: [
        TypeOrmModule.forFeature([LineaEntity]),
        ],
      controllers: [LineaController],
      providers: [LineaService]
})
export class LineaModule {}
