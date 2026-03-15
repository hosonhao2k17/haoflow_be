import { RangeRdo } from "./range.rdo";



export class RangedRdo<T> {

    items: T[];

    range: RangeRdo;

    constructor(items: T[], range: RangeRdo) {
        this.items = items;
        this.range = range;
    }

}