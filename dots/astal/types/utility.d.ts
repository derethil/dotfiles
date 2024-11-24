type NestedRecord<K extends string | number | symbol, V> = {
  [k in K]: V | NestedRecord<K, V>;
};
