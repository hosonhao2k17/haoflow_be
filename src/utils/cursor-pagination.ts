import { DEFAULT_FIELD_CURSOR } from "src/common/constants/default.constant";

export const getBeforeCursor = (objects: Record<string, any>[], fieldCursor: string = DEFAULT_FIELD_CURSOR) => {
    return objects[0][fieldCursor]
}

export const getAfterCursor = (objects: Record<string, any>, fieldCursor: string = DEFAULT_FIELD_CURSOR) => {
    return objects[objects.length - 1][fieldCursor];
}