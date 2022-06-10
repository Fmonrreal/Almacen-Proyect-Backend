import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvedoresController } from './provedores.controller';
import { ProvedoresEntity } from './provedores.entity';
import { ProvedoresService } from './provedores.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProvedoresEntity]),
        ],
      controllers: [ProvedoresController],
      providers: [ProvedoresService]
})
export class ProvedoresModule {}
