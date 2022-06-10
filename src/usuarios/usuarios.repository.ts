import { EntityRepository, Repository } from "typeorm";
import { UsuariosEntity } from "./usuarios.entity";

@EntityRepository(UsuariosEntity)
export class UsuariossEntity extends Repository<UsuariosEntity>{
    
}