import { EntityRepository, Repository } from "typeorm";
import { TipoEntity } from "./tipo.entity";



@EntityRepository(TipoEntity)
export class TiposEntity  extends Repository<TipoEntity>{
    
}