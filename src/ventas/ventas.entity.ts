import { ClientesEntity } from "src/clientes/clientes.entity";
import { Detalles_ventasEntity } from "src/detalles_ventas/detalles_ventas.entity";
import { SucursalesEntity } from "src/sucursales/sucursales.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";


@Entity("ventas")
export class VentasEntity {
    @PrimaryGeneratedColumn()
    id_ventas: number;

    @Column({type: 'datetime', nullable: false})
    fecha: Date;
    
    @Column({type: 'int',width: 11,nullable: false})
    id_usuarios: number;

    @Column({type: 'int',width: 11,nullable: false})
    id_clientes: number;

    @Column({type: 'int',nullable: false})
    id_sucursales: number;

    @ManyToOne(() => UsuariosEntity, fk14 => fk14.ventasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_usuarios"})
    fk14: UsuariosEntity;

    @ManyToOne(() => ClientesEntity, fk15 => fk15.ventasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_clientes"})
    fk15: ClientesEntity;
    
    @ManyToOne(() => SucursalesEntity, fk13 => fk13.ventasEntity,{

        onDelete: "CASCADE",
    })
    @JoinColumn({name: "id_sucursales"})
    fk13: SucursalesEntity;
    
    @OneToMany(() => Detalles_ventasEntity, detalles_ventasEntity => detalles_ventasEntity.fk16,{
        cascade:true,
    })
    detalles_ventasEntity: Detalles_ventasEntity;
    

}

