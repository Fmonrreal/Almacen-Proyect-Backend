import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalesController } from './sucursales.controller';
import { SucursalesEntity } from './sucursales.entity';
import { SucursalesService } from './sucursales.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([SucursalesEntity]),
        ],
      controllers: [SucursalesController],
      providers: [SucursalesService]
})
export class SucursalesModule {}
