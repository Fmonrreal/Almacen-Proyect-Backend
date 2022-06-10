import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';
import { Like, Repository } from 'typeorm';
import { StockDto } from './dto/stock.dto';
 

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockEntity) 
        private stockRepository: Repository<StockEntity>,
    ){}

    async all(): Promise<StockEntity[]>{ 
        const list = await this.stockRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<StockEntity>{
        const stock = await this.stockRepository.findOne(id);
        if(!stock){
            throw new NotFoundException({message: "No existe el stock"});
        }
        return stock;
    }

    // async getByName(name: string): Promise<stockEntity[]>{
    //     const listByName = await this.stockRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el stock"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<StockEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.stockRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el stock"});
        }
        return listByName;
    }

    async create(dto: StockDto): Promise<any>{
        const stock = this.stockRepository.create(dto);
        try{
            await this.stockRepository.save(stock);
            return {message: "stock creado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del stock ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }

    
    // async create(dto: stockDto,data): Promise<any>{
    //     const id = 7;
    //     const stockImagen = data.filename;
    //     const stockImagen2 = {stockImage: stockImagen}
    //     const stock = this.stockRepository.create(dto);
    //     try{
    //         await this.stockRepository.save(stock);
    //         await this.stockRepository.update(id, {stockImage:stockImagen});
    //         return {message: "stock creado"};
    //     }catch (error) {
    //             // check error.code
    //             console.log(error.code);
    //             if (error.code === 'ER_DUP_ENTRY') {
    //               throw new ConflictException('EL nombre del stock ya existe');
    //             }
    //             throw new InternalServerErrorException(
    //               error
    //             );
    //           }
        
    // }

    async update(id:number, data): Promise<any>{
        return this.stockRepository.update(id,data);
    }


    async getAllQuiz(): Promise<StockEntity[]> {
        return await this.stockRepository
          .createQueryBuilder('stockEntity')
        //   .leftJoinAndSelect(stockprovEntity, 'stockprovEntit','fk2.id_stock = stockprovEntit.id_stock')
          .leftJoinAndSelect('stockEntity.fk3','m')
          .getMany();
      }


    

    async getQuizById(id: number): Promise<StockEntity> {
    return await this.stockRepository.findOne(id, {
        relations: ['stockEntity'],
    });
    }

    async getAllQuizSum(): Promise<StockEntity[]> {
        return await this.stockRepository
          .createQueryBuilder('fk2')
        //   .leftJoinAndSelect(stockprovEntity, 'stockprovEntit','fk2.id_stock = stockprovEntit.id_stock')
          .leftJoinAndSelect('fk2.stockEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }



      
    //   async getQuizById(id: number): Promise<stockprovEntity> {
    //     return await this.stockprovRepository.findOne(id, {
    //       relations: ['fk2'],
    //     });
    //   }
    // //   async getQuizById(id: number): Promise<stockEntity> {
    //     return await this.stockRepository
    //     .createQueryBuilder("fk2")
    //     .innerJoin("fk2.stockprovEntit", "stockprovEntity")
    //     .where("stockEntit.fk2 = :id", { id: id })
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