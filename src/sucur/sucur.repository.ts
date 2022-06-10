import { EntityRepository, Repository } from 'typeorm';
import { SucurEntity } from './sucur.entity';

@EntityRepository(SucurEntity)
export class SucursEntity extends Repository<SucurEntity>{}