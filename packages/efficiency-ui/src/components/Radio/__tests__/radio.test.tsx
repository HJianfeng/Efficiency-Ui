// @ts-nocheck
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, test } from 'vitest';
import Radio from '../radio.vue';
import RadioGroup from '../radio-group.vue';
import RadioButton from '../radio-button.vue';

describe('Radio', () => {
  test('create', async () => {
    const radio = ref('');
    const wrapper = mount(() => <Radio v-model={radio.value} label="a" />);
    expect(wrapper.classes()).toContain('ef-radio');
    await wrapper.find('.ef-radio__original').trigger('change');
    expect(wrapper.classes()).toContain('is-checked');
  });

  test('disabled', async () => {
    const radio = ref('');
    const wrapper = mount(() => (
      <Radio v-model={radio.value} label="3" disabled />
    ));
    await wrapper.find('.ef-radio__original').trigger('change');
    expect(radio.value).toBe('');
    expect(wrapper.classes()).toContain('is-disabled');
  });

  test('change event', async () => {
    const radio = ref('');
    const changeData = ref('');
    function handleChange(val: string) {
      changeData.value = val;
    }
    const wrapper = mount(() => (
      <Radio v-model={radio.value} label="3" onChange={handleChange} />
    ));
    await wrapper.find('.ef-radio__original').trigger('change');
    await nextTick();
    expect(changeData.value).toEqual('3');
  });

  test('change event only triggers on user input', async () => {
    const radio = ref('');
    const changeData = ref('');
    function handleChange(val: string) {
      changeData.value = val;
    }
    mount(() => (
      <Radio v-model={radio.value} label="3" onChange={handleChange} />
    ));
    radio.value = '3';
    await nextTick();
    expect(changeData.value).toEqual('');
    expect(radio.value).toEqual('3');
  });
});

describe('Radio group', () => {
  it('create', async () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value}>
        <Radio label={3} ref="radio1">
          3
        </Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));
    await nextTick();
    const [radio1, radio2] = wrapper.findAll('.ef-radio');
    expect(radio1.classes()).toContain('is-checked');
    await radio2.find('.ef-radio__original').trigger('change');
    expect(radio2.classes()).toContain('is-checked');
    expect(radio.value).toEqual(6);
  });

  it('id auto derive', async () => {
    const radioValue1 = ref(3);
    const wrapper1 = mount(() => (
      <RadioGroup v-model={radioValue1.value}>
        <Radio label={3} ref="radio1">
          3
        </Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));

    const radioValue2 = ref(3);
    const wrapper2 = mount(() => (
      <RadioGroup v-model={radioValue2.value}>
        <Radio label={3} ref="radio1">
          3
        </Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));

    const id1 = wrapper1.find('.ef-radio').find('input').attributes('name');
    const id2 = wrapper2.find('.ef-radio').find('input').attributes('name');

    expect(id1).not.toEqual(id2);
  });

  it('disabled', async () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} disabled>
        <Radio label={3} ref="radio1">
          3
        </Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));
    expect(wrapper.find('label.is-disabled').exists()).toBe(true);

    const [radio1, radio2] = wrapper.findAll('.ef-radio');
    expect(radio1.classes()).toContain('is-checked');
    await radio2.find('.ef-radio__original').trigger('change');
    expect(radio.value).toEqual(3);
    expect(radio1.classes()).toContain('is-checked');
  });
  it('change event', async () => {
    const radio = ref(3);
    const data = ref(0);
    function onChange(val: number) {
      data.value = val;
    }
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} onChange={onChange}>
        <Radio label={3} ref="radio1">
          3
        </Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));
    const radio2 = wrapper.findAll('.ef-radio')[1];
    await radio2.find('input').trigger('change');
    await nextTick();
    expect(data.value).toEqual(6);
  });
  it('change event only triggers on user input', async () => {
    const radio = ref(3);
    const data = ref(0);
    function onChange(val: number) {
      data.value = val;
    }
    mount(() => (
      <RadioGroup v-model={radio.value} onChange={onChange}>
        <Radio label={3}>3</Radio>
        <Radio label={6} ref="radio2">
          6
        </Radio>
        <Radio label={9}>9</Radio>
      </RadioGroup>
    ));

    radio.value = 6;
    await nextTick();
    expect(data.value).toEqual(0);
  });
  it('disabled when children is radio button', async () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} disabled>
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));

    const [radio1, radio2] = wrapper.findAll('.ef-radio-button');
    expect(radio1.classes()).toContain('is-active');
    expect(wrapper.findAll('.is-disabled').length).toBe(3);
    await radio2.find('input').trigger('change');
    expect(radio.value).toEqual(3);
    expect(radio1.classes()).toContain('is-active');
  });
});

describe('Radio Button', () => {
  it('create', async () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value}>
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));
    const [radio1, radio2] = wrapper.findAll('.ef-radio-button');
    expect(radio1.classes()).toContain('is-active');
    await radio2.find('input').trigger('change');
    expect(radio2.classes()).toContain('is-active');
    expect(radio.value).toEqual(6);
  });
  it('custom color', () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} fill="#000" text-color="#ff0">
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));
    const radio1 = wrapper.find('.ef-radio-button');

    expect(radio1.find('span').attributes('style')).toContain(
      'background-color: #000; border-color: #000; box-shadow: -1px 0 0 0 #000; color: #ff0;'
    );
  });
  it('change event', async () => {
    const radio = ref(3);
    const data = ref(0);
    function onChange(val: number) {
      data.value = val;
    }
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} onChange={onChange}>
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));
    const radio2 = wrapper.findAll('.ef-radio-button')[1];
    await radio2?.find('input').trigger('change');
    expect(radio.value).toEqual(6);
  });
  it('change event only triggers on user input', async () => {
    const radio = ref(3);
    const data = ref(0);
    function onChange(val: number) {
      data.value = val;
    }
    mount(() => (
      <RadioGroup v-model={radio.value} onChange={onChange}>
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));

    radio.value = 6;
    await nextTick();
    expect(data.value).toEqual(0);
  });

  it('size', () => {
    const radio = ref(3);
    const wrapper = mount(() => (
      <RadioGroup v-model={radio.value} size="large">
        <RadioButton label={3} ref="radio1">
          3
        </RadioButton>
        <RadioButton label={6} ref="radio2">
          6
        </RadioButton>
        <RadioButton label={9}>9</RadioButton>
      </RadioGroup>
    ));
    expect(wrapper.findAll('.ef-radio-button-large').length).toBe(3);
  });
});
