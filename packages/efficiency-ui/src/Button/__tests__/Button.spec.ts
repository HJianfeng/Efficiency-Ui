import Button from '../Button';

import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
// 测试分组
describe('Button', () => {
  // mount
  test('mount', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      }
    });

    // 断言
    expect(wrapper.text()).toBe('Button');
  });
});
describe('type', () => {
  test('default', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      }
    });

    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('ef-button--type-primary')
    ).toBe(true);
  });

  test('info', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      },
      props: {
        type: 'info'
      }
    });
    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('ef-button--type-info')
    ).toBe(true);
  });
});

describe('disabled', () => {
  test('default', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      },
      props: {
        disabled: true
      }
    });

    // 断言
    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('ef-disabled')
    ).toBe(true);
  });
});

describe('round', () => {
  test('default', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      }
    });

    // 断言
    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('rounded')
    ).toBe(true);
  });
  test('round:true', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      },
      props: {
        round: true
      }
    });
    // 断言
    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('rounded-full')
    ).toBe(true);
  });

  test('icon', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      },
      props: {
        icon: 'edit'
      }
    });

    expect(
      wrapper
        .find('i')
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('i-ic-baseline-edit')
    ).toBe(true);
  });
});
