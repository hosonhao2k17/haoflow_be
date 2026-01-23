import { NumberField } from "src/decorators/field.decorator";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/default.constant";

export class OffsetPaginationDto {

    @NumberField({options: true, swaggerOptions: {required: false}})
    page: number = DEFAULT_PAGE;

    @NumberField({options: true, swaggerOptions: {required: false}})
    limit: number = DEFAULT_LIMIT;

    getOffset(): number {
        return (this.page - 1 ) *  this.limit;
    }
}