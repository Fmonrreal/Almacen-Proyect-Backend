import { ArticleEntity } from "src/article/article.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";



@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    // @PrimaryColumn()
    id_category: number;

    @Column({type: 'varchar',length: 100,nullable: false})
    nombre: string;

    @OneToMany(() => ArticleEntity, articleEntity => articleEntity.fk,{
        cascade:true,
    })
    articleEntity: ArticleEntity[];
}
 