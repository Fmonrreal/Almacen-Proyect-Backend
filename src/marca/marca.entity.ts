import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { TipoEntity } from "src/tipo/tipo.entity";


@Entity("marca")
export class MarcaEntity {
    @PrimaryGeneratedColumn()
    id_marca: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @OneToMany(() => TipoEntity, tipoEntity => tipoEntity.fk26,{
        cascade:true,
    })
    tipoEntity: TipoEntity;



}

