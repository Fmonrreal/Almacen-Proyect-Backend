import { Module } from '@nestjs/common';
import { OrderdetController } from './orderdet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderdetEntity } from './orderdet.entity';
import { OrderdetService } from './orderdet.service';
import { ArticleprovEntity } from 'src/articleProv/articleprov.entity';
import { OrderEntity } from 'src/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderdetEntity,ArticleprovEntity,OrderEntity])],
  controllers: [OrderdetController],
  providers: [OrderdetService],
})
export class OrderdetModule {}
