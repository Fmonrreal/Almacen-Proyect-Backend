import { EntityRepository, Repository } from "typeorm";
import {CategoriaEntity} from "./categoria.entity"



@EntityRepository(CategoriaEntity)
export class CategoriasEntity  extends Repository<CategoriaEntity>{
    
}