import { EntityRepository, Repository } from "typeorm";
import { Detalles_ventasEntity } from "./detalles_ventas.entity";

@EntityRepository(Detalles_ventasEntity)
export class Detalles_ventassEntity extends Repository<Detalles_ventasEntity>{

}