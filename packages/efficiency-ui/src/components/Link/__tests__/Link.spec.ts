import Link from '../Link';

import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('Link', () => {
  // mount
  test('mount', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      }
    });

    expect(wrapper.text()).toBe('Link');
  });
});

describe('type', () => {
  // mount
  test('default', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      }
    });

    expect(wrapper.classes()).toContain('ef-link--type-default');
  });
  test('primary', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      },
      props: {
        type: 'primary'
      }
    });

    expect(wrapper.classes()).toContain('ef-link--type-primary');
  });
});

describe('disabled', () => {
  test('disabled:true', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      },
      props: {
        disabled: true
      }
    });

    expect(wrapper.classes()).toContain('ef-disabled');
  });
});
describe('underline', () => {
  test('underline:true', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      },
      props: {
        underline: true
      }
    });

    expect(wrapper.classes()).toContain('ef-link__underline');
  });
});
describe('target', () => {
  test('default', () => {
    const wrapper = shallowMount(Link, {
      slots: {
        default: 'Link'
      }
    });

    expect(wrapper.attributes().target).toBe('_blank');
  });
});
