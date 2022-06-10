import { Module } from '@nestjs/common';
import { TipoController } from './tipo.controller';
import { TipoEntity } from './tipo.entity';
import { TipoService } from './tipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forFeature([TipoEntity]),
    ],
    controllers: [TipoController],
    providers: [TipoService]
})
export class TipoModule {}
