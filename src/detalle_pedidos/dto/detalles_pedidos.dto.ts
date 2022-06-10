import { IsNumberOptions } from "class-validator";

export class Detalles_pedidosDto{
    id_pedidos:number;
    cantidad: number;
    precio_compra: number;
    id_articulos_provedores:number;
    pendientes: number;
}