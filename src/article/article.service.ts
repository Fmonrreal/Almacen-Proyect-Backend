import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Like, Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { ArticleprovEntity } from 'src/articleProv/articleprov.entity';
import { StockEntity } from 'src/stock/stock.entity';


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity) 
        private articleRepository: Repository<ArticleEntity>,
    ){}

    async all(): Promise<ArticleEntity[]>{ 
        const list = await this.articleRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<ArticleEntity>{
        const article = await this.articleRepository.findOne(id);
        if(!article){
            throw new NotFoundException({message: "No existe el article"});
        }
        return article;
    }

    // async getByName(name: string): Promise<ArticleEntity[]>{
    //     const listByName = await this.articleRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el article"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<ArticleEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.articleRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el article"});
        }
        return listByName;
    }

    async create(dto: ArticleDto): Promise<any>{
        const article = this.articleRepository.create(dto);
        try{
            await this.articleRepository.save(article);
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
    //     const article = this.articleRepository.create(dto);
    //     try{
    //         await this.articleRepository.save(article);
    //         await this.articleRepository.update(id, {articleImage:articleImagen});
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
        return this.articleRepository.update(id,dto);
    }
    
    async updateOne(id: number, data): Promise<any> {
        // delete data.name;
        // delete data.precio;
        console.log(data);
        const articleImagen = data.filename;

        return this.articleRepository.update(id, {productImage:articleImagen});
        // return from(this.userRepository.update(id, user)).pipe(
        //     switchMap(() => this.findOne(id))
        // );
    }

    async getAllQuiz(): Promise<ArticleEntity[]> {
        return await this.articleRepository
          .createQueryBuilder('fk2')
        //   .leftJoinAndSelect(ArticleprovEntity, 'articleprovEntit','fk2.id_article = articleprovEntit.id_article')
          .leftJoinAndSelect('fk2.articleprovEntity','m')
          .getMany();
      }

    async getQuizById(id: number): Promise<ArticleEntity> {
    return await this.articleRepository.findOne(id, {
        relations: ['articleprovEntity'],
    });
    }

    async getAllQuizSum(): Promise<ArticleEntity[]> {
        return await this.articleRepository
          .createQueryBuilder('fk2')
        //   .leftJoinAndSelect(ArticleprovEntity, 'articleprovEntit','fk2.id_article = articleprovEntit.id_article')
          .leftJoinAndSelect('fk2.articleprovEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }

      async getAllQuizSumByProvider(name): Promise<ArticleEntity[]> {
        const nameB = name;
        return await this.articleRepository
          .createQueryBuilder('artgen')
          .leftJoinAndSelect('artgen.articleprovEntity','artprov')
          // .where("artgen.nombre Like :nombre",{nombre: `%${nameB.name}%`})
          .getRawMany();
      }

      // async getAllQuizStock(): Promise<ArticleEntity[]> {
      //   return await this.articleRepository
      //     .createQueryBuilder('n')
      //     .leftJoinAndSelect("n.articleprovEntity","sub1")
      //     .leftJoinAndSelect("sub1.stockEntity","sub2")
      //     .select('n')
      //       .addSelect("SUM(sub2.cantidad)", "sum")
      //     //   .addSelect("SUM(sub1.cantidad)", "sum")
      //     .groupBy("n.id_article")
      //     // .innerJoin(article,"sub")
      //     .getRawMany();
      
      // }

      // async getAllQuizStockByName(name): Promise<ArticleEntity[]> {
      //   const nameB = name;
      //   return await this.articleRepository
      //     .createQueryBuilder('n')
      //     .leftJoinAndSelect("n.articleprovEntity","sub1")
      //     .leftJoinAndSelect("sub1.stockEntity","sub2")
      //     .select('n')
      //       .addSelect("SUM(sub2.cantidad)", "sum")
      //     //   .addSelect("SUM(sub1.cantidad)", "sum")
      //     .groupBy("n.id_article")
      //     .where("n.nombre Like :nombre",{nombre: `%${nameB.name}%`})
      //     // .innerJoin(article,"sub")
      //     .getRawMany();
      
      // } 

      //Borrar if
      // async getAllQuizStockByName(name,statusFilter): Promise<ArticleEntity[]> {
      //   const nameB = name;
      //   const statusB = statusFilter;
      //   const qb = await this.articleRepository
      //     .createQueryBuilder('n')
      //     .leftJoinAndSelect("n.articleprovEntity","sub1")
      //     .leftJoinAndSelect("sub1.stockEntity","sub2")
      //     .select('n')
      //     .addSelect("SUM(sub2.cantidad)", "sum")
      //     .groupBy("n.id_article")
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

      async getAllQuizStockByName(name,statusFilter,id_sucursal): Promise<ArticleEntity[]> {
        const nameB = name;
        const statusB = statusFilter;
        const id_sucursalB = id_sucursal;
        const qb = await this.articleRepository
          .createQueryBuilder('n')
          .leftJoinAndSelect("n.articleprovEntity","sub1")
          .leftJoinAndSelect("sub1.stockEntity","sub2")
          .leftJoinAndSelect("sub2.fk8","surc")
          .select('n')
          .addSelect("surc.id_sucursal")
          .addSelect("SUM(sub2.cantidad)", "sum")
          .groupBy("n.id_article")
          .where("n.nombre Like :nombre",{nombre: `%${nameB.name}%`})
          .andWhere("surc.id_sucursal  = :id_sucursal",{id_sucursal: `${id_sucursalB.id_sucursal}`})
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
            posts = qb.filter(word => word.sum > word.n_minimos && word.sum < word.n_maximos);
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

      async getAllQuizStock(statusFilter,id_sucursal): Promise<ArticleEntity[]> {
        const statusB = statusFilter;
        const id_sucursalB = id_sucursal;
        const qb = await this.articleRepository
        .createQueryBuilder('n')
        .leftJoinAndSelect("n.articleprovEntity","sub1")
        .leftJoinAndSelect("sub1.stockEntity","sub2")
        .leftJoinAndSelect("sub2.fk8","surc")
        .addSelect("surc.id_sucursal")
        .select('n')
        .addSelect("SUM(sub2.cantidad)", "sum")
        .groupBy("n.id_article")
        .where("surc.id_sucursal  = :id_sucursal",{id_sucursal: `${id_sucursalB.id_sucursal}`})
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
            posts = qb.filter(word => word.sum > word.n_minimos && word.sum < word.n_maximos);
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


      async getAllQuizSelectArtById(id): Promise<ArticleEntity[]> {
        // const idB = id_article;
        return await this.articleRepository
          .createQueryBuilder('artgen')
          .leftJoinAndSelect('artgen.articleprovEntity','artprov')
          .leftJoinAndSelect("artprov.fk4","sup")
          .where("artgen.id_article = :id_article",{id_article: `${id}`})
          .getRawMany();
      }
}
