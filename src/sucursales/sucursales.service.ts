import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SucursalesDto } from './dto/sucursales.dto';
import { SucursalesEntity } from './sucursales.entity';

@Injectable()
export class SucursalesService {
    constructor(
        @InjectRepository(SucursalesEntity) 
        private sucursalesRepository: Repository<SucursalesEntity>,
    ){}

    async all(): Promise<SucursalesEntity[]>{ 
        const list = await this.sucursalesRepository.find();
        console.log("getall")
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<SucursalesEntity>{
        const sucur = await this.sucursalesRepository.findOne(id);
        if(!sucur){
            throw new NotFoundException({message: "No existe el sucur"});
        }
        return sucur;
    }

    async getByName(name): Promise<SucursalesEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.sucursalesRepository.find({where: {nombre: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el sucur"});
        }
        return listByName;
    }

    async create(dto: SucursalesDto): Promise<any>{
        const sucur = this.sucursalesRepository.create(dto);
        try{
            await this.sucursalesRepository.save(sucur);
            return {message: "sucur creado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del sucursal ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    async update(id_sucursales:number, data): Promise<any>{
        return this.sucursalesRepository.update(id_sucursales,data);
    }

    async deleteOne(id_sucursales): Promise<any>{
        // const sucursal = await this.sucursalesRepository.find({id_sucursales});
        // return this.sucursalesRepository.remove(toDeleteSucursales);
        await this.sucursalesRepository.delete({id_sucursales});
    }


    // async getAllQuiz(): Promise<SucursalesEntity[]> {
    //     return await this.sucursalesRepository
    //       .createQueryBuilder('SucursalesEntity')
    //     //   .leftJoinAndSelect(sucurprovEntity, 'sucurprovEntit','fk2.id_sucur = sucurprovEntit.id_sucur')
    //       .leftJoinAndSelect('SucursalesEntity.fk3','m')
    //       .getMany();
    //   }


    

    // async getQuizById(id: number): Promise<SucursalesEntity> {
    // return await this.sucursalesRepository.findOne(id, {
    //     relations: ['SucursalesEntity'],
    // });
    // }

    // async getAllQuizSum(): Promise<SucursalesEntity[]> {
    //     return await this.sucursalesRepository
    //       .createQueryBuilder('fk2')
    //     //   .leftJoinAndSelect(sucurprovEntity, 'sucurprovEntit','fk2.id_sucur = sucurprovEntit.id_sucur')
    //       .leftJoinAndSelect('fk2.SucursalesEntity','m')
    //       .addSelect("SUM(m.photosCount)", "sum")
    //       .groupBy("m.nombre")
    //       .getMany();
    //   }

}
