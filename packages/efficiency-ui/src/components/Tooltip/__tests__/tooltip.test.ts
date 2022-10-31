import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EfPopperTrigger } from '../../Popper';
import Tooltip from '../tooltip.vue';

import type { VNode } from 'vue';
export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};
vi.mock('error', () => ({
  debugWarn: vi.fn()
}));

const AXIOM = 'Rem is the best girl';

describe('<EfTooltip />', () => {
  const createComponent = (props: any = {}, content: string | VNode = '') =>
    mount(Tooltip, {
      slots: {
        default: () => AXIOM,
        content: () => content
      },
      props,
      attachTo: document.body
    });

  let wrapper: ReturnType<typeof createComponent>;
  const findTrigger = () => wrapper.findComponent(EfPopperTrigger);

  afterEach(() => {
    wrapper?.unmount();
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('should render correctly', async () => {
      wrapper = createComponent();
      await nextTick();
      expect(findTrigger().text()).toContain(AXIOM);
    });
    it('content should teleport according appendTo', async () => {
      const el = document.createElement('div');
      el.id = 'test';
      document.body.appendChild(el);
      wrapper = createComponent({ appendTo: '#test' }, 'test appendTo props');
      await nextTick();
      const trigger$ = findTrigger();
      const triggerEl = trigger$.find('.ef-tooltip__trigger');
      await triggerEl.trigger('mouseenter');
      expect(document.querySelector('#test')?.innerHTML).toContain(
        'test appendTo props'
      );
    });
  });

  describe('functionality', () => {
    it('should be able to update popper content manually', async () => {
      wrapper = createComponent();
      await nextTick();

      const { vm } = wrapper;
      expect(vm.updatePopper).toBeDefined();
      vm.updatePopper();
    });
  });
});
