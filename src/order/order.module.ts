import { Module } from '@nestjs/common';
import { OrderController } from './Order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { OrderdetEntity } from '../orderdet/orderdet.entity';
import { SucurEntity } from 'src/sucur/sucur.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity,OrderdetEntity,SucurEntity])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
