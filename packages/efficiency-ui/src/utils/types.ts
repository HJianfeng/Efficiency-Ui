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

export const isArray = (data) => {
  return typeof data === 'object' && Array.isArray(data);
};
export const isNil = (data) => {
  return data === null || data === undefined;
};
export const isUndefined = (data) => {
  return data === undefined;
};

export const isFunction = (data) => {
  return data && typeof data === 'function';
};
export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};
export const isBoolean = (data) => {
  return typeof data === 'boolean';
};

export const isPromise = (obj) => {
  return isObject(obj) && isFunction(obj.then) && isFunction(obj.catch);
};
