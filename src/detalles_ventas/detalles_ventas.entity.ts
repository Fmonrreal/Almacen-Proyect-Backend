import { Articulos_provedoresEntity } from "src/articulos_provedores/articulos_provedores.entity";
import { VentasEntity } from "src/ventas/ventas.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("detalles_ventas")
export class Detalles_ventasEntity {
    @PrimaryGeneratedColumn()
    id_detalles_ventas : number;

    @Column({type: 'int',width: 11,nullable: false})
    precio: number;

    @Column({type: 'varchar',length: 100,nullable: false})
    descuento: string;

    @Column({type: 'int',width: 11,nullable: false})
    id_articulos_provedores: number;

    @Column({type: 'int',width: 11,nullable: false})
    id_ventas: number;

    @Column({type: 'int',width: 11,nullable: false})
    cantidad: number;

    @ManyToOne(() => Articulos_provedoresEntity, fk11 => fk11.detalles_ventasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articulos_provedores"})
    fk11: Articulos_provedoresEntity;


    @ManyToOne(() => VentasEntity, fk16 => fk16.detalles_ventasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_ventas"})
    fk16: VentasEntity;

}