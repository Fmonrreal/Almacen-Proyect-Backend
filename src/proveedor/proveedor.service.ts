import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProveedorEntity } from './proveedor.entity';
import { ProveedorDto } from './dto/proveedor.dto';

@Injectable()
export class ProveedorService {
    constructor(
        @InjectRepository(ProveedorEntity)
        private readonly proveedorRepository: Repository<ProveedorEntity>,

    ){}



    // si la lista esta sola
    async all(): Promise<ProveedorEntity[]>{ 
        const list = await this.proveedorRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id: number): Promise<ProveedorEntity>{
        const proveedor = await this.proveedorRepository.findOne(id);
        if(!proveedor){
            throw new NotFoundException({message: "No existe el proveedor"});
        }
        return proveedor;

    }

    // actualizar datos

    async update(id:number, data): Promise<any>{
        return this.proveedorRepository.update(id,data);
    }

    //creacion proveedor  

    async create(dto: ProveedorDto): Promise<any>{
        const proveedor = this.proveedorRepository.create(dto);
        try{
            await this.proveedorRepository.save(proveedor);
            return {message: "proveedor agregado"};
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

}
