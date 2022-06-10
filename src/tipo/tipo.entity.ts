import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { MarcaEntity } from "src/marca/marca.entity";
import { LineaEntity } from "src/linea/linea.entity";

@Entity("tipo")
export class TipoEntity {
    @PrimaryGeneratedColumn()
    id_tipo: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;
    
    @Column({type: 'int',width: 11,nullable: false})
    id_marca: number;


    @ManyToOne(() => MarcaEntity, fk26 => fk26.tipoEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_marca"})
    fk26: MarcaEntity;

    @OneToMany(() => LineaEntity, lineaEntity => lineaEntity.fk25,{
        cascade:true,
    })
    lineaEntity: LineaEntity;


}




