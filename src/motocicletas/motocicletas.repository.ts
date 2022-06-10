import { EntityRepository, Repository } from "typeorm";
import {MotocicletasEntity} from "./motocicletas.entity"



@EntityRepository(MotocicletasEntity)
export class MotocicletassEntity  extends Repository<MotocicletasEntity>{
    
}