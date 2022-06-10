import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('producto')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 10,nullable: false, unique:false})
    name: string;

    @Column({type: 'float',nullable: false, unique:false})
    precio: number;

    // @Column({type: 'varchar',length: 50,nullable: false, unique:false})
    // descripcion: string;

    // @Column({type: 'float',nullable: false, unique:true})
    // sku: number;

    // @Column({type: 'varchar',length: 50,nullable: false, unique:false})
    // provedor: string;

    // @Column({type: 'varchar',length: 50,nullable: false, unique:false})
    // sucursal: string;

    @Column({type: 'varchar',length: 500,nullable: true})
    productImage: string;
}