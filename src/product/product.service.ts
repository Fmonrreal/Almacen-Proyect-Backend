import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Like, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private httpService: HttpService,
  ) {}

  async all(): Promise<ProductEntity[]> {
    const list = await this.productRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'la lista esta vacia' });
    }
    return list;
  }

  async getOne(id: number): Promise<ProductEntity> {
    const producto = await this.productRepository.findOne(id);
    if (!producto) {
      throw new NotFoundException({ message: 'No existe el producto' });
    }
    return producto;
  }

  // async getByName(name: string): Promise<ProductEntity[]>{
  //     const listByName = await this.productRepository.find({where: {name: Like(`%${name}%`)}});
  //     console.log(name);
  //     console.log(listByName);
  //     if(!listByName.length){
  //         throw new NotFoundException({message: "No existe el producto"});
  //     }
  //     return listByName;
  // }

  async getByName(name): Promise<ProductEntity[]> {
    const nameB = name;
    // const name2 =nameB.name;
    // const obj = JSON.parse(name)
    const listByName = await this.productRepository.find({
      where: { name: Like(`%${nameB.name}%`) },
    });
    console.log(name);
    // console.log(nameB.name);
    // console.log(listByName);
    if (!listByName.length) {
      throw new NotFoundException({ message: 'No existe el producto' });
    }
    return listByName;
  }

  async create(dto: ProductDto): Promise<any> {
    const producto = this.productRepository.create(dto);
    try {
      await this.productRepository.save(producto);
      return { message: 'producto creado' };
    } catch (error) {
      // check error.code
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('EL nombre del producto ya existe');
      }
      throw new InternalServerErrorException(error);
    }
  }

  // async create(dto: ProductDto,data): Promise<any>{
  //     const id = 7;
  //     const productImagen = data.filename;
  //     const productImagen2 = {productImage: productImagen}
  //     const producto = this.productRepository.create(dto);
  //     try{
  //         await this.productRepository.save(producto);
  //         await this.productRepository.update(id, {productImage:productImagen});
  //         return {message: "producto creado"};
  //     }catch (error) {
  //             // check error.code
  //             console.log(error.code);
  //             if (error.code === 'ER_DUP_ENTRY') {
  //               throw new ConflictException('EL nombre del producto ya existe');
  //             }
  //             throw new InternalServerErrorException(
  //               error
  //             );
  //           }

  // }

  async update(id: number, data): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async updateOne(id: number, data): Promise<any> {
    // delete data.name;
    // delete data.precio;
    console.log(data);
    const productImagen = data.filename;

    return this.productRepository.update(id, { productImage: productImagen });
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

}

// @Injectable()
// export class CatsService {
//   constructor(private httpService: HttpService) {}

//   findAll(): Observable<AxiosResponse<Cat[]>> {
//     return this.httpService.post('https://api.cloudinary.com/v1_1/dpfm70owp/image/upload',{data});
//   }
// }

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
