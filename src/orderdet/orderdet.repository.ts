import { EntityRepository, Repository } from 'typeorm';
import { OrderdetEntity } from './orderdet.entity';

@EntityRepository(OrderdetEntity)
export class OrderdetsEntity extends Repository<OrderdetEntity>{}