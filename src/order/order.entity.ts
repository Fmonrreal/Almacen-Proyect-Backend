import {Entity,Column,PrimaryGeneratedColumn,OneToMany,ManyToOne,JoinColumn} from "typeorm";
import { OrderdetEntity } from "src/orderdet/orderdet.entity";
import { SucurEntity } from '../sucur/sucur.entity';

@Entity("order")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id_orden: number;
    @OneToMany(() => OrderdetEntity, orderdetEntity => orderdetEntity.fk7,{
        cascade:true,
    })
    orderdetEntity: OrderdetEntity[];

    @Column({type: 'int',nullable: false})
    id_sucursal: number;
    @ManyToOne(() => SucurEntity, fk9 => fk9.orderEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_sucursal"})
    fk9: SucurEntity;

    @Column({type: 'datetime',nullable: false, unique:false})
    fecha: Date;
}

