import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { ModeloEntity } from "src/modelo/modelo.entity";
import { Articulos_motocicletasEntity } from "src/articulos_motocicletas/articulos_motocicletas.entity";



@Entity("motocicletas")
export class MotocicletasEntity {
    @PrimaryGeneratedColumn()
    id_motocicletas: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    cilindrica: string;
    
    @Column({type: 'int',width: 11,nullable: false})
    id_modelo: number;

    @ManyToOne(() => ModeloEntity, fk23 => fk23.motocicletasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_modelo"})
    fk23: ModeloEntity;

    @OneToMany(() => Articulos_motocicletasEntity, articulos_motocicletasEntity => articulos_motocicletasEntity.fk22,{
        cascade:true,
    })
    articulos_motocicletasEntity: Articulos_motocicletasEntity;


}