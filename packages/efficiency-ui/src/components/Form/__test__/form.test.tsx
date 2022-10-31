import { nextTick, reactive, ref } from 'vue';
import { mount, config } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { VueWrapper } from '@vue/test-utils';

import Form from '../form.vue';
import FormItem from '../form-item.vue';
import Input from '../../Input/input.vue';

const stylePlugin = (wrapper: any) => {
  return {
    style: wrapper.element.style
  };
};
const findStyle = (wrapper: VueWrapper<any>, selector: string) =>
  wrapper.find<HTMLElement>(selector).element.style;
describe('Form', () => {
  beforeAll(() => {
    config.plugins.DOMWrapper.install(stylePlugin);
    config.plugins.VueWrapper.install(stylePlugin);
  });
  it('label width', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({ name: '' });
        return () => (
          <Form ref="form" model={form} labelWidth="80px">
            <FormItem label="Activity Name">
              <Input v-model={form.name} />
            </FormItem>
          </Form>
        );
      }
    });

    expect(findStyle(wrapper, '.ef-form-item__label').width).toBe('80px');
  });

  it('auto label width', async () => {
    const labelPosition = ref('right');
    const wrapper = mount({
      setup() {
        const form = reactive({ name: '', intro: '' });
        return () => (
          <Form
            ref="form"
            model={form}
            labelWidth="auto"
            labelPosition={labelPosition.value}
          >
            <FormItem label="Name">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem label="introsasasas">
              <Input v-model={form.intro} />
            </FormItem>
          </Form>
        );
      }
    });

    await nextTick();

    const formItems = wrapper.findAll<HTMLElement>('.ef-form-item__content');

    const marginLeft = Number.parseInt(
      formItems[0].element.style.marginLeft,
      10
    );
    const marginLeft1 = Number.parseInt(
      formItems[1].element.style.marginLeft,
      10
    );
    expect(marginLeft).toEqual(marginLeft1);
    labelPosition.value = 'left';
    await nextTick();

    const formItems1 = wrapper.findAll<HTMLElement>('.ef-form-item__content');
    const marginRight = Number.parseInt(
      formItems1[0].element.style.marginRight,
      10
    );
    const marginRight1 = Number.parseInt(
      formItems1[1].element.style.marginRight,
      10
    );
    expect(marginRight).toEqual(marginRight1);
  });

  it('form-item auto label width', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          region: '',
          type: ''
        });
        return () => (
          <Form
            ref="form"
            labelPosition="right"
            labelWidth="150px"
            model={form}
          >
            <FormItem label="名称">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem label="活动区域" label-width="auto">
              <Input v-model={form.region} />
            </FormItem>
            <FormItem
              label="活动形式(我是一个很长很长很长很长的label)"
              label-width="auto"
            >
              <Input v-model={form.type} />
            </FormItem>
          </Form>
        );
      }
    });

    await nextTick();

    const formItemLabels = wrapper.findAll<HTMLElement>('.ef-form-item__label');
    const formItemLabelWraps = wrapper.findAll<HTMLElement>(
      '.ef-form-item__label-wrap'
    );

    const labelWrapMarginLeft1 = formItemLabelWraps[0].element.style.marginLeft;
    const labelWrapMarginLeft2 = formItemLabelWraps[1].element.style.marginLeft;
    expect(labelWrapMarginLeft1).toEqual(labelWrapMarginLeft2);
    expect(labelWrapMarginLeft2).toEqual('');

    const labelWidth0 = Number.parseInt(
      formItemLabels[0].element.style.width,
      10
    );
    expect(labelWidth0).toEqual(150);
    const labelWidth1 = formItemLabels[1].element.style.width;
    const labelWidth2 = formItemLabels[2].element.style.width;
    expect(labelWidth1).toEqual(labelWidth2);
    expect(labelWidth2).toEqual('auto');
  });

  it('inline form', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: ''
        });
        return () => (
          <Form ref="form" model={form} inline>
            <FormItem>
              <Input v-model={form.name} />
            </FormItem>
            <FormItem>
              <Input v-model={form.address} />
            </FormItem>
          </Form>
        );
      }
    });
    expect(wrapper.classes()).toContain('ef-form--inline');
  });

  it('label position', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: ''
        });
        return () => (
          <div>
            <Form model={form} labelPosition="top" ref="labelTop">
              <FormItem>
                <Input v-model={form.name} />
              </FormItem>
              <FormItem>
                <Input v-model={form.address} />
              </FormItem>
            </Form>
            <Form model={form} labelPosition="left" ref="labelLeft">
              <FormItem>
                <Input v-model={form.name} />
              </FormItem>
              <FormItem>
                <Input v-model={form.address} />
              </FormItem>
            </Form>
            <Form model={form} ref="labelRight">
              <FormItem>
                <Input v-model={form.name} />
              </FormItem>
              <FormItem>
                <Input v-model={form.address} />
              </FormItem>
            </Form>
          </div>
        );
      }
    });
    expect(wrapper.findComponent({ ref: 'labelTop' }).classes()).toContain(
      'ef-form--label-top'
    );
    expect(wrapper.findComponent({ ref: 'labelLeft' }).classes()).toContain(
      'ef-form--label-left'
    );
    expect(wrapper.findComponent({ ref: 'labelRight' }).classes()).toContain(
      'ef-form--label-right'
    );
  });

  it('label size', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: ''
        });
        return () => (
          <div>
            <div>
              <Form model={form} size="small" ref="labelSmall">
                <FormItem>
                  <Input v-model={form.name} />
                </FormItem>
              </Form>
            </div>
          </div>
        );
      }
    });
    expect(wrapper.findComponent(FormItem).classes()).toContain(
      'ef-form-item--small'
    );
  });

  it('show message', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: ''
        });
        return () => (
          <Form model={form} ref="form">
            <FormItem
              label="Name"
              prop="name"
              showMessage={false}
              rules={{
                required: true,
                message: 'Please input name',
                trigger: 'change',
                min: 3,
                max: 6
              }}
            >
              <Input v-model={form.name} />
            </FormItem>
          </Form>
        );
      }
    });
    const form = wrapper.findComponent(Form).vm;

    vi.useFakeTimers();
    const valid = await form
      .validate()
      .then(() => true)
      .catch(() => false);
    vi.runAllTimers();
    vi.useRealTimers();

    await nextTick();
    expect(valid).toBe(false);
    expect(wrapper.find('.ef-form-item__error').exists()).toBe(false);
  });

  it('reset field', async () => {
    vi.useFakeTimers();
    const form = reactive({
      name: '',
      address: ''
    });

    const wrapper = mount({
      setup() {
        const rules = {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change'
            }
          ]
        };
        return () => (
          <Form ref="form" model={form} rules={rules}>
            <FormItem label="name" prop="name">
              <Input v-model={form.name} ref="fieldName" />
            </FormItem>
            <FormItem label="address" prop="address">
              <Input v-model={form.address} ref="fieldAddr" />
            </FormItem>
          </Form>
        );
      }
    });

    form.name = 'jack';
    form.address = 'aaaa';

    const formRef = wrapper.findComponent({ ref: 'form' }).vm;
    formRef.resetFields();
    // first await waits for the validation to be dispatched.
    await nextTick();
    // after validation dispatched, it will update `validateStateDebounced` with a 100ms delay.
    // That's why we put this `vi.runAllTimers` here.
    vi.runAllTimers();
    // after timer fired, we should wait for the UI to be updated.
    await nextTick();
    expect(form.name).toBe('');
    expect(form.address).toBe('');
    expect(wrapper.findAll('.ef-form-item__error')).toHaveLength(0);
    vi.useRealTimers();
  });

  it('clear validate', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: ''
        });

        const rules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change'
            }
          ]
        });

        return () => (
          <Form ref="form" model={form} rules={rules}>
            <FormItem label="name" prop="name" ref="name">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem label="address" prop="address" ref="address">
              <Input v-model={form.address} />
            </FormItem>
          </Form>
        );
      }
    });

    const form = wrapper.findComponent({ ref: 'form' }).vm;
    const nameField = wrapper.findComponent({ ref: 'name' }).vm;
    const addressField = wrapper.findComponent({ ref: 'address' }).vm;
    await form.validate().catch(() => undefined);
    await nextTick();
    expect(nameField.validateMessage).toBe('Please input name');
    expect(addressField.validateMessage).toBe('Please input address');
    form.clearValidate(['name']);
    await nextTick();
    expect(nameField.validateMessage).toBe('');
    expect(addressField.validateMessage).toBe('Please input address');
    form.clearValidate();
    await nextTick();
    expect(addressField.validateMessage).toBe('');
  });

  it('scroll to field', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <Form ref="form">
              <FormItem prop="name" ref="formItem">
                <Input />
              </FormItem>
            </Form>
          </div>
        );
      }
    });

    const oldScrollIntoView = window.HTMLElement.prototype.scrollIntoView;

    const scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = function () {
      scrollIntoViewMock(this);
    };

    const form = wrapper.findComponent({ ref: 'form' }).vm;
    form.scrollToField('name');
    expect(scrollIntoViewMock).toHaveBeenCalledWith(
      wrapper.findComponent({ ref: 'formItem' }).element
    );

    window.HTMLElement.prototype.scrollIntoView = oldScrollIntoView;
  });

  it('validate return parameters', async () => {
    const form = reactive({
      name: 'test',
      age: ''
    });

    const wrapper = mount({
      setup() {
        const rules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          age: [
            { required: true, message: 'Please input age', trigger: 'blur' }
          ]
        });
        return () => (
          <Form
            ref="formRef"
            model={form}
            rules={rules}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            onSubmit="return false"
          >
            <FormItem prop="name" label="name">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem prop="age" label="age">
              <Input v-model={form.age} />
            </FormItem>
          </Form>
        );
      }
    });
    const vm = wrapper.vm;

    function validate() {
      return vm.$refs.formRef['validate']()
        .then(() => ({ valid: true, fields: undefined }))
        .catch((fields) => ({ valid: false, fields }));
    }

    let res = await validate();
    expect(res.valid).toBe(false);
    expect(Object.keys(res.fields).length).toBe(1);
    form.name = '';
    await nextTick();

    res = await validate();
    expect(res.valid).toBe(false);
    expect(Object.keys(res.fields).length).toBe(2);

    form.name = 'test';
    form.age = 'age';
    await nextTick();
    res = await validate();
    expect(res.valid).toBe(true);
    expect(res.fields).toBe(undefined);
  });

  it('validate status', async () => {
    const form = reactive({
      age: '20'
    });

    const wrapper = mount({
      setup() {
        const rules = ref({
          age: [
            { required: true, message: 'Please input age', trigger: 'change' }
          ]
        });
        return () => (
          <Form ref="formRef" model={form} rules={rules.value}>
            <FormItem ref="age" prop="age" label="age">
              <Input v-model={form.age} />
            </FormItem>
          </Form>
        );
      }
    });

    await wrapper.vm.$refs.formRef['validate']().catch(() => undefined);
    const ageField = wrapper.findComponent({ ref: 'age' });
    expect(ageField.classes('is-success')).toBe(true);
    expect(ageField.classes()).toContain('is-success');
  });
});
