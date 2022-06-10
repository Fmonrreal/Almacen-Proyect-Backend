import { Detalles_pedidosEntity } from "src/detalle_pedidos/detalles_pedidos.entity";
import { SucursalesEntity } from "src/sucursales/sucursales.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";


@Entity("pedidos")
export class PedidosEntity {
    @PrimaryGeneratedColumn()
    id_pedidos: number;

    @Column({type: 'date', nullable: false, unique:false})
    fecha: Date;

    @Column({type: 'int',nullable: false})
    id_sucursales: number;
    
    @Column({type: 'int',nullable: false})
    id_usuarios: number;

    @Column({type: 'int',nullable: false})
    total: number;

    @Column({type: 'bool',nullable: false})
    recibido: boolean;

    @ManyToOne(() => SucursalesEntity, fk9 => fk9.pedidosEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_sucursales"})
    fk9: SucursalesEntity

    
    @ManyToOne(() => UsuariosEntity, fk12=> fk12.pedidosEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_usuarios"})
    fk12: UsuariosEntity

    @OneToMany(() => Detalles_pedidosEntity, detalles_pedidosEntity => detalles_pedidosEntity.fk7,{
        cascade:true,
    })
    detalles_pedidosEntity: Detalles_pedidosEntity;
}