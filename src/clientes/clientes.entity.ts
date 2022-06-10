import { VentasEntity } from "src/ventas/ventas.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("clientes")
export class ClientesEntity {
    @PrimaryGeneratedColumn()
    id_clientes : number;

    @Column({type: 'varchar',length: 100, nullable: true})
    nombre: string;

    @Column({type: 'varchar',length: 100, nullable: true})
    razon: string;

    @Column({type: 'varchar',length: 100, nullable: true})
    rfc: string;

    @Column({type: 'varchar',length: 100, nullable: true})
    direccion: string;

    @OneToMany(() => VentasEntity, ventasEntity => ventasEntity.fk15,{
        cascade:true,
    })
    ventasEntity: VentasEntity;
}

