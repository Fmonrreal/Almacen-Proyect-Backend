import { Module } from '@nestjs/common';
import { StockController } from './Stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';
import { ArticleprovEntity } from 'src/articleProv/articleprov.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity,ArticleprovEntity])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
