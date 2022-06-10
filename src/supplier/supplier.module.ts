import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierService } from './supplier.service';
import { SupplierEntity } from './supplier.entity';
import { ArticleprovEntity } from 'src/articleProv/articleprov.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity,ArticleprovEntity])
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
