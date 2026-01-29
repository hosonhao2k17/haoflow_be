import { Expose } from "class-transformer";
import { CursorPaginationRdo } from "./cursor-pagination.rdo";


export class CursorPaginatedRdo<T> {

    @Expose()
    items: T[];

    @Expose()
    pagination: CursorPaginationRdo;

    constructor(items: T[], pagination: CursorPaginationRdo) {
        this.items = items;
        this.pagination = pagination
    }

}