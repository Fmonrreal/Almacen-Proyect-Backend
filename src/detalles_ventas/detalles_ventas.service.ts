import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Detalles_ventasEntity } from './detalles_ventas.entity';
import { DetallesVentasDto } from './dto/detalles_ventas.dto';

@Injectable()
export class Detalles_ventasService {
    constructor(
        @InjectRepository(Detalles_ventasEntity) 
        private detalles_ventasRepository: Repository<Detalles_ventasEntity>,
    ){}

    async all(): Promise<Detalles_ventasEntity[]>{ 
        const list = await this.detalles_ventasRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<Detalles_ventasEntity>{
        const orderdet = await this.detalles_ventasRepository.findOne(id);
        if(!orderdet){
            throw new NotFoundException({message: "No existe el orderdet"});
        }
        return orderdet;
    }

    async getById(id_ventas): Promise<Detalles_ventasEntity[]>{
        // const listByName = await this.detalles_ventasRepository.find({where: {id_ventas: id_ventas}});
        const listById = await this.detalles_ventasRepository.find(id_ventas);
        if(!listById.length){
            throw new NotFoundException({message: "No existeventas con ese id"});
        }
        return listById;
    }

    async create(dto: DetallesVentasDto): Promise<any>{
        const orderdet = this.detalles_ventasRepository.create(dto);
        try{
            await this.detalles_ventasRepository.save(orderdet);
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

    async update(id:number, data): Promise<any>{
        return this.detalles_ventasRepository.update(id,data);
    }


    async getAllQuiz(): Promise<Detalles_ventasEntity[]> {
        return await this.detalles_ventasRepository
          .createQueryBuilder('detalles_ventasEntity')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('detalles_ventasEntity.fk','m')
          .getMany();
      }


    

    async getQuizById(id: number): Promise<Detalles_ventasEntity> {
    return await this.detalles_ventasRepository.findOne(id, {
        relations: ['detalles_ventasEntity'],
    });
    }

    async getAllQuizSum(): Promise<Detalles_ventasEntity[]> {
        return await this.detalles_ventasRepository
          .createQueryBuilder('fk')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('fk.detalles_ventasEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }

}