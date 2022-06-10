import { EntityRepository, Repository } from "typeorm";
import { Articulos_provedoresEntity } from './articulos_provedores.entity'

@EntityRepository(Articulos_provedoresEntity)
export class Articuloss_provedoresEntity  extends Repository<Articulos_provedoresEntity>{
    
}