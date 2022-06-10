import { ArticleprovEntity } from "src/articleProv/articleprov.entity";
import { SucurEntity } from "src/sucur/sucur.entity";
import {Entity,Column,PrimaryGeneratedColumn,Index,PrimaryColumn, ManyToOne, JoinColumn,OneToMany} from "typeorm";


@Entity('stock')
export class StockEntity {
    @PrimaryGeneratedColumn()
    // @PrimaryColumn()
    id_stock: number;

    @Column({type: 'varchar',length: 45,nullable: false})
    ubicacion: string;

    @Column({type: 'int', width: 11,nullable: false})
    // @Index("fk_id_categoria_idx")
    id_articleprov: number;

    @Column({type: 'int',nullable: false})
    cantidad: number;

    @ManyToOne(() => ArticleprovEntity, fk3 => fk3.stockEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_articleprov"})
    fk3: ArticleprovEntity;


    @Column({type: 'int',nullable: false})
    id_sucursal: number;
    @ManyToOne(() => SucurEntity, fk8 => fk8.stockEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_sucursal"})
    fk8: SucurEntity;
}
