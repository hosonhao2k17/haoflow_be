import { NumberField } from "src/decorators/field.decorator";

export class OffsetPaginationDto {

    @NumberField({options: true})
    page: number;

    @NumberField({options: true})
    limit: number;

    getOffset(): number {
        return (this.page - 1 ) *  this.limit;
    }
}