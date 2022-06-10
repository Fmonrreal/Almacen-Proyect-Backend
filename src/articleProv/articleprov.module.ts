import { Module } from '@nestjs/common';
import { ArticleprovController } from './articleprov.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleprovEntity } from './articleprov.entity';
import { ArticleprovService } from './articleprov.service';
import { HttpModule} from '@nestjs/axios';
import { ArticleEntity } from 'src/article/article.entity';
import { StockEntity } from '../stock/stock.entity';
import {SupplierEntity} from 'src/supplier/supplier.entity';
import { OrderdetEntity } from 'src/orderdet/orderdet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleprovEntity,ArticleEntity,StockEntity,SupplierEntity,OrderdetEntity]),
    HttpModule
  ],
  controllers: [ArticleprovController],
  providers: [ArticleprovService],
})
export class ArticleprovModule {}
