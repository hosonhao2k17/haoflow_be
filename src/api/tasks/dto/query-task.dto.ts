import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryTaskDto extends OffsetPaginationDto {

    protected alias: string = 'task';

    @UuidField({options: true})
    dailyPlanId?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.dailyPlanId) {
            queryBuilder.andWhere(`${this.alias}.dailyPlanId = :dailyPlanId`,{dailyPlanId: this.dailyPlanId});
        }

    }
}