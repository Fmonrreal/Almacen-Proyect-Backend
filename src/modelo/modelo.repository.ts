import { EntityRepository, Repository } from "typeorm";
import {ModeloEntity} from "./modelo.entity"



@EntityRepository(ModeloEntity)
export class ModelosEntity  extends Repository<ModeloEntity>{
    
}