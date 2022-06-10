import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

    ){}



    // si la lista esta sola
    async all(): Promise<OrderEntity[]>{ 
        const list = await this.orderRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }


    // traer uno por el id

    async getOne(id: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne(id);
        if(!order){
            throw new NotFoundException({message: "No existe el order"});
        }
        return order;

    }

    // actualizar datos

    async update(id:number, data): Promise<any>{
        return this.orderRepository.update(id,data);
    }

    //creacion order  

    async create(dto: OrderDto): Promise<any>{
        const order = this.orderRepository.create(dto);
        try{
            const prueba  = await this.orderRepository.save(order);
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
