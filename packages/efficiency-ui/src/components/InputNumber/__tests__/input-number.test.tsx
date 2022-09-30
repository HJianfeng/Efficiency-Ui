import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, test } from 'vitest';
import InputNumber from '../input-number.vue';

const mouseup = new Event('mouseup');

describe('InputNumber.vue', () => {
  test('create', async () => {
    const num = ref(1);
    const wrapper = mount(() => (
      <InputNumber label="描述文字" v-model={num.value} />
    ));
    expect(wrapper.find('input').exists()).toBe(true);
  });

  test('modelValue', () => {
    const inputText = ref(1);
    const wrapper = mount(() => <InputNumber modelValue={inputText.value} />);
    expect(wrapper.find('input').element.value).toEqual('1');
  });

  test('set modelValue undefined to display placeholder', async () => {
    const inputText = ref<number | undefined>(1);
    const wrapper = mount(() => (
      <InputNumber modelValue={inputText.value} placeholder="input number" />
    ));
    expect(wrapper.find('input').element.value).toEqual('1');
    inputText.value = undefined;
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('');
    expect(wrapper.find('input').element.getAttribute('aria-valuenow')).toEqual(
      'null'
    );
  });

  test('min', async () => {
    const num = ref(1);
    const wrapper = mount(() => <InputNumber min={3} v-model={num.value} />);
    expect(wrapper.find('input').element.value).toEqual('3');
    wrapper.find('.ef-input-number__decrease').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('3');
  });

  test('max', async () => {
    const num = ref(5);
    const wrapper = mount(() => <InputNumber max={3} v-model={num.value} />);
    expect(wrapper.find('input').element.value).toEqual('3');
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('3');
  });

  test('step, increase and decrease', async () => {
    const num = ref(0);
    const wrapper = mount(() => <InputNumber v-model={num.value} step={2} />);
    wrapper.find('.ef-input-number__decrease').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('-2');
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('0');
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('2');
  });

  test('step-strictly', async () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber step-strictly={true} step={2} v-model={num.value} />
    ));
    await wrapper.find('input').setValue(3);
    expect(wrapper.find('input').element.value).toEqual('4');
  });

  test('value decimals miss prop precision', async () => {
    const num = ref(0.2);
    const wrapper = mount(() => (
      <InputNumber step-strictly={true} step={0.1} v-model={num.value} />
    ));
    const efInputNumber = wrapper.findComponent({ name: 'EfInputNumber' }).vm;
    efInputNumber.increase();
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('0.3');
    num.value = 0.4;
    await nextTick();
    efInputNumber.decrease();
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('0.3');
  });

  describe('precision accuracy 2', () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber precision={2} v-model={num.value} />
    ));
    it.each([
      [1.1111111111, '1.11'],
      [17.275, '17.28'],
      [17.2745, '17.27'],
      [1.09, '1.09'],
      [1.009, '1.01'],
      [10.999, '11.00'],
      [15, '15.00'],
      [15.5, '15.50'],
      [15.555, '15.56']
    ])(
      'each precision accuracy test: $input $output',
      async (input, output) => {
        await wrapper.find('input').setValue(input);
        expect(wrapper.find('input').element.value).toEqual(`${output}`);
      }
    );
  });

  describe('precision accuracy 3', () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber precision={3} v-model={num.value} />
    ));
    it.each([
      [1.1111111111, '1.111'],
      [17.275, '17.275'],
      [17.2745, '17.275'],
      [1.09, '1.090'],
      [10.999, '10.999'],
      [10.9999, '11.000'],
      [15.555, '15.555'],
      [1.3335, '1.334']
    ])(
      'each precision accuracy test: $input $output',
      async (input, output) => {
        await wrapper.find('input').setValue(input);
        expect(wrapper.find('input').element.value).toEqual(`${output}`);
      }
    );
  });

  test('disabled', async () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber disabled={true} v-model={num.value} />
    ));
    wrapper.find('.ef-input-number__decrease').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('0');
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.find('input').element.value).toEqual('0');
  });

  test('controls', async () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber controls={false} v-model={num.value} />
    ));
    expect(wrapper.find('.ef-input-number__increase').exists()).toBe(false);
    expect(wrapper.find('.ef-input-number__decrease').exists()).toBe(false);
  });

  test('controls-position', async () => {
    const num = ref(0);
    const wrapper = mount(() => (
      <InputNumber controls-position="right" v-model={num.value} />
    ));
    expect(wrapper.find('.i-ic-outline-keyboard-arrow-down').exists()).toBe(
      true
    );
    expect(wrapper.find('.i-ic-round-keyboard-arrow-up').exists()).toBe(true);
  });

  test('change-event', async () => {
    const num = ref(0);
    const wrapper = mount(() => <InputNumber v-model={num.value} />);
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.getComponent(InputNumber).emitted('change')).toHaveLength(1);
    expect(wrapper.getComponent(InputNumber).emitted().change[0]).toEqual([
      1, 0
    ]);
    expect(wrapper.getComponent(InputNumber).emitted('input')).toHaveLength(1);
    expect(
      wrapper.getComponent(InputNumber).emitted('update:modelValue')
    ).toHaveLength(1);
    wrapper.find('.ef-input-number__increase').trigger('mousedown');
    document.dispatchEvent(mouseup);
    await nextTick();
    expect(wrapper.getComponent(InputNumber).emitted('change')).toHaveLength(2);
    expect(wrapper.getComponent(InputNumber).emitted().change[1]).toEqual([
      2, 1
    ]);
    expect(wrapper.getComponent(InputNumber).emitted('input')).toHaveLength(2);
    expect(
      wrapper.getComponent(InputNumber).emitted('update:modelValue')
    ).toHaveLength(2);
  });

  test('blur-event', async () => {
    const num = ref(0);
    const wrapper = mount(() => <InputNumber v-model={num.value} />);
    await wrapper.find('input').trigger('blur');
    expect(wrapper.getComponent(InputNumber).emitted('blur')).toHaveLength(1);
  });

  test('focus-event', async () => {
    const num = ref(0);
    const wrapper = mount(() => <InputNumber v-model={num.value} />);
    await wrapper.find('input').trigger('focus');
    expect(wrapper.getComponent(InputNumber).emitted('focus')).toHaveLength(1);
  });

  test('check increase and decrease button when modelValue not in [min, max]', async () => {
    const num1 = ref(-5);
    const num2 = ref(15);
    const wrapper = mount({
      setup() {
        return () => (
          <>
            <InputNumber
              ref="inputNumber1"
              v-model={num1.value}
              min={1}
              max={10}
            />
            <InputNumber
              ref="inputNumber2"
              v-model={num2.value}
              min={1}
              max={10}
            />
          </>
        );
      }
    });

    const inputNumber1 = wrapper.findComponent({ ref: 'inputNumber1' }).vm;
    const inputNumber2 = wrapper.findComponent({ ref: 'inputNumber2' }).vm;

    expect(num1.value).toBe(1);
    expect(num2.value).toBe(10);

    inputNumber1.decrease();
    await nextTick();
    expect(num1.value).toBe(1);
    inputNumber1.increase();
    await nextTick();
    expect(num1.value).toBe(2);
    inputNumber1.increase();
    await nextTick();
    expect(num1.value).toBe(3);

    inputNumber2.increase();
    await nextTick();
    expect(num2.value).toBe(10);
    inputNumber2.decrease();
    await nextTick();
    expect(num2.value).toBe(9);
    inputNumber2.decrease();
    await nextTick();
    expect(num2.value).toBe(8);
  });
});
