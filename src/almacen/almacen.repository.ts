import { EntityRepository, Repository } from "typeorm";
import { AlmacenEntity } from "./almacen.entity";

EntityRepository(AlmacenEntity)
export class AlmacensEntity extends Repository<AlmacenEntity>{
    
}