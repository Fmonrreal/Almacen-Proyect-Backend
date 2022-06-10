import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VentasDto } from './dto/ventas.dto';
import { VentasEntity } from './ventas.entity';

@Injectable()
export class VentasService {
    constructor(
        @InjectRepository(VentasEntity)
        private readonly ventasRepository: Repository<VentasEntity>,

    ){}

    // si la lista esta sola
    async all(): Promise<VentasEntity[]>{ 
        const list = await this.ventasRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id: number): Promise<VentasEntity>{
        const order = await this.ventasRepository.findOne(id);
        if(!order){
            throw new NotFoundException({message: "No existe el order"});
        }
        return order;

    }

    // actualizar datos

    async update(id:number, data): Promise<any>{
        return this.ventasRepository.update(id,data);
    }

    //creacion order  

    async create(dto: VentasDto): Promise<any>{
        const order = this.ventasRepository.create(dto);
        try{
            const prueba  = await this.ventasRepository.save(order);
            return prueba;
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('el id orden ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }
}
