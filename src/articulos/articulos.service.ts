import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ArticulosEntity } from './articulos.entity';
import { ArticulosDto } from './dto/articulos.dto';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(ArticulosEntity) 
    private articulosRepository: Repository<ArticulosEntity>,
    ){}

async all(): Promise<ArticulosEntity[]>{ 
    const list = await this.articulosRepository.find();
    if(!list.length){
        throw new NotFoundException({message: "la lista esta vacia"});
    }
    return list;
}

async getOne(id: number): Promise<ArticulosEntity>{
    const article = await this.articulosRepository.findOne(id);
    if(!article){
        throw new NotFoundException({message: "No existe el article"});
    }
    return article;
}

// async getByName(name: string): Promise<ArticulosEntity[]>{
//     const listByName = await this.articulosRepository.find({where: {name: Like(`%${name}%`)}});
//     console.log(name);
//     console.log(listByName);
//     if(!listByName.length){
//         throw new NotFoundException({message: "No existe el article"});
//     }
//     return listByName;
// }

async getByName(name): Promise<ArticulosEntity[]>{
    const nameB = name;
    // const name2 =nameB.name;
    // const obj = JSON.parse(name)
    const listByName = await this.articulosRepository.find({where: {name: Like(`%${nameB.name}%`)}});
    console.log(name);
    // console.log(nameB.name);
    // console.log(listByName);
    if(!listByName.length){
        throw new NotFoundException({message: "No existe el article"});
    }
    return listByName;
}

async create(dto: ArticulosDto): Promise<any>{
    const article = this.articulosRepository.create(dto);
    try{
        await this.articulosRepository.save(article);
        return {message: "article creado"};
    }catch (error) {
            // check error.code
            console.log(error.code);
            if (error.code === 'ER_DUP_ENTRY') {
              throw new ConflictException('EL nombre del article ya existe');
            }
            throw new InternalServerErrorException(
              error
            );
          }
}


// async create(dto: articleDto,data): Promise<any>{
//     const id = 7;
//     const articleImagen = data.filename;
//     const articleImagen2 = {articleImage: articleImagen}
//     const article = this.articulosRepository.create(dto);
//     try{
//         await this.articulosRepository.save(article);
//         await this.articulosRepository.update(id, {articleImage:articleImagen});
//         return {message: "article creado"};
//     }catch (error) {
//             // check error.code
//             console.log(error.code);
//             if (error.code === 'ER_DUP_ENTRY') {
//               throw new ConflictException('EL nombre del article ya existe');
//             }
//             throw new InternalServerErrorException(
//               error
//             );
//           }
    
// }

async update(id:number, dto): Promise<any>{
    return this.articulosRepository.update(id,dto);
}

async updateOne(id: number, data): Promise<any> {
    // delete data.name;
    // delete data.precio;
    console.log(data);
    const articleImagen = data.filename;

    return this.articulosRepository.update(id, {productImage:articleImagen});
    // return from(this.userRepository.update(id, user)).pipe(
    //     switchMap(() => this.findOne(id))
    // );
}

async getAllQuiz(): Promise<ArticulosEntity[]> {
    return await this.articulosRepository
      .createQueryBuilder('fk2')
    //   .leftJoinAndSelect(articulos_provedoresEntity, 'articleprovEntit','fk2.id_articulos = articleprovEntit.id_articulos')
      .leftJoinAndSelect('fk2.articulos_provedoresEntity','m')
      .getMany();
  }

async getQuizById(id: number): Promise<ArticulosEntity> {
return await this.articulosRepository.findOne(id, {
    relations: ['articulos_provedoresEntity'],
});
}

async getAllQuizSum(): Promise<ArticulosEntity[]> {
    return await this.articulosRepository
      .createQueryBuilder('fk2')
    //   .leftJoinAndSelect(articulos_provedoresEntity, 'articleprovEntit','fk2.id_articulos = articleprovEntit.id_articulos')
      .leftJoinAndSelect('fk2.articulos_provedoresEntity','m')
      .addSelect("SUM(m.photosCount)", "sum")
      .groupBy("m.nombre")
      .getMany();
  }

  async getAllQuizSumByProvider(name): Promise<ArticulosEntity[]> {
    const nameB = name;
    return await this.articulosRepository
      .createQueryBuilder('artgen')
      .leftJoinAndSelect('artgen.articulos_provedoresEntity','artprov')
      // .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
      .getRawMany();
  }

  // async getAllQuizStock(): Promise<ArticulosEntity[]> {
  //   return await this.articulosRepository
  //     .createQueryBuilder('n')
  //     .leftJoinAndSelect("n.articulos_provedoresEntity","sub1")
  //     .leftJoinAndSelect("sub1.stockEntity","sub2")
  //     .select('n')
  //       .addSelect("SUM(sub2.cantidad)", "sum")
  //     //   .addSelect("SUM(sub1.cantidad)", "sum")
  //     .groupBy("n.id_articulos")
  //     // .innerJoin(article,"sub")
  //     .getRawMany();
  
  // }

  // async getAllQuizStockByName(name): Promise<ArticulosEntity[]> {
  //   const nameB = name;
  //   return await this.articulosRepository
  //     .createQueryBuilder('n')
  //     .leftJoinAndSelect("n.articulos_provedoresEntity","sub1")
  //     .leftJoinAndSelect("sub1.stockEntity","sub2")
  //     .select('n')
  //       .addSelect("SUM(sub2.cantidad)", "sum")
  //     //   .addSelect("SUM(sub1.cantidad)", "sum")
  //     .groupBy("n.id_articulos")
  //     .where("n.nombre Like :nombre",{nombre: `%${nameB.name}%`})
  //     // .innerJoin(article,"sub")
  //     .getRawMany();
  
  // } 

  //Borrar if
  // async getAllQuizStockByName(name,statusFilter): Promise<ArticulosEntity[]> {
  //   const nameB = name;
  //   const statusB = statusFilter;
  //   const qb = await this.articulosRepository
  //     .createQueryBuilder('n')
  //     .leftJoinAndSelect("n.articulos_provedoresEntity","sub1")
  //     .leftJoinAndSelect("sub1.stockEntity","sub2")
  //     .select('n')
  //     .addSelect("SUM(sub2.cantidad)", "sum")
  //     .groupBy("n.id_articulos")
  //     .where("n.nombre Like :nombre",{nombre: `%${nameB.name}%`})
  //     .getRawMany();

  //     let posts = [];

  //   switch(statusB.statusFilter){
  //     case 0:
  //       posts = qb;
  //       return posts;
  //     case 1:
  //       posts = qb.filter(word => word.sum < word.n_minimos);
  //       return posts;
  //     case 2:
  //       posts = qb.filter(word => word.sum > word.n_minimos && word.sum < word.n_maximos);
  //       return posts;
  //     case 3:
  //       posts = qb.filter(word => word.sum > word.n_maximos);
  //       return posts;
  //     case 4:
  //       posts = qb.filter(word => word.sum == null);
  //       return posts;
  //     default:
  //       posts = qb;
  //       return posts;
  //   }
  
  // } 

  async getAllQuizStockByName(name,statusFilter,id_sucursales): Promise<ArticulosEntity[]> {
    const nameB = name;
    const statusB = statusFilter;
    const id_sucursalesB = id_sucursales;
    const qb = await this.articulosRepository
      .createQueryBuilder('n')
      .leftJoinAndSelect("n.articulos_provedoresEntity","sub1")
      .leftJoinAndSelect("sub1.almacenEntity","sub2")
      .leftJoinAndSelect("sub2.fk8","surc")
      .select('n')
      .addSelect("surc.id_sucursales")
      .addSelect("SUM(sub2.cantidad)", "sum")
      .groupBy("n.id_articulos")
      .where("n.nombre Like :nombre",{nombre: `%${nameB.name}%`})
      .andWhere("surc.id_sucursales  = :id_sucursales",{id_sucursales: `${id_sucursalesB.id_sucursales}`})
      .getRawMany();
      console.log(qb)

      let posts = [];

    switch(statusB.statusFilter){
      case 0:
        posts = qb;
        return posts;
      case 1:
        posts = qb.filter(word => word.sum < word.n_minimos);
        return posts;
      case 2:
        posts = qb.filter(word => word.sum >= word.n_minimos && word.sum <= word.n_maximos);
        return posts;
      case 3:
        posts = qb.filter(word => word.sum > word.n_maximos);
        return posts;
      case 4:
        posts = qb.filter(word => word.sum == null);
        return posts;
      default:
        posts = qb;
        return posts;
    }
  
  } 

  async getAllQuizStock(statusFilter,id_sucursales): Promise<ArticulosEntity[]> {
    const statusB = statusFilter;
    const id_sucursalesB = id_sucursales;
    const qb = await this.articulosRepository
    .createQueryBuilder('n')
    .leftJoinAndSelect("n.articulos_provedoresEntity","sub1")
    .leftJoinAndSelect("sub1.almacenEntity","sub2")
    .leftJoinAndSelect("sub2.fk8","surc")
    .addSelect("surc.id_sucursales")
    .select('n')
    .addSelect("SUM(sub2.cantidad)", "sum")
    .groupBy("n.id_articulos")
    .where("surc.id_sucursales  = :id_sucursales",{id_sucursales: `${id_sucursalesB.id_sucursales}`})
    .getRawMany();

    let posts = [];

    switch(statusB.statusFilter){
      case 0:
        posts = qb;
        return posts;
      case 1:
        posts = qb.filter(word => word.sum < word.n_minimos);
        return posts;
      case 2:
        posts = qb.filter(word => word.sum >= word.n_minimos && word.sum <= word.n_maximos);
        return posts;
      case 3:
        posts = qb.filter(word => word.sum > word.n_maximos);
        return posts;
      case 4:
        posts = qb.filter(word => word.sum == null);
        return posts;
      default:
        posts = qb;
        return posts;
    }
  
   
  }


  async getAllQuizSelectArtById(id): Promise<ArticulosEntity[]> {
    // const idB = id_articulos;
    return await this.articulosRepository
      .createQueryBuilder('artgen')
      .leftJoinAndSelect('artgen.articulos_provedoresEntity','artprov')
      .leftJoinAndSelect("artprov.fk4","sup")
      .where("artgen.id_articulos = :id_articulos",{id_articulos: `${id}`})
      .getRawMany();
  }
      
       


}
