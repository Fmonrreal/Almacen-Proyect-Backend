import { Articulos_provedoresEntity } from "src/articulos_provedores/articulos_provedores.entity";
import { Detalles_pedidosEntity } from "src/detalle_pedidos/detalles_pedidos.entity";
import { SucursalesEntity } from "src/sucursales/sucursales.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("almacen")
export class AlmacenEntity{
    @PrimaryGeneratedColumn()
    id_almacen : number;

@Column({type: 'varchar',length: 100,nullable: false})
ubicacion: string;

@Column({type: 'int',width: 11,nullable: false})
cantidad: number;


@Column({type: 'int',width: 11,nullable: false})
id_articulos_provedores: number;

@Column({type: 'int',width: 11,nullable: false})
id_sucursales: number;

@ManyToOne(() => Articulos_provedoresEntity, fk3 => fk3.almacenEntity,{

    onDelete: "CASCADE",
})
@JoinColumn({name: "id_articulos_provedores"})
fk3: Articulos_provedoresEntity;


@ManyToOne(() => SucursalesEntity, fk8 => fk8.almacenEntity,{

    onDelete: "CASCADE",
})
@JoinColumn({name: "id_sucursales"})
fk8: SucursalesEntity;

}