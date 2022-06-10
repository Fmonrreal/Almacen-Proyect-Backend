import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosEntity } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';



@Module({
    imports: [
        TypeOrmModule.forFeature([UsuariosEntity]),
        ],
      controllers: [UsuariosController],
      providers: [UsuariosService]
})
export class UsuariosModule {}
