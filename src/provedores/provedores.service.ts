import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProvedoresDto } from './dto/provedores.dto';
import { ProvedoresEntity } from './provedores.entity';

@Injectable()
export class ProvedoresService {
    constructor(
        @InjectRepository(ProvedoresEntity)
        private readonly provedoresRepository: Repository<ProvedoresEntity>,

    ){}



    // si la lista esta sola
    async all(): Promise<ProvedoresEntity[]>{ 
        const list = await this.provedoresRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id: number): Promise<ProvedoresEntity>{
        const supplier = await this.provedoresRepository.findOne(id);
        if(!supplier){
            throw new NotFoundException({message: "No existe el supplier"});
        }
        return supplier;

    }

    // actualizar datos

    // async update(id:number, data): Promise<any>{
    //     return this.provedoresRepository.update(id,data);
    // }

    //creacion supplier  

    async create(dto: ProvedoresDto): Promise<any>{
        const supplier = this.provedoresRepository.create(dto);
        try{
            await this.provedoresRepository.save(supplier);
            return {message: "supplier agregado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('la razon social ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    async getByName(razon): Promise<ProvedoresEntity[]>{
        const nameB = razon;
        const listByName = await this.provedoresRepository.find({where: {razon: Like(`%${nameB.razon}%`)}});
        console.log(razon);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe cliente con ese nombre"});
        }
        return listByName;
    }

    async update(id_provedores:number, data): Promise<any>{
        return this.provedoresRepository.update(id_provedores,data);
    }

    async deleteOne(id_provedores): Promise<any>{
        await this.provedoresRepository.delete({id_provedores});
    }
}
