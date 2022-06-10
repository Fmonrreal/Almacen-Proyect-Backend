import { CategoryEntity } from "src/category/category.entity";
import { ArticleprovEntity } from "src/articleProv/articleprov.entity";
import {Entity,Column,PrimaryGeneratedColumn,Index,PrimaryColumn, ManyToOne, JoinColumn,OneToMany} from "typeorm";


@Entity('articles')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    // @PrimaryColumn()
    id_article: number;

    @OneToMany(() => ArticleprovEntity, articleprovEntity => articleprovEntity.fk2,{
        cascade:true,
    })
    articleprovEntity: ArticleprovEntity[];

    @Column({type: 'varchar',length: 100,nullable: false})
    nombre: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
    codigo: string;

    @Column({type: 'int', width: 11,nullable: false})
    // @Index("fk_id_categoria_idx")
    id_categoria: number;

    @Column({type: 'varchar',length: 100,nullable: true})
    descripcion: string;

    @Column({type: 'int',width: 11,nullable: false})
    maximos: number;

    @Column({type: 'int',width: 11,nullable: false})
    minimos: number;

    @Column({nullable: true})
    productImage: string;

    @ManyToOne(() => CategoryEntity, fk => fk.articleEntity,{

        onDelete: "CASCADE",
    })
   @JoinColumn({name: "id_categoria"})
  fk: CategoryEntity;
}
