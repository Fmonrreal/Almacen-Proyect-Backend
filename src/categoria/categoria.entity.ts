import { ArticulosEntity } from "src/articulos/articulos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("categoria")
export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    nombre: string;

    @OneToMany(() => ArticulosEntity, articulosEntity => articulosEntity.fk,{
        cascade:true,
    })
    articulosEntity: ArticulosEntity;
}