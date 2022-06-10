import { EntityRepository, Repository } from "typeorm";
import {Articulos_motocicletasEntity} from "./articulos_motocicletas.entity"



@EntityRepository(Articulos_motocicletasEntity)
export class Articuloss_motocicletasEntity  extends Repository<Articulos_motocicletasEntity>{
    
}