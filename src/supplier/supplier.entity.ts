import { ArticleprovEntity } from "src/articleProv/articleprov.entity";
import {Entity,Column,PrimaryGeneratedColumn,OneToMany} from "typeorm";

@Entity("supplier")
export class SupplierEntity {
    @PrimaryGeneratedColumn()
    id_supplier: number;
    @OneToMany(() => ArticleprovEntity, articleprovEntity => articleprovEntity.fk4,{
        cascade:true,
    })
    articleprovEntity: ArticleprovEntity[];

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    razon: string;

    @Column({ unique: true, length: 250 })
    email: string;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    telefono: string;
    
    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    direccion: string;

    @Column({type: 'varchar',length: 100,nullable: false, unique:true})
    sku: string;



}

