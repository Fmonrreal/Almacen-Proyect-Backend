import { Articulos_provedoresEntity } from "src/articulos_provedores/articulos_provedores.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";



@Entity("provedores")
export class ProvedoresEntity {
    @PrimaryGeneratedColumn()
    id_provedores: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    razon: string;

    @Column({ unique: true, length: 250 })
    email: string;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    telefono: string;
    
    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    direccion: string;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    sku: string;

    @OneToMany(() => Articulos_provedoresEntity, articulos_provedoresEntity => articulos_provedoresEntity.fk4,{
        cascade:true,
    })
    articulos_provedoresEntity: Articulos_provedoresEntity;
}
