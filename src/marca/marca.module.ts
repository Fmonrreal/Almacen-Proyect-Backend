import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaController } from './marca.controller';
import { MarcaEntity } from './marca.entity';
import { MarcaService } from './marca.service';
@Module({  
    imports: [
    TypeOrmModule.forFeature([MarcaEntity]),
    ],
  controllers: [MarcaController],
  providers: [MarcaService]
})
export class MarcaModule {}
