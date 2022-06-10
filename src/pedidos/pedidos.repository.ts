import { EntityRepository, Repository } from "typeorm";
import { PedidosEntity } from "./pedidos.entity";

@EntityRepository(PedidosEntity)
export class PedidossEntity extends Repository<PedidosEntity>{
    
}