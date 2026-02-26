import { SortOrder } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryTaskDto extends OffsetPaginationDto {

    protected alias: string = 'task';

    @UuidField({options: true})
    dailyPlanId?: string;

    @StringField({options: true})
    sortBy?: string = 'startTime';

    @EnumField(SortOrder,{options: true})
    sortOrder?: SortOrder = SortOrder.ASC;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.dailyPlanId) {
            queryBuilder.andWhere(`${this.alias}.dailyPlanId = :dailyPlanId`,{dailyPlanId: this.dailyPlanId});
        }

    }
}