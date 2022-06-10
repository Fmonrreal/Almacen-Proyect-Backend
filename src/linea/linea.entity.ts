import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { TipoEntity } from "src/tipo/tipo.entity";
import { ModeloEntity } from "src/modelo/modelo.entity";

@Entity("linea")
export class LineaEntity {
    @PrimaryGeneratedColumn()
    id_linea: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @Column({type: 'int',width: 11,nullable: false})
    id_tipo: number;


    @ManyToOne(() => TipoEntity, fk25 => fk25.lineaEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_tipo"})
    fk25: TipoEntity;

    @OneToMany(() => ModeloEntity, modeloEntity => modeloEntity.fk24,{
        cascade:true,
    })
    modeloEntity: ModeloEntity;


}
