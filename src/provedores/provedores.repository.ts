import { EntityRepository, Repository } from "typeorm";
import { ProvedoresEntity } from "./provedores.entity";



@EntityRepository(ProvedoresEntity)
export class ProvedoressEntity  extends Repository<ProvedoresEntity>{
    
}