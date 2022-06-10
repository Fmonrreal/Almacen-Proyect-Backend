import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SucurEntity } from './sucur.entity';
import { SucurDto } from './dto/sucur.dto';
 

@Injectable()
export class SucurService {
    constructor(
        @InjectRepository(SucurEntity) 
        private sucurRepository: Repository<SucurEntity>,
    ){}

    async all(): Promise<SucurEntity[]>{ 
        const list = await this.sucurRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<SucurEntity>{
        const sucur = await this.sucurRepository.findOne(id);
        if(!sucur){
            throw new NotFoundException({message: "No existe el sucur"});
        }
        return sucur;
    }

    async getByName(name): Promise<SucurEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.sucurRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el sucur"});
        }
        return listByName;
    }

    async create(dto: SucurDto): Promise<any>{
        const sucur = this.sucurRepository.create(dto);
        try{
            await this.sucurRepository.save(sucur);
            return {message: "sucur creado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del sucur ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    async update(id:number, data): Promise<any>{
        return this.sucurRepository.update(id,data);
    }


    // async getAllQuiz(): Promise<SucurEntity[]> {
    //     return await this.sucurRepository
    //       .createQueryBuilder('sucurEntity')
    //     //   .leftJoinAndSelect(sucurprovEntity, 'sucurprovEntit','fk2.id_sucur = sucurprovEntit.id_sucur')
    //       .leftJoinAndSelect('sucurEntity.fk3','m')
    //       .getMany();
    //   }


    

    // async getQuizById(id: number): Promise<SucurEntity> {
    // return await this.sucurRepository.findOne(id, {
    //     relations: ['sucurEntity'],
    // });
    // }

    // async getAllQuizSum(): Promise<SucurEntity[]> {
    //     return await this.sucurRepository
    //       .createQueryBuilder('fk2')
    //     //   .leftJoinAndSelect(sucurprovEntity, 'sucurprovEntit','fk2.id_sucur = sucurprovEntit.id_sucur')
    //       .leftJoinAndSelect('fk2.sucurEntity','m')
    //       .addSelect("SUM(m.photosCount)", "sum")
    //       .groupBy("m.nombre")
    //       .getMany();
    //   }
}

