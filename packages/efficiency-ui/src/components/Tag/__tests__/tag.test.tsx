import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Tag from '../tag.vue';

const AXIOM = 'Rem is the best girl';

describe('Tag.vue', () => {
  test('render text & class', async () => {
    const wrapper = mount(() => <Tag>{AXIOM}</Tag>);
    expect(wrapper.text()).toEqual(AXIOM);
    expect(wrapper.find('span').classes('ef-tag')).toEqual(true);
    expect(wrapper.find('span').classes('ef-tag__close')).toEqual(false);
    expect(wrapper.find('span').classes('is-hit')).toEqual(false);
    expect(wrapper.find('span').classes('md-fade-center')).toEqual(false);
  });

  test('type', () => {
    const wrapper = mount(() => <Tag type="success" />);

    expect(wrapper.find('span').classes('ef-tag--success')).toEqual(true);
  });

  test('hit', () => {
    const wrapper = mount(() => <Tag hit={true} />);

    expect(wrapper.find('span').classes('is-hit')).toEqual(true);
  });

  test('closable', async () => {
    const wrapper = mount(() => <Tag closable={true} />);
    const comp = wrapper.getComponent(Tag);
    const closeBtn = comp.find('.ef-tag .ef-tag__close');
    expect(closeBtn.exists()).toBe(true);

    await closeBtn.trigger('click');
    expect(comp.emitted().close).toBeTruthy();
  });

  test('closeTransition', () => {
    const wrapper = mount(() => <Tag closeTransition={true} />);

    expect(wrapper.find('span').classes('md-fade-center')).toEqual(false);
  });

  test('color', () => {
    const wrapper = mount(() => (
      <Tag disableTransitions color="rgb(0, 0, 0)" />
    ));
    const vm = wrapper.vm;
    expect(vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)');
  });

  test('theme', () => {
    const wrapper = mount(() => <Tag disableTransitions effect="dark" />);
    const vm = wrapper.vm;
    const el = vm.$el;
    expect(el.className.includes('ef-tag--dark')).toEqual(true);
    expect(el.className.includes('ef-tag--light')).toEqual(false);
    expect(el.className.includes('ef-tag--plain')).toEqual(false);
  });

  // should also support large size
  test('size', () => {
    const wrapper = mount(() => <Tag disableTransitions size="large" />);
    const vm = wrapper.vm;
    const el = vm.$el;
    expect(el.className.includes('ef-tag--large')).toEqual(true);
    expect(el.className.includes('ef-tag--default')).toEqual(false);
    expect(el.className.includes('ef-tag--small')).toEqual(false);
  });
});
