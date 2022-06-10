import { IsString,IsInt,IsPositive } from 'class-validator';

export class ClientesDto{
    nombre?: string;
    razon?: string;
    rfc?: string;
    direccion?: string;
}