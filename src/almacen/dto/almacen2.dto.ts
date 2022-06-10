import { IsString, Matches, MaxLength, MinLength,IsDate,IsOptional,IsInt } from 'class-validator';

export class Almacen2Dto{
    @IsString()
    ubicacion?: string;

    @IsInt()
    cantidad?: number;

    @IsInt()
    id_articulos_provedores:number;
}