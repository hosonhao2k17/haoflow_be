import { IsEnum } from "class-validator";
import { SortOrder } from "src/common/constants/app.constant";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from "src/common/constants/default.constant";
import { RoleStatus } from "src/common/constants/status.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { ISearch } from "src/common/interfaces/search.interface";
import { ISort } from "src/common/interfaces/sort.interface";
import { EnumField, StringField } from "src/decorators/field.decorator";
import { ToUpperCase } from "src/decorators/transform.decorator";



export class QueryRoleDto extends OffsetPaginationDto implements ISort, ISearch {


    @EnumField(RoleStatus, {options: true, swaggerOptions: {
        enum: RoleStatus
    }})
    status?: RoleStatus;

    @StringField({options: true, swaggerOptions: {default: 'createdAt'}})
    sortBy: string = DEFAULT_SORT_BY;

    @ToUpperCase()
    @EnumField(SortOrder,{
        options: true, 
        swaggerOptions: {
            required: false, 
            default: SortOrder.DESC
        }
    })
    sortOrder: SortOrder = DEFAULT_SORT_ORDER;

    @StringField({options: true})
    keyword?: string;


}