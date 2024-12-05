type NestedRecord<K extends string | number | symbol, V> = {
  [k in K]: V | NestedRecord<K, V>;
};

type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
