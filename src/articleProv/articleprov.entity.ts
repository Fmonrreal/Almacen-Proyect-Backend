import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany} from "typeorm";
import { ArticleEntity } from "src/article/article.entity";
import { StockEntity } from "src/stock/stock.entity";
import { SupplierEntity } from "src/supplier/supplier.entity";
import { OrderdetEntity } from "src/orderdet/orderdet.entity";

@Entity('articlesprov')
export class ArticleprovEntity {
    @PrimaryGeneratedColumn()
    id_articleprov: number;

    @OneToMany(() => StockEntity, stockEntity => stockEntity.fk3,{
        cascade:true,
    })
    stockEntity: StockEntity[];

    @OneToMany(() => OrderdetEntity, orderdetEntity => orderdetEntity.fk5,{
        cascade:true,
    })
    orderdetEntity: OrderdetEntity[];

    @Column({type: 'int',nullable: false})
    // @Index("fk_id_categoria_idx")
    id_article: number;

    @ManyToOne(() => ArticleEntity, fk2 => fk2.articleprovEntity,{

        onDelete: "CASCADE",
    })
   @JoinColumn({name: "id_article"})
    fk2: ArticleEntity;

    @Column({type: 'float',nullable: false, unique:false})
    precio1: number;

    @Column({type: 'float',nullable: false, unique:false})
    precio2: number;

    @Column({type: 'varchar',length: 45,nullable: false, unique:false})
    codigo_provedor: string;

    @Column({type: 'varchar',length: 45,nullable: true, unique:false})
    descripcion: string;

    @Column({type: 'float',nullable: false, unique:false})
    precio_compra: number;

    @Column({type: 'varchar',length: 500,nullable: true})
    articleprovImage2: string;

    @Column({type: 'int',nullable: false})
    // @Index("fk_id_categoria_idx")
    id_supplier: number;

    @ManyToOne(() => SupplierEntity, fk4 => fk4.articleprovEntity,{

        onDelete: "CASCADE",
    })
   @JoinColumn({name: "id_supplier"})
    fk4: SupplierEntity;

}