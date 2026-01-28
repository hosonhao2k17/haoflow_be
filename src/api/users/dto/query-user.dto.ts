import { Gender, SortOrder, UserStatus } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { ISearch } from "src/common/interfaces/search.interface";
import { ISort } from "src/common/interfaces/sort.interface";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";
import { FilterUserDto } from "./filter-user.dto";
import { plainToInstance, Transform, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";



export class QueryUserDto extends OffsetPaginationDto implements ISort{

    
    @StringField({options: true})
    sortBy?: string;

    @StringField({options: true})
    sortOrder?: SortOrder;

    @ApiPropertyOptional({
        type: String,
        example: '{"fullName": "Nguyễn Văn A"}'
    })
    @Type(() => FilterUserDto)
    @IsOptional()
    @Transform(({value}) => value ? plainToInstance(FilterUserDto, JSON.parse(value)) : undefined)
    filters?: FilterUserDto;
    

}