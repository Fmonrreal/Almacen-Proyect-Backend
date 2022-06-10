import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { ArticulosEntity } from "src/articulos/articulos.entity";
import { ProvedoresEntity } from "src/provedores/provedores.entity";
import { AlmacenEntity } from "src/almacen/almacen.entity";
import { Detalles_ventasEntity } from "src/detalles_ventas/detalles_ventas.entity";
import { Detalles_pedidosEntity } from "src/detalle_pedidos/detalles_pedidos.entity";


@Entity('articulos_provedores')
export class Articulos_provedoresEntity {
    @PrimaryGeneratedColumn()
    id_articulos_provedores: number;

    @Column({type: 'int',width: 11,nullable: false})
    precio1: number;

    @Column({type: 'int',width: 11,nullable: false})
    precio2: number;

    @Column({type: 'varchar',length: 100,nullable: false})
    codigo_provedor: string;

    @Column({type: 'varchar',length: 100, nullable: true})
    descripcion: string;

    @Column({type: 'int',width: 11,nullable: false})
    precio_compra: number;

    
    @Column({type: 'int',width: 11,nullable: false})
    id_provedores: number;

    
    @Column({type: 'int',width: 11,nullable: false})
    id_articulos: number;


    @ManyToOne(() => ArticulosEntity, fk2 => fk2.articulos_provedoresEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articulos"})
    fk2: ArticulosEntity;

    @ManyToOne(() => ProvedoresEntity, fk4 => fk4.articulos_provedoresEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_provedores"})
    fk4: ProvedoresEntity;

    @Column({type: 'varchar',length: 500,nullable: true})
    articleprovImage2: string;

    @OneToMany(() => AlmacenEntity, almacenEntity => almacenEntity.fk3,{
        cascade:true,
    })
    almacenEntity: AlmacenEntity[];

    @OneToMany(() => Detalles_ventasEntity, detalles_ventasEntity => detalles_ventasEntity.fk11,{
        cascade:true,
    })
    detalles_ventasEntity: Detalles_ventasEntity;

    @OneToMany(() => Detalles_pedidosEntity, detalles_pedidosEntity => detalles_pedidosEntity.fk5,{
        cascade:true,
    })
    detalles_pedidosEntity: Detalles_pedidosEntity;
}