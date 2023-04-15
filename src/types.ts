export type KeyOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
};

export type KeysOfType<T, U> = KeyOfType<T, U>[keyof T];
