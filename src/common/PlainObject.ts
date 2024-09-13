type PlainObject<T> = {
  [K in keyof T as T[K] extends Function ? never : K]:
  T[K] extends Record<string, unknown>
  ? PlainObject<T[K]>
  : T[K] extends Array<infer U>
  ? Array<PlainObject<U>>
  : T[K] extends Array<infer U> | undefined
  ? Array<PlainObject<U>> | undefined
  : T[K];
};


export { PlainObject };