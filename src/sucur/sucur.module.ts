import { Module } from '@nestjs/common';
import { SucurController } from './Sucur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucurEntity } from './sucur.entity';
import { SucurService } from './sucur.service';
import { OrderEntity } from 'src/order/order.entity';
// import { OrderEntity } from 'src/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SucurEntity,OrderEntity])],
  controllers: [SucurController],
  providers: [SucurService],
})
export class SucurModule {}
