import { PedidosEntity } from "src/pedidos/pedidos.entity";
import { VentasEntity } from "src/ventas/ventas.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";


@Entity("usuarios")
export class UsuariosEntity {
    @PrimaryGeneratedColumn()
    id_usuarios: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @Column({type: 'varchar',length: 100,nullable: false})
    contraseña: string;

    @OneToMany(() => VentasEntity, ventasEntity => ventasEntity.fk14,{
        cascade:true,
    })
    ventasEntity: VentasEntity;

    @OneToMany(() => PedidosEntity, pedidosEntity => pedidosEntity.fk12,{
        cascade:true,
    })
    pedidosEntity: PedidosEntity;




}

