import { describe, expect, it } from 'vitest';
import {
  isString,
  isNumber,
  isObject,
  isNil,
  isUndefined,
  isBoolean,
  isElement
} from '../types';

describe('types', () => {
  it('isString && number', () => {
    const value = 1;
    const obj = {};
    const el = document.createElement('a');
    expect(isString(value)).toBe(false);
    expect(isObject(obj)).toBe(true);
    expect(isNumber(value)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(1)).toBe(false);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isElement(false)).toBe(false);
    expect(isElement(el)).toBe(true);
  });
});
