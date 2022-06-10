import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { MotocicletasEntity } from "src/motocicletas/motocicletas.entity";
import { ArticulosEntity } from "src/articulos/articulos.entity";


@Entity('articulos_motocicletas')
export class Articulos_motocicletasEntity {
    @PrimaryGeneratedColumn()
    id_articulos_motocicletas: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @Column({type: 'int',width: 11,nullable: false})
    id_motocicletas: number;

    @Column({type: 'int',width: 11,nullable: false})
    id_articulos: number;
 

    @ManyToOne(() => MotocicletasEntity, fk22 => fk22.articulos_motocicletasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_motocicletas"})
    fk22: MotocicletasEntity;

    @ManyToOne(() => ArticulosEntity, fk21 => fk21.articulos_motocicletasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articulos"})
    fk21: ArticulosEntity;

 
}