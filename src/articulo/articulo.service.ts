// import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ArticuloEntity } from './articulo.entity';
// import { Like, Repository } from 'typeorm';
// import { ArticuloDto } from './dto/articulo.dto';
 

// @Injectable()
// export class ArticuloService {
//     constructor(
//         @InjectRepository(ArticuloEntity) 
//         private readonly articuloRepository: Repository<ArticuloEntity>,
//     ){}

//     async all(): Promise<ArticuloEntity[]>{ 
//         const list = await this.articuloRepository.find();
//         if(!list.length){
//             throw new NotFoundException({message: "la lista esta vacia"});
//         }
//         return list;
//     }

//     async getOne(id: number): Promise<ArticuloEntity>{
//         const articulo = await this.articuloRepository.findOne(id);
//         if(!articulo){
//             throw new NotFoundException({message: "No existe el articulo"});
//         }
//         return articulo;
//     }

//     // async getByName(name: string): Promise<ArticuloEntity[]>{
//     //     const listByName = await this.articuloRepository.find({where: {name: Like(`%${name}%`)}});
//     //     console.log(name);
//     //     console.log(listByName);
//     //     if(!listByName.length){
//     //         throw new NotFoundException({message: "No existe el articulo"});
//     //     }
//     //     return listByName;
//     // }

//     async getByName(name): Promise<ArticuloEntity[]>{
//         const nameB = name;
//         // const name2 =nameB.name;
//         // const obj = JSON.parse(name)
//         const listByName = await this.articuloRepository.find({where: {name: Like(`%${nameB.name}%`)}});
//         console.log(name);
//         // console.log(nameB.name);
//         // console.log(listByName);
//         if(!listByName.length){
//             throw new NotFoundException({message: "No existe el articulo"});
//         }
//         return listByName;
//     }

//     async create(dto: ArticuloDto): Promise<any>{
//         const articulo = this.articuloRepository.create(dto);
//         try{
//             await this.articuloRepository.save(articulo);
//             return {message: "articulo creado"};
//         }catch (error) {
//                 // check error.code
//                 console.log(error.code);
//                 if (error.code === 'ER_DUP_ENTRY') {
//                   throw new ConflictException('EL nombre del articulo ya existe');
//                 }
//                 throw new InternalServerErrorException(
//                   error
//                 );
//               }
//     }

    
//     // async create(dto: articuloDto,data): Promise<any>{
//     //     const id = 7;
//     //     const articuloImagen = data.filename;
//     //     const articuloImagen2 = {articuloImage: articuloImagen}
//     //     const articulo = this.articuloRepository.create(dto);
//     //     try{
//     //         await this.articuloRepository.save(articulo);
//     //         await this.articuloRepository.update(id, {articuloImage:articuloImagen});
//     //         return {message: "articulo creado"};
//     //     }catch (error) {
//     //             // check error.code
//     //             console.log(error.code);
//     //             if (error.code === 'ER_DUP_ENTRY') {
//     //               throw new ConflictException('EL nombre del articulo ya existe');
//     //             }
//     //             throw new InternalServerErrorException(
//     //               error
//     //             );
//     //           }
        
//     // }

//     async update(id:number, data): Promise<any>{
//         return this.articuloRepository.update(id,data);
//     }
    
//     async updateOne(id: number, data): Promise<any> {
//         // delete data.name;
//         // delete data.precio;
//         console.log(data);
//         const articuloImagen = data.filename;

//         return this.articuloRepository.update(id, {productImage:articuloImagen});
//         // return from(this.userRepository.update(id, user)).pipe(
//         //     switchMap(() => this.findOne(id))
//         // );
//     }
// }

// // try {
// //     await this.save(user);
// //   } catch (error) {
// //     // check error.code
// //     console.log(error.code);
// //     if (error.code === 'ER_DUP_ENTRY') {
// //       throw new ConflictException('Email already exists');
// //     }
// //     throw new InternalServerErrorException(
// //       error
// //     );
// //   }