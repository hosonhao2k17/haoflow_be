import { Type } from "class-transformer";
import { CursorPaginationRdo } from "./cursor-pagination.rdo";
import { ExposeField } from "src/decorators/field.decorator";


export class CursorPaginatedRdo<T> {

    @ExposeField()6
    items: T[];

    @ExposeField({
        classType: () => CursorPaginationRdo
    })
    pagination: CursorPaginationRdo;

    constructor(items: T[], pagination: CursorPaginationRdo) {
        this.items = items;
        this.pagination = pagination
    }

}