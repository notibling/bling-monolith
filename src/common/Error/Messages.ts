
type IErrorMessage = [number, string];

class ErrorMessages {
  // * Crud Errors
  static NOT_FOUND_ENTITY = (entity: string): IErrorMessage =>
    [1001, `Not found entity::${entity}`];

  static FETCH_MISSING_FILTERS = (entity: string, fields: string[]): IErrorMessage =>
    [1002, `Fetch ${entity} missing filters: ${fields.join(', ')}`]


  static FIND_MISSING_FILTERS = (entity: string, fields: string[]): IErrorMessage =>
    [1002, `Find ${entity} missing filters: ${fields.join(', ')}`]


  static CREATE_MISSING_FIELDS = (entity: string, fields: string[]): IErrorMessage =>
    [1002, `Create ${entity} missing fields: ${fields.join(', ')}`]

  static UPDATE_MISSING_FIELDS = (entity: string, fields: string[]): IErrorMessage =>
    [1003, `Update ${entity} missing fields: ${fields.join(', ')}`]

  static DELETE_MISSING_FIELDS = (entity: string, fields: string[]): IErrorMessage =>
    [1004, `Delete ${entity} missing fields: ${fields.join(', ')}`];


  // * Auth Errors
  static NOT_AUTHORIZED = (entity: string): IErrorMessage =>
    [2001, `Not authorized to access entity::${entity}`];

  static INVALID_CREDENTIALS = (description: string): IErrorMessage =>
    [2002, `Invalid credentials :: ${description}`];


  // * Generic Errors
  static GENERIC = (name: string, description?: string): IErrorMessage =>
    [3001, `Generic error :: ${name} :: ${description ?? ''}`];
}

export { ErrorMessages, IErrorMessage }