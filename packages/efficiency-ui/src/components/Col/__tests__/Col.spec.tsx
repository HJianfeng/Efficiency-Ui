import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, test } from 'vitest';
import Row from '../../Row/row.vue';
import Col from '../col.vue';

describe('Col', () => {
  it('create', () => {
    const wrapper = mount(Col);
    expect(wrapper.classes()).toContain('ef-col');
  });

  it('span', () => {
    const wrapper = mount(Col, {
      props: {
        span: 12
      }
    });
    expect(wrapper.classes()).toContain('ef-col-12');
  });

  it('pull', () => {
    const wrapper = mount(Col, {
      props: {
        span: 12,
        pull: 3
      }
    });
    expect(wrapper.classes()).toContain('ef-col-pull-3');
  });

  it('push', () => {
    const wrapper = mount(Col, {
      props: {
        span: 12,
        push: 3
      }
    });
    expect(wrapper.classes()).toContain('ef-col-push-3');
  });

  it('gutter', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Row gutter={20}>
            <Col span={12} ref="col"></Col>
          </Row>
        );
      }
    });
    const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement;
    expect(colElm.style.paddingLeft === '10px').toBe(true);
    expect(colElm.style.paddingRight === '10px').toBe(true);
  });

  it('change gutter value', async () => {
    const outer = ref(20);

    const wrapper = mount({
      setup() {
        return () => (
          <Row gutter={outer.value} ref="row">
            <Col span={12} ref="col" />
          </Row>
        );
      }
    });

    const rowElm = wrapper.findComponent({ ref: 'row' }).element as HTMLElement;
    const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement;
    expect(rowElm.style.marginLeft === '-10px').toBe(true);
    expect(rowElm.style.marginRight === '-10px').toBe(true);
    expect(colElm.style.paddingLeft === '10px').toBe(true);
    expect(colElm.style.paddingRight === '10px').toBe(true);

    outer.value = 40; // change gutter value
    await nextTick();
    expect(rowElm.style.marginLeft === '-20px').toBe(true);
    expect(rowElm.style.marginRight === '-20px').toBe(true);
    expect(colElm.style.paddingLeft === '20px').toBe(true);
    expect(colElm.style.paddingRight === '20px').toBe(true);
  });

  it('responsive', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Row gutter={20}>
            <Col
              ref="col"
              sm={{ span: 4, offset: 2 }}
              md={8}
              lg={{ span: 6, offset: 3 }}
            />
          </Row>
        );
      }
    });

    const colElmClass = wrapper.findComponent({ ref: 'col' }).classes();
    expect(colElmClass.includes('ef-col-sm-4')).toBe(true);
    expect(colElmClass.includes('ef-col-sm-4')).toBe(true);
    expect(colElmClass.includes('ef-col-sm-offset-2')).toBe(true);
    expect(colElmClass.includes('ef-col-lg-6')).toBe(true);
    expect(colElmClass.includes('ef-col-lg-offset-3')).toBe(true);
    expect(colElmClass.includes('ef-col-md-8')).toBe(true);
  });
});

describe('Row', () => {
  test('create', () => {
    const wrapper = mount(Row);
    expect(wrapper.classes()).toContain('ef-row');
  });

  test('gutter', () => {
    const wrapper = mount(Row, {
      props: {
        gutter: 20
      }
    });
    const rowElm = wrapper.element as HTMLElement;
    expect(rowElm.style.marginLeft).toEqual('-10px');
    expect(rowElm.style.marginRight).toEqual('-10px');
  });
  test('justify', () => {
    const wrapper = mount(Row, {
      props: {
        justify: 'end'
      }
    });
    expect(wrapper.classes()).toContain('justify-end');
  });
  test('align', () => {
    const wrapper = mount(Row, {
      props: {
        align: 'end'
      }
    });
    expect(wrapper.classes()).toContain('items-end');
  });
});
