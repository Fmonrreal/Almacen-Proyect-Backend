import { AlmacenEntity } from "src/almacen/almacen.entity";
import { PedidosEntity } from "src/pedidos/pedidos.entity";
import { VentasEntity } from "src/ventas/ventas.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";



@Entity("sucursales")
export class SucursalesEntity {
    @PrimaryGeneratedColumn()
    id_sucursales: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @Column({type: 'varchar',length: 100,nullable: false})
    direccion: string;

    @Column({type: 'varchar',length: 100,nullable: false})
    telefono: string;

    @OneToMany(() => VentasEntity, ventasEntity => ventasEntity.fk13,{
        cascade:true,
    })
    ventasEntity: VentasEntity;

    @OneToMany(() => AlmacenEntity, almacenEntity => almacenEntity.fk8,{
        cascade:true,
    })
    almacenEntity: AlmacenEntity;

    @OneToMany(() => PedidosEntity, pedidosEntity => pedidosEntity.fk9,{
        cascade:true,
    })
    pedidosEntity: PedidosEntity;

    
}


