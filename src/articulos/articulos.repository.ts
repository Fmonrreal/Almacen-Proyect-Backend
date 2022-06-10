import { EntityRepository, Repository } from "typeorm";
import { ArticulosEntity } from "./articulos.entity";


@EntityRepository(ArticulosEntity)
export class ArticulossEntity  extends Repository<ArticulosEntity>{
    
}