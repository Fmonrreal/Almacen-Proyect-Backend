import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleprovEntity } from './articleprov.entity';
import { Like, Repository } from 'typeorm';
import { ArticleprovDto } from './dto/articleprov.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ArticleEntity } from '../article/article.entity';
import { StockEntity } from 'src/stock/stock.entity';

@Injectable()
export class ArticleprovService {
  constructor(
    @InjectRepository(ArticleprovEntity)
    private articleprovRepository: Repository<ArticleprovEntity>,
    private httpService: HttpService,
  ) {}

  async all(): Promise<ArticleprovEntity[]> {
    const list = await this.articleprovRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'la lista esta vacia' });
    }
    return list;
  }

  async getOne(id: number): Promise<ArticleprovEntity> {
    const articleprovo = await this.articleprovRepository.findOne(id);
    if (!articleprovo) {
      throw new NotFoundException({ message: 'No existe el articleprovo' });
    }
    return articleprovo;
  }

  // async getByName(name: string): Promise<articleprovEntity[]>{
  //     const listByName = await this.articleprovRepository.find({where: {name: Like(`%${name}%`)}});
  //     console.log(name);
  //     console.log(listByName);
  //     if(!listByName.length){
  //         throw new NotFoundException({message: "No existe el articleprovo"});
  //     }
  //     return listByName;
  // }

  async getByName(name): Promise<ArticleprovEntity[]> {
    const nameB = name;
    // const name2 =nameB.name;
    // const obj = JSON.parse(name)
    const listByName = await this.articleprovRepository.find({
      where: { name: Like(`%${nameB.name}%`) },
    });
    console.log(name);
    // console.log(nameB.name);
    // console.log(listByName);
    if (!listByName.length) {
      throw new NotFoundException({ message: 'No existe el articleprovo' });
    }
    return listByName;
  }

  async create(dto: ArticleprovDto): Promise<any> {
    const articleprovo = this.articleprovRepository.create(dto);
    try {
      await this.articleprovRepository.save(articleprovo);
      return { message: 'articleprovo creado' };
    } catch (error) {
      // check error.code
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('EL nombre del articleprovo ya existe');
      }
      throw new InternalServerErrorException(error);
    }
  }

  // async create(dto: articleprovDto,data): Promise<any>{
  //     const id = 7;
  //     const articleprovImagen = data.filename;
  //     const articleprovImagen2 = {articleprovImage: articleprovImagen}
  //     const articleprovo = this.articleprovRepository.create(dto);
  //     try{
  //         await this.articleprovRepository.save(articleprovo);
  //         await this.articleprovRepository.update(id, {articleprovImage:articleprovImagen});
  //         return {message: "articleprovo creado"};
  //     }catch (error) {
  //             // check error.code
  //             console.log(error.code);
  //             if (error.code === 'ER_DUP_ENTRY') {
  //               throw new ConflictException('EL nombre del articleprovo ya existe');
  //             }
  //             throw new InternalServerErrorException(
  //               error
  //             );
  //           }

  // }

  async update(id: number, data): Promise<any> {
    return this.articleprovRepository.update(id, data);
  }

  async updateOne(id: number, data): Promise<any> {
    // delete data.name;
    // delete data.precio;
    console.log(data);
    const articleprovImagen = data.filename;

    return this.articleprovRepository.update(id, { articleprovImage2: articleprovImagen });
    // return from(this.userRepository.update(id, user)).pipe(
    //     switchMap(() => this.findOne(id))
    // );
  }

  // async uplopeOneImage(files): Promise<Observable<AxiosResponse<any, any>>> {
  //     console.log(files);
  //     console.log("Hi");
  //     return await this.httpService.post('https://api.cloudinary.com/v1_1/dpfm70owp/image/upload',files);
  //   }

  async uplopeOneImage(filex): Promise<Observable<AxiosResponse<any, any>>> {
    // console.log(filex);
    console.log('Hi');
    // const formData = new FormData();
    // // const formData = new FormData(file)
    // formData.append('upload_preset', 'my_upload_image_almacen');
    // formData.append('file', files);
    return await this.httpService.post(
      'https://api.cloudinary.com/v1_1/dpfm70owp/image/upload',
      filex)  
    }

    // async getAllQuiz(): Promise<ArticleprovEntity[]> {
    //   return await this.articleprovRepository
    //     .createQueryBuilder('fk2')
    //     .leftJoinAndSelect('fk2.articleprovEntity', 'articleprovEntity')
    //     .getMany();
    // }

    async getAllQuiz(): Promise<ArticleprovEntity[]> {
      return await this.articleprovRepository
        .createQueryBuilder('articleprovEntity')
      //   .leftJoinAndSelect(ArticleprovEntity, 'articleprovEntit','fk2.id_article = articleprovEntit.id_article')
      .leftJoinAndSelect('articleprovEntity.fk2','m')
        // .innerJoin(ArticleEntity,'m')
        // .leftJoinAndSelect(ArticleEntity,"articleprovEntity", "articleprovEntity.id_articleprov = articleEntity.id_article")
        .getMany();
    }

    async getQuizById(id: number): Promise<ArticleprovEntity> {
      return await this.articleprovRepository.findOne(id, {
        relations: ['fk2'],
      });
    }

    // async getQuizByProvider(id_supplier): Promise<ArticleprovEntity[]> {
    //   const id_supplierB = id_supplier;
    //   return await this.articleprovRepository.find( {
    //     relations: ['fk2'],
    //     where: { id_supplier: Like(`%${id_supplierB.id_supplier}%`) }
    //   })
    // }

    async getQuizByProvider(id_supplier): Promise<ArticleprovEntity[]> {
      const id_supplierB = id_supplier;
      return await this.articleprovRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .where("artprov.id_supplier Like :id_supplier",{id_supplier: `%${id_supplierB.id_supplier}%`})
        .getRawMany();
    }

    // async getAllQuizByName(name): Promise<ArticleprovEntity[]> {
    //   const nameB = name;
    //   return await this.articleprovRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
    //     .getRawMany();
    // }
    async getAllQuizByName(name): Promise<ArticleprovEntity[]> {
      const nameB = name;
      return await this.articleprovRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.stockEntity","sub2")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articleprov")
        .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .getRawMany();
    }

    async getAllQuizStock(): Promise<ArticleprovEntity[]> {
      return await this.articleprovRepository
        .createQueryBuilder('fk3')
        .select('fk3.id_article')
        .leftJoinAndSelect('fk3.stockEntity','n')
        .select('fk3.id_article,n.id_articleprov')
        .where("fk3.id_articleprov = n.id_articleprov")
        .addSelect("SUM(n.cantidad)", "sum")
        .groupBy("fk3.id_articleprov")
        .getRawMany();
    }

    //Eliminar posiblemente
    async getAllQuizStockByName(name): Promise<ArticleprovEntity[]> {
      const nameB = name;
      return await this.articleprovRepository
        .createQueryBuilder('fk3')
        .select('fk3.id_article')
        .leftJoinAndSelect('fk3.stockEntity','n')
        .select('fk3.id_article,n.id_articleprov')
        .where("fk3.id_articleprov = n.id_articleprov")
        .addSelect("SUM(n.cantidad)", "sum")
        .groupBy("fk3.id_articleprov")
        .where("m.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .getRawMany();

        // .createQueryBuilder('fk3')
        // .select('id_article')

    }

    // async getAllQuizById(id: number): Promise<ArticleprovEntity> {
    //   console.log(id)
    //   // const idB = id;
    //   return await this.articleprovRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articleprov")
    //     .where("artprov.id_articleprov = :id_articleprov",{id_articleprov: `${id}`})
    //     .getRawMany();
    // }


    // async getAllQuizById(id: number): Promise<ArticleprovEntity> {
    //   // const idB = id;
    //   const qb = await this.articleprovRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articleprov")
    //     .where("artprov.id_articleprov = :id_articleprov",{id_articleprov: `${id}`})
    //     .getRawMany();

    //     return qb[0];
    // }

    async getAllQuizById(id_articleprov,id_sucursal): Promise<ArticleprovEntity> {
      const id_sucursalB = id_sucursal;
      const id_articleprovB = id_articleprov;
      const qb = await this.articleprovRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.stockEntity","sub2")
        .leftJoinAndSelect("sub2.fk8","surc")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("surc.id_sucursal")
        .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articleprov")
        .where("artprov.id_articleprov = :id_articleprov",{id_articleprov: `${id_articleprovB.id_articleprov}`})
        .andWhere("surc.id_sucursal  = :id_sucursal",{id_sucursal: `${id_sucursalB.id_sucursal}`})
        .getRawMany();

        return qb[0];
    }

    // async getAllQuizByid_articleprovAndProvider(name,id_supplier): Promise<ArticleprovEntity[]> {
    //   const id_supplierB = id_supplier
    //   const nameB = name;
    //   const qb = await this.articleprovRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articleprov")
    //     .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
    //     .getRawMany();

    //   let posts = [];
    //   if(id_supplierB.id_supplier==0){
    //     posts = qb;
    //     return posts;
    //   }else{
    //     posts = qb.filter(word => word.artprov_id_supplier == id_supplierB.id_supplier );
    //     return posts;
    //     // return q.where("artprov.id_supplier = :id_supplier",{id_supplier: `${id_supplierB.id_supplier}`})
    //   }
      
    // }

    async getAllQuizByNameAndProvider(name,id_supplier,id_sucursal): Promise<ArticleprovEntity[]> {
      const id_supplierB = id_supplier
      const id_sucursalB = id_sucursal
      const nameB = name;
      const qb = await this.articleprovRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.stockEntity","sub2")
        .leftJoinAndSelect("sub2.fk8","surc")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("SUM(sub2.cantidad)", "sum")
        .addSelect("surc.id_sucursal")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articleprov")
        .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .andWhere("surc.id_sucursal  = :id_sucursal",{id_sucursal: `${id_sucursalB.id_sucursal}`})
        .getRawMany();

      let posts = [];
      if(id_supplierB.id_supplier==0){
        posts = qb;
        return posts;
      }else{
        posts = qb.filter(word => word.artprov_id_supplier == id_supplierB.id_supplier );
        return posts;
        // return q.where("artprov.id_supplier = :id_supplier",{id_supplier: `${id_supplierB.id_supplier}`})
      }
      
    }

    // async getAllQuizById(id): Promise<ArticleprovEntity> {
    //   const idB = id;
    //   return await this.articleprovRepository.findOne( {
    //         relations: ['fk2'],
    //         where: { id_articleprov: Like(`%${idB.id}%`) }
    //       })
    // }

    async getAllQuizById2(id: number): Promise<ArticleprovEntity[]> {
      // const idB = id;
      const qb = await this.articleprovRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.fk4","sup")
        // .select("artprov","artgen")
        // .addSelect('artgen')
        // .addSelect("SUM(sub2.cantidad)", "sum")
        // .groupBy("artprov.id_articleprov")
        .where("artprov.id_article = :id_article",{id_article: `${id}`})
        .getRawMany();

        // return qb[0];
        return qb;
    }


    async getProvidersByProduct(id_article): Promise<ArticleprovEntity[]> {
      const id_articleB = id_article;
      const qb = await this.articleprovRepository
        .createQueryBuilder('artgen')
        .leftJoinAndSelect('artgen.fk4','provider')
        // .leftJoinAndSelect("artprov.stockEntity","sub2")
        // .leftJoinAndSelect("sub2.fk8","surc")
        // .select("artprov","artgen")
        // .addSelect('artgen')
        // .addSelect("surc.id_sucursal")
        // .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        // .groupBy("artprov.id_articleprov")
        .where("artgen.id_article = :id_article",{id_article: `${id_articleB.id_article}`})
        // .andWhere("surc.id_sucursal  = :id_sucursal",{id_sucursal: `${id_sucursalB.id_sucursal}`})
        .getRawMany();

        return qb;
    }
}


