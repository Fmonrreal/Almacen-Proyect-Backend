import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Detalles_pedidosEntity } from './detalles_pedidos.entity';
import { Detalles_pedidosDto } from './dto/detalles_pedidos.dto';

@Injectable()
export class Detalles_pedidosService {
    constructor(
        @InjectRepository(Detalles_pedidosEntity) 
        private detalles_pedidosRepository: Repository<Detalles_pedidosEntity>,
    ){}

    async all(): Promise<Detalles_pedidosEntity[]>{ 
        const list = await this.detalles_pedidosRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<Detalles_pedidosEntity>{
        const orderdet = await this.detalles_pedidosRepository.findOne(id);
        if(!orderdet){
            throw new NotFoundException({message: "No existe el orderdet"});
        }
        return orderdet;
    }

    // async getByName(name: string): Promise<orderdetEntity[]>{
    //     const listByName = await this.detalles_pedidosRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el orderdet"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<Detalles_pedidosEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.detalles_pedidosRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el orderdet"});
        }
        return listByName;
    }

    async create(dto: Detalles_pedidosDto): Promise<any>{
        const orderdet = this.detalles_pedidosRepository.create(dto);
        try{
            await this.detalles_pedidosRepository.save(orderdet);
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

    
    // async create(dto: orderdetDto,data): Promise<any>{
    //     const id = 7;
    //     const orderdetImagen = data.filename;
    //     const orderdetImagen2 = {orderdetImage: orderdetImagen}
    //     const orderdet = this.detalles_pedidosRepository.create(dto);
    //     try{
    //         await this.detalles_pedidosRepository.save(orderdet);
    //         await this.detalles_pedidosRepository.update(id, {orderdetImage:orderdetImagen});
    //         return {message: "orderdet creado"};
    //     }catch (error) {
    //             // check error.code
    //             console.log(error.code);
    //             if (error.code === 'ER_DUP_ENTRY') {
    //               throw new ConflictException('EL nombre del orderdet ya existe');
    //             }
    //             throw new InternalServerErrorException(
    //               error
    //             );
    //           }
        
    // }

    async update(id:number, data): Promise<any>{
        return this.detalles_pedidosRepository.update(id,data);
    }


    async getAllQuiz(): Promise<Detalles_pedidosEntity[]> {
        return await this.detalles_pedidosRepository
          .createQueryBuilder('detalles_pedidosEntity')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('detalles_pedidosEntity.fk','m')
          .getMany();
      }

    async getById(id_pedidos): Promise<Detalles_pedidosEntity[]>{;
        const listById = await this.detalles_pedidosRepository.find(id_pedidos);
        if(!listById.length){
            throw new NotFoundException({message: "No existe pedido con ese id"});
        }
        return listById;
    }

    async getByIdAndName(id_pedidos): Promise<Detalles_pedidosEntity[]>{;
        const listById = await this.detalles_pedidosRepository.find(id_pedidos);
        if(!listById.length){
            throw new NotFoundException({message: "No existe pedido con ese id"});
        }
        return listById;
    }
    

    async getQuizById(id: number): Promise<Detalles_pedidosEntity> {
    return await this.detalles_pedidosRepository.findOne(id, {
        relations: ['detalles_pedidosEntity'],
    });
    }

    async getAllQuizSum(): Promise<Detalles_pedidosEntity[]> {
        return await this.detalles_pedidosRepository
          .createQueryBuilder('fk')
        //   .leftJoinAndSelect(orderdetprovEntity, 'orderdetprovEntit','fk2.id_orderdet = orderdetprovEntit.id_orderdet')
          .leftJoinAndSelect('fk.detalles_pedidosEntity','m')
          .addSelect("SUM(m.photosCount)", "sum")
          .groupBy("m.nombre")
          .getMany();
      }

    // async getproductsByIdPedidos(id_pedidos): Promise<Detalles_pedidosEntity[]>{
    // return await this.detalles_pedidosRepository
    // .createQueryBuilder('pedido')
    // .leftJoinAndSelect('pedido.fk5','artprov')
    // .leftJoinAndSelect("artprov.fk2","artgen")
    // .where("pedido.id_pedidos = :id_pedidos",{id_pedidos: `${id_pedidos.id_pedidos}`})
    // .select("pedido","")
    // .addSelect("artgen.nombre")
    // .getRawMany();
    // }

    async getproductsByIdPedidos(id_pedidos): Promise<Detalles_pedidosEntity[]>{
        const z = []
        const x = await this.detalles_pedidosRepository
        .createQueryBuilder('pedido')
        .leftJoinAndSelect('pedido.fk5','artprov')
        .leftJoinAndSelect("artprov.fk2","artgen")
        .where("pedido.id_pedidos = :id_pedidos",{id_pedidos: `${id_pedidos.id_pedidos}`})
        .andWhere("pedido.pendientes != :pendientes",{pendientes: 0})
        .select("pedido","")
        .addSelect("artgen.nombre")
        .getRawMany();

        x.map(rec => 
            z.push({'id_detalles_pedidos': rec.pedido_id_detalles_pedidos, // Assign new key
            'cantidad': rec.pedido_cantidad, // Assign new key
            'precio_compra': rec.pedido_precio_compra, // Assign new key
            'id_pedidos': rec.pedido_id_pedidos, // Assign new key
            'id_articulos_provedores': rec.pedido_id_articulos_provedores, // Assign new key
            'pendientes': rec.pedido_pendientes,
            'restantes': rec.pedido_pendientes, // Assign new key
            'nombre': rec.artgen_nombre,
        }) // Assign new key
            // delete obj['pedido_id_detalles_pedidos']; // Delete old key
        )

        // const y = x.map(({
        //     pedido_id_detalles_pedidos: id_detalles_pedidos, // Assign new key
        //     pedido_pedido_cantidad: cantidad, // Assign new key
        //     pedido_precio_compra: precio_compra, // Assign new key
        //     pedido_id_pedidos: id_pedidos, // Assign new key
        //     pedido_id_articulos_provedores: id_articulos_provedores
        // }) => ({
        //     id_detalles_pedidos,
        //     cantidad,
        //     precio_compra,
        //     id_pedidos,
        //     id_articulos_provedores,
        //     }) 
        // );

        return z
        }

      
    //   async getQuizById(id: number): Promise<orderdetprovEntity> {
    //     return await this.orderdetprovRepository.findOne(id, {
    //       relations: ['fk'],
    //     });
    //   }
    // //   async getQuizById(id: number): Promise<orderdetEntity> {
    //     return await this.detalles_pedidosRepository
    //     .createQueryBuilder("fk")
    //     .innerJoin("fk.orderdetprovEntit", "orderdetprovEntity")
    //     .where("orderdetEntit.fk = :id", { id: id })
    //     .getOne();;
    //   }
      
    async updateProducts(cart): Promise<any>{
        const listArt = cart;
        let i = 0
        let complete_pedido = 0
        let complete_product = 0
        let id_pedidos = listArt[0].id_pedidos
        while(listArt.length>i){
            const id_detalles_pedidos = listArt[i].id_detalles_pedidos; 
            const pendientes = listArt[i].pendientes -  listArt[i].restantes;
            const x = await this.detalles_pedidosRepository.update(id_detalles_pedidos,{pendientes});
            i += 1
            if(pendientes == 0){
                complete_product++
            }
        }
        if(complete_product == listArt.length){
            complete_pedido = 1
            console.log(id_pedidos)
            return {complete_pedido,id_pedidos}
        }else{
            return {complete_pedido}
        }
    }
}