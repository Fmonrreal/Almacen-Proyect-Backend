import { EntityRepository, Repository } from "typeorm";
import { SupplierEntity } from "./supplier.entity";

@EntityRepository(SupplierEntity)
export class SuppliersEntity  extends Repository<SupplierEntity>{
    
}