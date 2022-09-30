import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import RepeatClick from '../repeat-click';

let handler: ReturnType<typeof vi.fn>;
const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

const _mount = () =>
  mount(
    {
      setup() {
        handler = vi.fn();
        return () => (
          <div id="block" v-repeat-click={handler}>
            TEST
          </div>
        );
      }
    },
    {
      global: {
        directives: {
          RepeatClick
        }
      }
    }
  );

describe('Directives.vue', () => {
  it('click test', async () => {
    const wrapper = _mount();
    const block = wrapper.find('#block');

    block.trigger('mousedown');
    await sleep(330);
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(handler).toHaveBeenCalledTimes(3);
  });
});
