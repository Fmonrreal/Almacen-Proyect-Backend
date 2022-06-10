import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { EntityRepository, Repository } from "typeorm";
import { VentasEntity } from "./ventas.entity";

@EntityRepository(VentasEntity)
export class VentassEntity extends Repository<UsuariosEntity>{
    
}