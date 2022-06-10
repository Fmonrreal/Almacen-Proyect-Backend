import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotocicletasController } from './motocicletas.controller';
import { MotocicletasEntity } from './motocicletas.entity';
import { MotocicletasService } from './motocicletas.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([MotocicletasEntity]),
        ],
      controllers: [MotocicletasController],
      providers: [MotocicletasService]

})
export class MotocicletasModule {}
