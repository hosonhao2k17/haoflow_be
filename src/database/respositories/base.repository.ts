import { requestContext } from "src/common/context/request.context";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
import { AbstractEntity } from "../entities/abstract.entity";



export class BaseRepository<T extends AbstractEntity> extends Repository<T> {


    private getUserId() {
        const context = requestContext.getStore();
        return context?.userId;
    }

    createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T> {
        const qb = super.createQueryBuilder(alias,queryRunner);
        const userId = this.getUserId();
        if(userId && alias) {
            qb.andWhere(`${alias}.createdBy = :createdBy`, { createdBy: userId });
        }
        return qb;
    }

    find(options?: FindManyOptions<T>) {
        return super.find({
            ...options,
            where: this.scopedWhere(options?.where as FindOptionsWhere<T>)
        });
    }

    findOne(options: FindOneOptions<T>) {
        return super.findOne({
            ...options,
            where: this.scopedWhere(options?.where as FindOptionsWhere<T>)
        });
    }

    findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
        return super.findOneBy(
            this.scopedWhere(where) as FindOptionsWhere<T> | FindOptionsWhere<T>[]
        );
    }

    private scopedWhere(
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[]
    ): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
        const userId = requestContext.getStore()?.userId;

        if (Array.isArray(where)) {
            return where.map(w => ({ ...w, createdBy: userId })) as FindOptionsWhere<T>[];
        }

        return { ...(where as object), createdBy: userId } as FindOptionsWhere<T>;
    }
}