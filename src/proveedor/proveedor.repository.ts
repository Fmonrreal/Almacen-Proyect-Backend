import { EntityRepository, Repository } from "typeorm";
import { ProveedorEntity } from "./proveedor.entity";

@EntityRepository(ProveedorEntity)
export class ProductEntity  extends Repository<ProveedorEntity>{
    
}