import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useNamespace } from '..';
import type { VueWrapper } from '@vue/test-utils';

const TestComp = defineComponent({
  setup() {
    const ns = useNamespace('table');
    const cssVar = ns.cssVar({
      'border-style': 'solid',
      'border-width': ''
    });
    const cssVarBlock = ns.cssVarBlock({
      'text-color': '#409eff',
      'active-color': ''
    });
    return () => (
      <div
        id="testId"
        class={[
          ns.b(), // return ns + block
          ns.b('body'),
          ns.e('content'),
          ns.m('active'),
          ns.be('content', 'active'),
          ns.em('content', 'active'),
          ns.bem('body', 'content', 'active'),
          ns.is('focus'),
          ns.e(), // return empty string
          ns.m(), // return empty string
          ns.be(), // return empty string
          ns.em(), // return empty string
          ns.bem(), // return empty string
          ns.is('hover', undefined), // return empty string
          ns.is('clicked', false) // return empty string
        ]}
        style={{ ...cssVar, ...cssVarBlock }}
      >
        text
      </div>
    );
  }
});

describe('use-locale', () => {
  const Comp = defineComponent({
    setup(_props, { slots }) {
      return () => slots.default?.();
    }
  });
  let wrapper: VueWrapper<InstanceType<typeof Comp>>;
  beforeEach(() => {
    wrapper = mount(Comp, {
      slots: { default: () => <TestComp /> }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should provide bem correctly', async () => {
    await nextTick();
    expect(wrapper.find('#testId').classes()).toEqual([
      'ef-table', // b()
      'ef-table-body', // b('body')
      'ef-table__content', // e('content')
      'ef-table--active', // m('active')
      'ef-table-content__active', // be('content', 'active')
      'ef-table__content--active', // em('content', 'active')
      'ef-table-body__content--active', // bem('body', 'content', 'active')
      'is-focus' // is('focus')
    ]);

    const style = wrapper.find('#testId').attributes('style');
    expect(style).toMatch('--ef-border-style: solid;');
    expect(style).not.toMatch('--ef-border-width:');
    expect(style).toMatch('--ef-table-text-color: #409eff;');
    expect(style).not.toMatch('--ef-table-active-color:');
  });
});
