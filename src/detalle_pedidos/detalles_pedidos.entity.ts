
import { Articulos_provedoresEntity } from "src/articulos_provedores/articulos_provedores.entity";
import { PedidosEntity } from "src/pedidos/pedidos.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";

@Entity("detalles_pedidos")
export class Detalles_pedidosEntity {
    @PrimaryGeneratedColumn()
    id_detalles_pedidos: number;

    @Column({type: 'int',nullable: false})
    cantidad: number;

    @Column({type: 'int',width: 11,nullable: false})
    precio_compra: number;

    @Column({type: 'int',nullable: false})
    id_pedidos: number;

    @Column({type: 'int',width: 11,nullable: false})
    id_articulos_provedores: number;

    @Column({type: 'int',width: 11,nullable: false})
    pendientes: number;

    @ManyToOne(() => PedidosEntity, fk7 => fk7.detalles_pedidosEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_pedidos"})
    fk7: PedidosEntity;

    @ManyToOne(() => Articulos_provedoresEntity, fk5 => fk5.detalles_pedidosEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articulos_provedores"})
    fk5: Articulos_provedoresEntity;

}