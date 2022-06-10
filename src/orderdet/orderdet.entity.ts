import { ArticleprovEntity } from "src/articleProv/articleprov.entity";
import { OrderEntity } from "src/order/order.entity";
import {Entity,Column,PrimaryGeneratedColumn,Index,PrimaryColumn, ManyToOne, JoinColumn,OneToMany} from "typeorm";


@Entity('orderdet')
export class OrderdetEntity {
    @PrimaryGeneratedColumn()
    // @PrimaryColumn()
    id_orderdet: number;

    @Column({type: 'int',nullable: false})
    // @Index("fk_id_categoria_idx")
    id_orden: number;

    @ManyToOne(() => OrderEntity, fk7 => fk7.orderdetEntity,{

        onDelete: "CASCADE",
    })
   @JoinColumn({name: "id_orden"})
    fk7: OrderEntity;

    @Column({type: 'int', width: 11,nullable: false})
    // @Index("fk_id_categoria_idx")
    id_articleprov: number;

    @Column({type: 'int',nullable: false})
    cantidad: number;
    
    @Column({type: 'int',nullable: false})
    precio_compra: number;

    @ManyToOne(() => ArticleprovEntity, fk5 => fk5.orderdetEntity,{
        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articleprov"})
    fk5: ArticleprovEntity;
}
