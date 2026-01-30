export enum ErrorCode {
  // ===== Common =====
  COMMON_ERROR = 'common.validation.error',
  REQUIRED = 'common.validation.required',

  // ===== String =====
  STRING = 'field.validation.string',
  STRING_EMPTY = 'field.validation.string.empty',
  STRING_MIN_LENGTH = 'field.validation.string.min_length',
  STRING_MAX_LENGTH = 'field.validation.string.max_length',

  // ===== Number =====
  NUMBER = 'field.validation.number',
  NUMBER_MIN = 'field.validation.number.min',
  NUMBER_MAX = 'field.validation.number.max',
  NUMBER_INT = 'field.validation.number.int',

  // ===== Email =====
  EMAIL = 'field.validation.email',

  // ===== Boolean =====
  BOOLEAN = 'field.validation.boolean',

  // ===== Array =====
  ARRAY = 'field.validation.array',
  ARRAY_MIN_SIZE = 'field.validation.array.min_size',
  ARRAY_MAX_SIZE = 'field.validation.array.max_size',

  // ===== Enum =====
  ENUM = 'field.validation.enum',

  // ----- Role =====
  ROLE_NOT_FOUND = 'role.error.not_found',
  ROLE_NAME_EXISTS = 'role.error.name_exists',

  // ===== User =====
  USER_NOT_FOUND = 'user.error.not_found',

  // ===== Auth ===== 
  INVALID_LOGIN = 'auth.error.invalid_login'
}
