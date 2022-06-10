import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { LineaEntity } from "src/linea/linea.entity";
import { MotocicletasEntity } from "src/motocicletas/motocicletas.entity";

@Entity("modelo")
export class ModeloEntity {
    @PrimaryGeneratedColumn()
    id_modelo: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;
    
    @Column({type: 'int',width: 11,nullable: false})
    id_linea: number;

    @ManyToOne(() => LineaEntity, fk24 => fk24.modeloEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_linea"})
    fk24: LineaEntity;

    @OneToMany(() => MotocicletasEntity, motocicletasEntity => motocicletasEntity.fk23,{
        cascade:true,
    })
    motocicletasEntity: MotocicletasEntity;


}
