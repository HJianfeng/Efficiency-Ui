import { describe, expect, it } from 'vitest';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT, INPUT_EVENT } from '../const/event';

describe('consts', () => {
  it('default', () => {
    expect(UPDATE_MODEL_EVENT).toBe('update:modelValue');
    expect(CHANGE_EVENT).toBe('change');
    expect(INPUT_EVENT).toBe('input');
  });
});
