import { ExposeField } from "src/decorators/field.decorator";


export class CursorPaginationRdo {

    @ExposeField()
    limit: number;

    @ExposeField()
    afterCursor: string | null;

    @ExposeField()
    beforeCursor: string | null;

    @ExposeField()
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