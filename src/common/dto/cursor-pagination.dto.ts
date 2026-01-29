import { NumberField, StringField } from "src/decorators/field.decorator";
import { DEFAULT_LIMIT } from "../constants/default.constant";
import { AbstractQueryDto } from "./abstract-query.dto";


export class CursorPaginationDto extends AbstractQueryDto {
    protected alias: string;


    @NumberField({options: true})
    limit: number = DEFAULT_LIMIT;

    @StringField({options: true})
    afterCursor?: string;

    @StringField({options: true})
    beforeCursor?: string;


}