import { IsString,IsInt,IsPositive } from 'class-validator';
import { IsBiggerThan } from '../validator/is_bigger_than';


export class ArticulosDto{
    @IsString()
    nombre?: string;

    @IsString()
    codigo?: string;

    // @IsInt()
    id_categoria?:number;

    @IsString()
    descripcion?: string;

    @IsInt()
    @IsPositive()
    minimos?:number;

    @IsInt()
    @IsBiggerThan('minimos', {
        message: 'maximos debe ser mayor que minimos',
      })
    maximos:number;

    @IsString()
    productImage?:string;
}