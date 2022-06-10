import { Articulos_motocicletasEntity } from "src/articulos_motocicletas/articulos_motocicletas.entity";
import { Articulos_provedoresEntity } from "src/articulos_provedores/articulos_provedores.entity";
import { CategoriaEntity } from "src/categoria/categoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("articulos")
export class ArticulosEntity {
    @PrimaryGeneratedColumn()
    id_articulos : number;

    @Column({type: 'varchar',length: 100,nullable: false})
    nombre: string;

    @Column({type: 'varchar',length: 100,nullable: false})
    codigo: string;

    @Column({type: 'varchar',length: 100, nullable: true})
    descripcion: string;

    @Column({type: 'int',width: 11,nullable: false})
    maximos: number;

    @Column({type: 'int',width: 11,nullable: false})
    minimos: number;

    @Column({nullable: true})
    productImage: string;

    @Column({type: 'int',width: 11,nullable: false})
    id_categoria: number;


    @ManyToOne(() => CategoriaEntity, fk => fk.articulosEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_categoria"})
    fk: CategoriaEntity;

    @OneToMany(() => Articulos_motocicletasEntity, articulos_motocicletasEntity => articulos_motocicletasEntity.fk21,{
        cascade:true,
    })
    articulos_motocicletasEntity: Articulos_motocicletasEntity;

    @OneToMany(() => Articulos_provedoresEntity, articulos_provedoresEntity => articulos_provedoresEntity.fk2,{
        cascade:true,
    })
    articulos_provedoresEntity: Articulos_provedoresEntity[];


}