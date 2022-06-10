import { EntityRepository, Repository } from "typeorm";
import {LineaEntity} from "./linea.entity"



@EntityRepository(LineaEntity)
export class LineasEntity  extends Repository<LineaEntity>{
    
}