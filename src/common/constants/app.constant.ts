

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum RoleName {
    ADMIN = 'admin',
    USER = 'user'
}

export const SYSTEM = 'system'
export const RESPONSE_MESSAGE = 'response_message'
export enum ActionPermission {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}

export enum SubjectPermission {
    USER = 'user',
    ROLE = 'role',
    TASK = 'task'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export const PUBLIC_KEY = 'public_key'

export const REMOVE_REFRESH_TOKEN = 'remove_refresh_token'