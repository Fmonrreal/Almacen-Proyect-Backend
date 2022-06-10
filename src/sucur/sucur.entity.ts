import { OrderEntity } from "src/order/order.entity";
import { StockEntity } from "src/stock/stock.entity";
import {Entity,Column,PrimaryGeneratedColumn,OneToMany} from "typeorm";


@Entity('sucur')
export class SucurEntity {
    @PrimaryGeneratedColumn()
    id_sucursal: number;

    @Column({type: 'varchar',length: 45,nullable: false})
    nombre: string;

    @Column({type: 'varchar',length: 45,nullable: false})
    direccion: string;

    @Column({type: 'varchar',length: 45,nullable: false})
    telefono: string;

    // @ManyToOne(() => ArticleprovEntity, fk3 => fk3.sucurEntity,{

    //     onDelete: "CASCADE",
    // })
    // @JoinColumn({name: "id_articleprov"})
    // fk3: ArticleprovEntity;

    // @OneToMany(() => SucurEntity, sucurEntity => sucurEntity.fk8,{
    //     cascade:true,
    // })
    // sucurEntity: SucurEntity[];

    @OneToMany(() => OrderEntity, orderEntity => orderEntity.fk9,{
        cascade:true,
    })
    orderEntity: OrderEntity[];

    @OneToMany(() => StockEntity, stockEntity => stockEntity.fk8,{
        cascade:true,
    })
    stockEntity: StockEntity[];
}
