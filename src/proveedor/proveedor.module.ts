import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorService } from './proveedor.service';
import { ProveedorEntity } from './proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProveedorEntity])
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
