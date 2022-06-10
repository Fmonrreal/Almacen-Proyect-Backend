
// // import { CategoriaEntity } from "src/categoria/categoria.entity";
// import {Entity,Column,PrimaryGeneratedColumn,Index,PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";


// @Entity('articulos')
// export class ArticuloEntity {
//     @PrimaryGeneratedColumn()
//     // @PrimaryColumn()
//     id_articulos: number;

//     @Column({type: 'varchar',length: 100,nullable: false})
//     nombre: string;

//     @Column({type: 'varchar',length: 45,nullable: true})
//     codigo: string;

//     @Column({type: 'int', width: 11,nullable: false})
//     // @Index("fk_id_categoria_idx")
//     id_categoria: number;

//     @Column({type: 'varchar',length: 100,nullable: true})
//     descripcion: string;

//     @Column({type: 'int',width: 11,nullable: false})
//     maximos: number;

//     @Column({type: 'int',width: 11,nullable: false})
//     minimos: number;

//     @Column({nullable: true})
//     productImage: string;

// //     @ManyToOne(() => CategoriaEntity, fk => fk.articuloEntity,{

// //         onDelete: "CASCADE",
// //     })
// //    @JoinColumn({name: "id_categoria"})
// //     fk: CategoriaEntity;
    
// }
