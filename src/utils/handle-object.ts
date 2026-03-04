


export function classToTypeString<T extends object>(instance: T, separator = '-'): string {
    return Object.entries(instance)
        .map(([key, value]) => {
            if (value instanceof Date) {
                return `${key}:date`;
            }
            if (typeof value === 'object' && value !== null) {
                const values = Object.values(value).join(',');
                return `${key}:ENUM[${values}]`;
            }
            return `${key}:${typeof value}`;
        })
        .join(separator);
}