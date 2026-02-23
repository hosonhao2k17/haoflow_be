import { Expose } from "class-transformer";


export class CursorPaginationRdo {

    @Expose()
    limit: number;

    @Expose()
    afterCursor: string | null;

    @Expose()
    beforeCursor: string | null;

    @Expose()
    totalRecords: number;

    constructor(
        limit: number,
        afterCursor: string | null,
        beforeCursor: string | null,
        totalRecords: number
    ) {
        this.limit = limit;
        this.afterCursor = afterCursor;
        this.beforeCursor = beforeCursor;
        this.totalRecords = totalRecords;
    }
}