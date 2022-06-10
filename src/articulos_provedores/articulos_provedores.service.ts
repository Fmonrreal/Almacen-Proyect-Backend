import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Articulos_provedoresEntity } from './articulos_provedores.entity';
import { Articulos_provedoresDto } from './dto/articulos_provedores.dto';

@Injectable()
export class Articulos_provedoresService {
  constructor(
    @InjectRepository(Articulos_provedoresEntity)
    private articulos_provedoresRepository: Repository<Articulos_provedoresEntity>,
    private httpService: HttpService,
  ) {}

  async all(): Promise<Articulos_provedoresEntity[]> {
    const list = await this.articulos_provedoresRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'la lista esta vacia' });
    }
    return list;
  }

  async getOne(id: number): Promise<Articulos_provedoresEntity> {
    const articleprovo = await this.articulos_provedoresRepository.findOne(id);
    if (!articleprovo) {
      throw new NotFoundException({ message: 'No existe el articleprovo' });
    }
    return articleprovo;
  }

  // async getByName(name: string): Promise<articleprovEntity[]>{
  //     const listByName = await this.articulos_provedoresRepository.find({where: {name: Like(`%${name}%`)}});
  //     console.log(name);
  //     console.log(listByName);
  //     if(!listByName.length){
  //         throw new NotFoundException({message: "No existe el articleprovo"});
  //     }
  //     return listByName;
  // }

  async getByName(name): Promise<Articulos_provedoresEntity[]> {
    const nameB = name;
    // const name2 =nameB.name;
    // const obj = JSON.parse(name)
    const listByName = await this.articulos_provedoresRepository.find({
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

  async create(dto: Articulos_provedoresDto): Promise<any> {
    const articleprovo = this.articulos_provedoresRepository.create(dto);
    try {
      await this.articulos_provedoresRepository.save(articleprovo);
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
  //     const articleprovo = this.articulos_provedoresRepository.create(dto);
  //     try{
  //         await this.articulos_provedoresRepository.save(articleprovo);
  //         await this.articulos_provedoresRepository.update(id, {articleprovImage:articleprovImagen});
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
    return this.articulos_provedoresRepository.update(id, data);
  }

  async updateOne(id: number, data): Promise<any> {
    // delete data.name;
    // delete data.precio;
    console.log(data);
    const articleprovImagen = data.filename;

    return this.articulos_provedoresRepository.update(id, { articleprovImage2: articleprovImagen });
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

    // async getAllQuiz(): Promise<Articulos_provedoresEntity[]> {
    //   return await this.articulos_provedoresRepository
    //     .createQueryBuilder('fk2')
    //     .leftJoinAndSelect('fk2.articleprovEntity', 'articleprovEntity')
    //     .getMany();
    // }

    async getAllQuiz(): Promise<Articulos_provedoresEntity[]> {
      return await this.articulos_provedoresRepository
        .createQueryBuilder('articulos_provedoresEntity')
      //   .leftJoinAndSelect(Articulos_provedoresEntity, 'articleprovEntit','fk2.id_articulos = articleprovEntit.id_articulos')
      .leftJoinAndSelect('articulos_provedoresEntity.fk2','m')
        // .innerJoin(ArticleEntity,'m')
        // .leftJoinAndSelect(ArticleEntity,"articleprovEntity", "articleprovEntity.id_articulos_provedores = articleEntity.id_articulos")
        .getMany();
    }

    async getQuizById(id: number): Promise<Articulos_provedoresEntity> {
      return await this.articulos_provedoresRepository.findOne(id, {
        relations: ['fk2'],
      });
    }

    // async getQuizByProvider(id_supplier): Promise<Articulos_provedoresEntity[]> {
    //   const id_supplierB = id_supplier;
    //   return await this.articulos_provedoresRepository.find( {
    //     relations: ['fk2'],
    //     where: { id_supplier: Like(`%${id_supplierB.id_supplier}%`) }
    //   })
    // }

    async getQuizByProvider(id_supplier): Promise<Articulos_provedoresEntity[]> {
      const id_supplierB = id_supplier;
      return await this.articulos_provedoresRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .where("artprov.id_supplier Like :id_supplier",{id_supplier: `%${id_supplierB.id_supplier}%`})
        .getRawMany();
    }

    // async getAllQuizByName(name): Promise<Articulos_provedoresEntity[]> {
    //   const nameB = name;
    //   return await this.articulos_provedoresRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
    //     .getRawMany();
    // }
    async getAllQuizByName(name): Promise<Articulos_provedoresEntity[]> {
      const nameB = name;
      return await this.articulos_provedoresRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.almacenEntity","sub2")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articulos_provedores")
        .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .getRawMany();
    }

    async getAllQuizStock(): Promise<Articulos_provedoresEntity[]> {
      return await this.articulos_provedoresRepository
        .createQueryBuilder('fk3')
        .select('fk3.id_articulos')
        .leftJoinAndSelect('fk3.almacenEntity','n')
        .select('fk3.id_articulos,n.id_articulos_provedores')
        .where("fk3.id_articulos_provedores = n.id_articulos_provedores")
        .addSelect("SUM(n.cantidad)", "sum")
        .groupBy("fk3.id_articulos_provedores")
        .getRawMany();
    }

    //Eliminar posiblemente
    async getAllQuizStockByName(name): Promise<Articulos_provedoresEntity[]> {
      const nameB = name;
      return await this.articulos_provedoresRepository
        .createQueryBuilder('fk3')
        .select('fk3.id_articulos')
        .leftJoinAndSelect('fk3.almacenEntity','n')
        .select('fk3.id_articulos,n.id_articulos_provedores')
        .where("fk3.id_articulos_provedores = n.id_articulos_provedores")
        .addSelect("SUM(n.cantidad)", "sum")
        .groupBy("fk3.id_articulos_provedores")
        .where("m.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .getRawMany();

        // .createQueryBuilder('fk3')
        // .select('id_articulos')

    }

    // async getAllQuizById(id: number): Promise<Articulos_provedoresEntity> {
    //   console.log(id)
    //   // const idB = id;
    //   return await this.articulos_provedoresRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articulos_provedores")
    //     .where("artprov.id_articulos_provedores = :id_articulos_provedores",{id_articulos_provedores: `${id}`})
    //     .getRawMany();
    // }


    // async getAllQuizById(id: number): Promise<Articulos_provedoresEntity> {
    //   // const idB = id;
    //   const qb = await this.articulos_provedoresRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articulos_provedores")
    //     .where("artprov.id_articulos_provedores = :id_articulos_provedores",{id_articulos_provedores: `${id}`})
    //     .getRawMany();

    //     return qb[0];
    // }

    async getAllQuizById(id_articulos_provedores,id_sucursales): Promise<Articulos_provedoresEntity> {
      const id_sucursalesB = id_sucursales;
      const id_articulos_provedoresB = id_articulos_provedores;
      const qb = await this.articulos_provedoresRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.almacenEntity","sub2")
        .leftJoinAndSelect("sub2.fk8","surc")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("surc.id_sucursales")
        .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articulos_provedores")
        .where("artprov.id_articulos_provedores = :id_articulos_provedores",{id_articulos_provedores: `${id_articulos_provedoresB.id_articulos_provedores}`})
        .andWhere("surc.id_sucursales  = :id_sucursales",{id_sucursales: `${id_sucursalesB.id_sucursales}`})
        .getRawMany();

        return qb[0];
    }

    // async getAllQuizByid_articulos_provedoresAndProvider(name,id_supplier): Promise<Articulos_provedoresEntity[]> {
    //   const id_supplierB = id_supplier
    //   const nameB = name;
    //   const qb = await this.articulos_provedoresRepository
    //     .createQueryBuilder('artprov')
    //     .leftJoinAndSelect('artprov.fk2','artgen')
    //     .leftJoinAndSelect("artprov.stockEntity","sub2")
    //     .select("artprov","artgen")
    //     .addSelect('artgen')
    //     .addSelect("SUM(sub2.cantidad)", "sum")
    //     // .select('artprov,artgen,sum')
    //     .groupBy("artprov.id_articulos_provedores")
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

    async getAllQuizByNameAndProvider(name,id_supplier,id_sucursales): Promise<Articulos_provedoresEntity[]> {
      const id_supplierB = id_supplier
      const id_sucursalesB = id_sucursales
      const nameB = name;
      const qb = await this.articulos_provedoresRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.almacenEntity","sub2")
        .leftJoinAndSelect("sub2.fk8","surc")
        .select("artprov","artgen")
        .addSelect('artgen')
        .addSelect("SUM(sub2.cantidad)", "sum")
        .addSelect("surc.id_sucursales")
        // .select('artprov,artgen,sum')
        .groupBy("artprov.id_articulos_provedores")
        .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
        .andWhere("surc.id_sucursales  = :id_sucursales",{id_sucursales: `${id_sucursalesB.id_sucursales}`})
        .getRawMany();

      let posts = [];
      if(id_supplierB.id_supplier==0){
        posts = qb;
        return posts;
      }else{
        posts = qb.filter(word => word.artprov_id_provedores == id_supplierB.id_supplier );
        return posts;
        // return q.where("artprov.id_supplier = :id_supplier",{id_supplier: `${id_supplierB.id_supplier}`})
      }
      
    }

    // async getAllQuizById(id): Promise<Articulos_provedoresEntity> {
    //   const idB = id;
    //   return await this.articulos_provedoresRepository.findOne( {
    //         relations: ['fk2'],
    //         where: { id_articulos_provedores: Like(`%${idB.id}%`) }
    //       })
    // }

    async getAllQuizById2(id: number): Promise<Articulos_provedoresEntity[]> {
      // const idB = id;
      const qb = await this.articulos_provedoresRepository
        .createQueryBuilder('artprov')
        .leftJoinAndSelect('artprov.fk2','artgen')
        .leftJoinAndSelect("artprov.fk4","sup")
        // .select("artprov","artgen")
        // .addSelect('artgen')
        // .addSelect("SUM(sub2.cantidad)", "sum")
        // .groupBy("artprov.id_articulos_provedores")
        .where("artprov.id_articulos = :id_articulos",{id_articulos: `${id}`})
        .getRawMany();

        // return qb[0];
        return qb;
    }


    async getProvidersByProduct(id_articulos): Promise<Articulos_provedoresEntity[]> {
      const id_articulosB = id_articulos;
      const qb = await this.articulos_provedoresRepository
        .createQueryBuilder('artgen')
        .leftJoinAndSelect('artgen.fk4','provider')
        // .leftJoinAndSelect("artprov.stockEntity","sub2")
        // .leftJoinAndSelect("sub2.fk8","surc")
        // .select("artprov","artgen")
        // .addSelect('artgen')
        // .addSelect("surc.id_sucursales")
        // .addSelect("SUM(sub2.cantidad)", "sum")
        // .select('artprov,artgen,sum')
        // .groupBy("artprov.id_articulos_provedores")
        .where("artgen.id_articulos = :id_articulos",{id_articulos: `${id_articulosB.id_articulos}`})
        // .andWhere("surc.id_sucursales  = :id_sucursales",{id_sucursales: `${id_sucursalesB.id_sucursales}`})
        .getRawMany();

        return qb;
    }
}
