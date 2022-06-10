import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AlmacenEntity } from './almacen.entity';
import { AlmacenDto } from './dto/almacen.dto';

@Injectable()
export class AlmacenService {
    constructor(
        @InjectRepository(AlmacenEntity) 
        private almacenRepository: Repository<AlmacenEntity>,
    ){}

    async all(): Promise<AlmacenEntity[]>{ 
        const list = await this.almacenRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<AlmacenEntity>{
        const stock = await this.almacenRepository.findOne(id);
        if(!stock){
            throw new NotFoundException({message: "No existe el stock"});
        }
        return stock;
    }

    // async getByName(name: string): Promise<stockEntity[]>{
    //     const listByName = await this.almacenRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el stock"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<AlmacenEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.almacenRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el stock"});
        }
        return listByName;
    }

    async create(dto: AlmacenDto): Promise<any>{
        const stock = this.almacenRepository.create(dto);
        try{
            await this.almacenRepository.save(stock);
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
    //     const stock = this.almacenRepository.create(dto);
    //     try{
    //         await this.almacenRepository.save(stock);
    //         await this.almacenRepository.update(id, {stockImage:stockImagen});
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
        return this.almacenRepository.update(id,data);
    }


    async getAllQuiz(): Promise<AlmacenEntity[]> {
        return await this.almacenRepository
          .createQueryBuilder('almacenEntity')
        //   .leftJoinAndSelect(stockprovEntity, 'stockprovEntit','fk2.id_stock = stockprovEntit.id_stock')
          .leftJoinAndSelect('almacenEntity.fk3','m')
          .getMany();
      }


    

    async getQuizById(id: number): Promise<AlmacenEntity> {
    return await this.almacenRepository.findOne(id, {
        relations: ['almacenEntity'],
    });
    }

    async getAllQuizSum(): Promise<AlmacenEntity[]> {
        return await this.almacenRepository
          .createQueryBuilder('fk2')
        //   .leftJoinAndSelect(stockprovEntity, 'stockprovEntit','fk2.id_stock = stockprovEntit.id_stock')
          .leftJoinAndSelect('fk2.almacenEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }

    async updateQuantity(id_articulos_provedores, cantidadAGuardar): Promise<any>{
    // const listArt = await this.almacenRepository.find(id_articulos_provedores);
    const id = id_articulos_provedores
    const listArt = await this.almacenRepository.find({where: {id_articulos_provedores: `${id_articulos_provedores}`}});
    console.log(id_articulos_provedores)
    // console.log(cantidadRest)
    console.log(listArt)
    let cantidadRest = cantidadAGuardar.cantidad
    let i = 0 
    while(cantidadRest>0){
        // for (let i = 0; i < listArt.length; i++){
            const id_almacen = listArt[i].id_almacen;
            let cantidad = 0;
            if((cantidadRest - listArt[i].cantidad) >= 0){
                cantidadRest -= listArt[i].cantidad
                console.log("id_almacen",id_almacen)
                console.log("cantidadAGuardar",cantidadAGuardar)
                const x = await this.almacenRepository.update(id_almacen,{cantidad});
                console.log("cantidadAGuardar",cantidadRest)
            }else{
                try{
                    cantidad = listArt[i].cantidad - cantidadRest                    
                    const y = await this.almacenRepository.update(id_almacen,{cantidad});
                    console.log("cantidadsobrante",{cantidad})
                    cantidadRest = 0
                    // break;
                }catch (error) {
                        // check error.code
                        console.log(error.code);
                        // if (error.code === 'ER_DUP_ENTRY') {
                        //   throw new ConflictException('EL nombre del stock ya existe');
                        // }
                        throw new InternalServerErrorException(
                            error
                        );
                        }
            } 
        // }
        i += 1
    }
    return {message: "stock modidicaficado"};
    }

    async transferQuantity(id_articulos_provedores, cantidadAGuardar,sucursal_inicial,sucursal_final): Promise<any>{
        // const listArt = await this.almacenRepository.find(id_articulos_provedores);
        const id = id_articulos_provedores
        const listArt = await this.almacenRepository.find({where: {id_sucursales: `${sucursal_inicial}`,id_articulos_provedores: `${id_articulos_provedores}`}});
        let listArt2;
        console.log(id_articulos_provedores)
        // console.log(cantidadRest)
        console.log(listArt)
        let cantidadRest = cantidadAGuardar.cantidad
        console.log("cantidadRest",cantidadRest)
        let i = 0 
        let cantidad 
        while(cantidadRest>0){
            // for (let i = 0; i < listArt.length; i++){
                const id_almacen = listArt[i].id_almacen;
                let cantidad = 0;
                if((cantidadRest - listArt[i].cantidad) >= 0){
                    cantidadRest -= listArt[i].cantidad
                    console.log("id_almacen",id_almacen)
                    console.log("cantidadAGuardar",cantidadAGuardar)
                    const x = await this.almacenRepository.update(id_almacen,{cantidad});
                    console.log("cantidadAGuardar",cantidadRest)
                }else{
                    try{
                        cantidad = listArt[i].cantidad - cantidadRest                    
                        const y = await this.almacenRepository.update(id_almacen,{cantidad});
                        console.log("cantidadsobrante",{cantidad})
                        cantidadRest = 0
                        // break;
                    }catch (error) {
                            // check error.code
                            console.log(error.code);
                            // if (error.code === 'ER_DUP_ENTRY') {
                            //   throw new ConflictException('EL nombre del stock ya existe');
                            // }
                            throw new InternalServerErrorException(
                                error
                            );
                            }
                } 
            // }
            i += 1
        }
        listArt2 = await this.almacenRepository.findOne({where: {id_sucursales: `${sucursal_final}`,id_articulos_provedores: `${id_articulos_provedores}`}})
        
        if(listArt2 == null){
            const ubicacion = "Pte"
            cantidad = cantidadAGuardar.cantidad
            const id_sucursales = sucursal_final
            const stock = this.almacenRepository.create({id_articulos_provedores,id_sucursales,cantidad,ubicacion});
            try{
                await this.almacenRepository.save(stock);
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
        }else{


        console.log("listArt2",listArt2)
        cantidad = listArt2.cantidad+cantidadAGuardar.cantidad
        const id_almacen = listArt2.id_almacen
        console.log(cantidad)
        const z = await this.almacenRepository.update(id_almacen,{cantidad});
        }
        return {message: "stock modidicaficado"};
        }

    async addQuantity(cart,id_sucursales): Promise<any>{
        const listArt = cart;
        // let listArt2;
        // console.log(id_articulos_provedores)
        // console.log(listArt)
        // let cantidadRest = cantidadAGuardar.cantidad
        let i = 0 
        while(listArt.length>i){
            const id_articulos_provedores = listArt[i].id_articulos_provedores;
            const ubicacion_almacen = await this.almacenRepository.find({where: {id_sucursales: `${id_sucursales}`,id_articulos_provedores: `${id_articulos_provedores}`}})
            let cantidad = listArt[i].restantes;
            if(ubicacion_almacen.length == 0){
                const ubicacion = "Pte"
                const stock = this.almacenRepository.create({id_articulos_provedores,id_sucursales,cantidad,ubicacion});
                try{
                    await this.almacenRepository.save(stock);
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
            }else{
                console.log(ubicacion_almacen)
                const id_almacen = ubicacion_almacen[0].id_almacen
                cantidad += ubicacion_almacen[0].cantidad
                const x = await this.almacenRepository.update(id_almacen,{cantidad});
            }
            i += 1
        }
        console.log(cart)
        console.log(listArt)
        return {cart};
        }
    


      
    //   async getQuizById(id: number): Promise<stockprovEntity> {
    //     return await this.stockprovRepository.findOne(id, {
    //       relations: ['fk2'],
    //     });
    //   }
    // //   async getQuizById(id: number): Promise<stockEntity> {
    //     return await this.almacenRepository
    //     .createQueryBuilder("fk2")
    //     .innerJoin("fk2.stockprovEntit", "stockprovEntity")
    //     .where("stockEntit.fk2 = :id", { id: id })
    //     .getOne();;
    //   }
}
