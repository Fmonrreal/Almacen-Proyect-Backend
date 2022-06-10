import { EntityRepository,Repository } from "typeorm";
import { ArticleprovEntity } from "./articleprov.entity";

@EntityRepository(ArticleprovEntity)
export class ArticleprovsEntity extends Repository<ArticleprovEntity>{


}