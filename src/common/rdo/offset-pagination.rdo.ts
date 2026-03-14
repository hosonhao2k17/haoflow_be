import { Exclude } from "class-transformer";
import { OffsetPaginationDto } from "../dto/offset-pagination.dto";
import { ExposeField } from "src/decorators/field.decorator";

@Exclude()
export class OffsetPaginationRdo {

    @ExposeField()
    page: number;

    @ExposeField()
    limit: number;

    @ExposeField()
    offset: number;

    @ExposeField()
    totalPages: number;

    @ExposeField()
    totalRecords: number;

    @ExposeField()
    nextPage?: number;

    @ExposeField()
    previousPage?: number;

    constructor(totalRecords: number, offsetPaginationDto: OffsetPaginationDto) {

        this.nextPage = this.page < this.totalPages ? this.page + 1 : undefined;
        this.previousPage = this.page > 1 ? this.page - 1: undefined;
        this.totalRecords = totalRecords;
        this.page = offsetPaginationDto.page;
        this.limit = offsetPaginationDto.limit;
        this.offset = offsetPaginationDto.getOffset();
        this.totalPages = Math.ceil((this.totalRecords / this.limit));
    }
}