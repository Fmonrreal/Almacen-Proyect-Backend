import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleprovEntity } from 'src/articleProv/articleprov.entity';
import { StockEntity } from '../stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity,ArticleprovEntity,StockEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
