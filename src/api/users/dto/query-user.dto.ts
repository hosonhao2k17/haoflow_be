import { Gender, SortOrder, UserStatus } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { ISearch } from "src/common/interfaces/search.interface";
import { ISort } from "src/common/interfaces/sort.interface";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";

import { plainToInstance, Transform, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";



export class QueryUserDto {

    

}