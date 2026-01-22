import { Exclude, Expose } from "class-transformer";
import { OffsetPaginationDto } from "../dto/offset-pagination.dto";

@Exclude()
export class OffsetPaginationRdo {

    @Expose()
    page: number;

    @Expose()
    limit: number;

    @Expose()
    offset: number;

    @Expose()
    totalPages: number;

    @Expose()
    totalRecords: number;

    @Expose()
    nextPage?: number;

    @Expose()
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