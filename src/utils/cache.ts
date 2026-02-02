import { CacheKey } from "src/common/constants/cache.constant";
import util from 'util';

export const createCacheKey = (key: CacheKey,...args: string[]): string => {
    return util.format(key, ...args)
}