import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SupplierEntity } from './supplier.entity';
import { SupplierDto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(SupplierEntity)
        private readonly supplierRepository: Repository<SupplierEntity>,

    ){}



    // si la lista esta sola
    async all(): Promise<SupplierEntity[]>{ 
        const list = await this.supplierRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id: number): Promise<SupplierEntity>{
        const supplier = await this.supplierRepository.findOne(id);
        if(!supplier){
            throw new NotFoundException({message: "No existe el supplier"});
        }
        return supplier;

    }

    // actualizar datos

    async update(id:number, data): Promise<any>{
        return this.supplierRepository.update(id,data);
    }

    //creacion supplier  

    async create(dto: SupplierDto): Promise<any>{
        const supplier = this.supplierRepository.create(dto);
        try{
            await this.supplierRepository.save(supplier);
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

}
