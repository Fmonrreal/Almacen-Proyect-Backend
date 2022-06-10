import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ClientesEntity } from './clientes.entity';
import { ClientesDto } from './dto/clientes.dto';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(ClientesEntity) 
        private clientesRepository: Repository<ClientesEntity>,
    ){}

    async create(dto: ClientesDto): Promise<any>{
        const article = this.clientesRepository.create(dto);
        try{
            const cliente = await this.clientesRepository.save(article);
            return cliente;
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del article ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    async getOne(id: number): Promise<ClientesEntity>{
        const article = await this.clientesRepository.findOne(id);
        if(!article){
            throw new NotFoundException({message: "No existe cliente con ese id"});
        }
        return article;
    }

    async getByName(nombre): Promise<ClientesEntity[]>{
        const nameB = nombre;
        const listByName = await this.clientesRepository.find({where: {nombre: Like(`%${nameB.nombre}%`)}});
        console.log(nombre);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe cliente con ese nombre"});
        }
        return listByName;
    }

    async update(id_clientes:number, data): Promise<any>{
        return this.clientesRepository.update(id_clientes,data);
    }

    async deleteOne(id_clientes): Promise<any>{
        await this.clientesRepository.delete({id_clientes});
    }
}
