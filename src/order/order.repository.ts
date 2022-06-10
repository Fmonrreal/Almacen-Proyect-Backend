import { EntityRepository, Repository } from "typeorm";
import { OrderEntity } from "./order.entity";

@EntityRepository(OrderEntity)
export class ProductEntity  extends Repository<OrderEntity>{
    
}