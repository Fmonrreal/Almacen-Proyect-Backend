import { EntityRepository, Repository } from "typeorm";
import { Detalles_pedidosEntity } from "./detalles_pedidos.entity";

@EntityRepository(Detalles_pedidosEntity)
export class Detalles_pedidossEntity extends Repository <Detalles_pedidosEntity>{
    
}