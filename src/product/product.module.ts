import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    HttpModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
