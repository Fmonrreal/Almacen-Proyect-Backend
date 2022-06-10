import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PedidosDto } from './dto/pedidos.dto';
import { PedidosEntity } from './pedidos.entity';

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(PedidosEntity)
        private readonly pedidosRepository: Repository<PedidosEntity>,

    ){}



    // si la lista esta sola
    async all(): Promise<PedidosEntity[]>{ 
        const list = await this.pedidosRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id_pedidos: number): Promise<PedidosEntity>{
        const order = await this.pedidosRepository.findOne(id_pedidos);
        if(!order){
            throw new NotFoundException({message: "No existe el order"});
        }
        return order;

    }

    // actualizar datos

    async update(id_pedidos:number, data): Promise<any>{
        return this.pedidosRepository.update(id_pedidos,data);
    }

    //creacion order  

    async create(dto: PedidosDto): Promise<any>{
        const order = this.pedidosRepository.create(dto);
        try{
            const prueba  = await this.pedidosRepository.save(order);
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

    // async create(data): Promise<any>{
    //     const order = this.pedidosRepository.create(data);
    //     try{
    //         const prueba  = await this.pedidosRepository.save(order);
    //         return prueba;
    //     }catch (error) {
    //             // check error.code
    //             console.log(error.code);
    //             if (error.code === 'ER_DUP_ENTRY') {
    //               throw new ConflictException('el id orden ya existe');
    //             }
    //             throw new InternalServerErrorException(
    //               error
    //             );
    //           }
    // }

}
