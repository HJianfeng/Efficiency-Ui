import { describe, expect, it } from 'vitest';
import { addUnit } from '../style';

describe('addUnit', () => {
  it('default', () => {
    const value = 12;
    expect(addUnit(value)).toBe('12px');
  });
  it('empty', () => {
    expect(addUnit()).toBe('');
  });
  it('string', () => {
    const value = '12';
    expect(addUnit(value)).toBe('12');
  });
});
