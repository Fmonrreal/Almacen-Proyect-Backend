import { EntityRepository, Repository } from "typeorm";
import { ClientesEntity } from "./clientes.entity";

@EntityRepository(ClientesEntity)
export class ClientessEntity extends Repository<ClientesEntity>{

}