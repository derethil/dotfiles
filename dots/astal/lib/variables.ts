import { Variable } from "astal";

export type VariableArray<T> = Variable<T[]> & {
  push: (value: T) => void;
  remove: (value: T) => void;
};

export function VariableArray<T>(initial: T[]): VariableArray<T> {
  const variable = Variable<T[]>(initial);

  const push = (value: T) => {
    variable.set([...variable.get(), value]);
  };

  const remove = (value: T) => {
    variable.set(variable.get().filter((item) => item !== value));
  };

  Object.assign(variable, { push, remove });

  return variable as VariableArray<T>;
}
