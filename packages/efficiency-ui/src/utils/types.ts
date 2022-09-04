import type { PropType } from 'vue';

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export const definePropType = <T>(val: any): PropType<T> => val;
export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T
) => val as Mutable<typeof val>;

export const isString = (data) => {
  return typeof data === 'string';
};

export const isNumber = (data) => {
  return typeof data === 'number';
};

export const isObject = (data) => {
  return typeof data === 'object' && !Array.isArray(data);
};
