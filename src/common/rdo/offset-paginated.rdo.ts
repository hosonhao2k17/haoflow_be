import { Exclude } from "class-transformer";
import { OffsetPaginationRdo } from "./offset-pagination.rdo";
import { ExposeField } from "src/decorators/field.decorator";

@Exclude()
export class OffsetPaginatedRdo<T> {

    @ExposeField()
    items: T[];

    @ExposeField({
        classType: () => OffsetPaginationRdo
    })
    pagination: OffsetPaginationRdo;

    constructor(items: T[], pagination: OffsetPaginationRdo) {
        this.items = items;
        this.pagination = pagination;
    }

}