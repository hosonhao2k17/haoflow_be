import { Expose } from "class-transformer";


export class CursorPaginationRdo {

    @Expose()
    limit: number;

    @Expose()
    afterCursor: string;

    @Expose()
    beforeCursor: string;

    @Expose()
    totalRecords: number;

    constructor(
        limit: number,
        afterCursor: string,
        beforeCursor: string,
        totalRecords: number
    ) {
        this.limit = limit;
        this.afterCursor = afterCursor;
        this.beforeCursor = beforeCursor;
        this.totalRecords = totalRecords;
    }
}