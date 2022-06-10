import { EntityRepository, Repository } from "typeorm";
import { SucursalesEntity } from "./sucursales.entity";

@EntityRepository(SucursalesEntity)
export class SucursalessEntity extends Repository<SucursalesEntity>{
    
}