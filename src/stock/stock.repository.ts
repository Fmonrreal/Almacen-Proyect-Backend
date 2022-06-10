import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from './stock.entity';

@EntityRepository(StockEntity)
export class StocksEntity extends Repository<StockEntity>{}