import { Exclude, Expose, Type } from "class-transformer";
import { OffsetPaginationRdo } from "./offset-pagination.rdo";

@Exclude()
export class OffsetPaginatedRdo<T> {

    @Expose()
    items: T[];

    @Expose()
    pagination: OffsetPaginationRdo;

    constructor(items: T[], pagination: OffsetPaginationRdo) {
        this.items = items;
        this.pagination = pagination;
    }

}