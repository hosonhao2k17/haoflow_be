


export function classToTypeString<T extends object>(instance: T, separator = '-'): string {
    return Object.entries(instance)
        .map(([key, value]) => `${key}:${typeof value}`)
        .join(separator);
}