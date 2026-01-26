

export const getConstantKey = (entity: object, value: any): string => {

    return Object.keys(entity)[Object.values(entity).indexOf(value)]
}