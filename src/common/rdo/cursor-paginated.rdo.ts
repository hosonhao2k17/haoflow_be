import { Expose, Type } from "class-transformer";
import { CursorPaginationRdo } from "./cursor-pagination.rdo";


export class CursorPaginatedRdo<T> {

    @Expose()
    items: T[];

    @Expose()
    @Type(() => CursorPaginationRdo)
    pagination: CursorPaginationRdo;

    constructor(items: T[], pagination: CursorPaginationRdo) {
        this.items = items;
        this.pagination = pagination
    }

}