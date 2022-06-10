import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderdetEntity } from './orderdet.entity';
import { Like, Repository } from 'typeorm';
import { OrderdetDto } from './dto/orderdet.dto';
 

@Injectable()
export class OrderdetService {
    constructor(
        @InjectRepository(OrderdetEntity) 
        private orderdetRepository: Repository<OrderdetEntity>,
    ){}

    async all(): Promise<OrderdetEntity[]>{ 
        const list = await this.orderdetRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<OrderdetEntity>{
        const orderdet = await this.orderdetRepository.findOne(id);
        if(!orderdet){
            throw new NotFoundException({message: "No existe el orderdet"});
        }
        return orderdet;
    }

    // async getByName(name: string): Promise<orderdetEntity[]>{
    //     const listByName = await this.orderdetRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el orderdet"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<OrderdetEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.orderdetRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el orderdet"});
        }
        return listByName;
    }

    async create(dto: OrderdetDto): Promise<any>{
        const orderdet = this.orderdetRepository.create(dto);
        try{
            await this.orderdetRepository.save(orderdet);
            return {message: "orderdet creado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del orderdet ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    
    // async create(dto: orderdetDto,data): Promise<any>{
    //     const id = 7;
    //     const orderdetImagen = data.filename;
    //     const orderdetImagen2 = {orderdetImage: orderdetImagen}
    //     const orderdet = this.orderdetRepository.create(dto);
    //     try{
    //         await this.orderdetRepository.save(orderdet);
    //         await this.orderdetRepository.update(id, {orderdetImage:orderdetImagen});
    //         return {message: "orderdet creado"};
    //     }catch (error) {
    //             // check error.code
    //             console.log(error.code);
    //             if (error.code === 'ER_DUP_ENTRY') {
    //               throw new ConflictException('EL nombre del orderdet ya existe');
    //             }
    //             throw new InternalServerErrorException(
    //               error
    //             );
    //           }
        
    // }

    async update(id:number, data): Promise<any>{
        return this.orderdetRepository.update(id,data);
    }


    async getAllQuiz(): Promise<OrderdetEntity[]> {
        return await this.orderdetRepository
          .createQueryBuilder('orderdetEntity')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('orderdetEntity.fk','m')
          .getMany();
      }


    

    async getQuizById(id: number): Promise<OrderdetEntity> {
    return await this.orderdetRepository.findOne(id, {
        relations: ['orderdetEntity'],
    });
    }

    async getAllQuizSum(): Promise<OrderdetEntity[]> {
        return await this.orderdetRepository
          .createQueryBuilder('fk')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('fk.orderdetEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }



      
    //   async getQuizById(id: number): Promise<orderdetprovEntity> {
    //     return await this.orderdetprovRepository.findOne(id, {
    //       relations: ['fk'],
    //     });
    //   }
    // //   async getQuizById(id: number): Promise<orderdetEntity> {
    //     return await this.orderdetRepository
    //     .createQueryBuilder("fk")
    //     .innerJoin("fk.orderdetprovEntit", "orderdetprovEntity")
    //     .where("orderdetEntit.fk = :id", { id: id })
    //     .getOne();;
    //   }
      

    
}

// try {
//     await this.save(user);
//   } catch (error) {
//     // check error.code
//     console.log(error.code);
//     if (error.code === 'ER_DUP_ENTRY') {
//       throw new ConflictException('Email already exists');
//     }
//     throw new InternalServerErrorException(
//       error
//     );
//   }