// @ts-nocheck
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { FormItem } from '../../Form';
import Select from '../select.vue';
import Group from '../options-group.vue';
import Option from '../option.vue';

vi.mock('lodash-unified', async () => {
  return {
    ...((await vi.importActual('lodash-unified')) as Record<string, any>),
    debounce: vi.fn((fn) => {
      fn.cancel = vi.fn();
      fn.flush = vi.fn();
      return fn;
    })
  };
});

interface SelectProps {
  filterMethod?: any;
  remoteMethod?: any;
  multiple?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  allowCreate?: boolean;
  remote?: boolean;
  collapseTags?: boolean;
  automaticDropdown?: boolean;
  multipleLimit?: number;
  popperClass?: string;
  defaultFirstOption?: boolean;
  fitInputWidth?: boolean;
  size?: 'small' | 'default' | 'large';
}

const _mount = (template: string, data: any = () => ({}), otherObj?) =>
  mount(
    {
      components: {
        'ef-select': Select,
        'ef-option': Option,
        'ef-group-option': Group,
        'ef-form-item': FormItem
      },
      template,
      data,
      ...otherObj
    },
    {
      attachTo: 'body'
    }
  );

function getOptions(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'body > div:last-child .ef-select-dropdown__item'
    )
  );
}

const getSelectVm = (configs: SelectProps = {}, options?) => {
  [
    'multiple',
    'clearable',
    'defaultFirstOption',
    'filterable',
    'allowCreate',
    'remote',
    'collapseTags',
    'automaticDropdown',
    'fitInputWidth'
  ].forEach((config) => {
    configs[config] = configs[config] || false;
  });
  configs.multipleLimit = configs.multipleLimit || 0;
  if (!options) {
    options = [
      {
        value: '选项1',
        label: '黄金糕',
        disabled: false
      },
      {
        value: '选项2',
        label: '双皮奶',
        disabled: false
      },
      {
        value: '选项3',
        label: '蚵仔煎',
        disabled: false
      },
      {
        value: '选项4',
        label: '龙须面',
        disabled: false
      },
      {
        value: '选项5',
        label: '北京烤鸭',
        disabled: false
      }
    ];
  }

  return _mount(
    `
    <ef-select
      ref="select"
      v-model="value"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :popper-class="popperClass"
      :clearable="clearable"
      :default-first-option="defaultFirstOption"
      :filterable="filterable"
      :collapse-tags="collapseTags"
      :allow-create="allowCreate"
      :filterMethod="filterMethod"
      :remote="remote"
      :loading="loading"
      :remoteMethod="remoteMethod"
      :automatic-dropdown="automaticDropdown"
      :size="size"
      :fit-input-width="fitInputWidth">
      <ef-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :disabled="item.disabled"
        :value="item.value">
      </ef-option>
    </ef-select>
  `,
    () => ({
      options,
      multiple: configs.multiple,
      multipleLimit: configs.multipleLimit,
      clearable: configs.clearable,
      defaultFirstOption: configs.defaultFirstOption,
      filterable: configs.filterable,
      collapseTags: configs.collapseTags,
      allowCreate: configs.allowCreate,
      popperClass: configs.popperClass,
      automaticDropdown: configs.automaticDropdown,
      fitInputWidth: configs.fitInputWidth,
      loading: false,
      filterMethod: configs.filterMethod,
      remote: configs.remote,
      remoteMethod: configs.remoteMethod,
      value: configs.multiple ? [] : '',
      size: configs.size || 'default'
    })
  );
};

const getGroupSelectVm = (configs: SelectProps = {}, options?) => {
  [
    'multiple',
    'clearable',
    'filterable',
    'allowCreate',
    'remote',
    'collapseTags',
    'automaticDropdown',
    'fitInputWidth'
  ].forEach((config) => {
    configs[config] = configs[config] || false;
  });
  configs.multipleLimit = configs.multipleLimit || 0;
  if (!options) {
    options = [
      {
        label: 'Australia',
        options: [
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Melbourne',
            label: 'Melbourne'
          }
        ]
      },
      {
        label: 'China',
        options: [
          {
            value: 'Shanghai',
            label: 'Shanghai'
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen'
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou'
          },
          {
            value: 'Dalian',
            label: 'Dalian'
          }
        ]
      },
      {
        label: 'India',
        options: [
          {
            value: 'Mumbai',
            label: 'Mumbai'
          },
          {
            value: 'Delhi',
            label: 'Delhi'
          },
          {
            value: 'Bangalore',
            label: 'Bangalore'
          }
        ]
      },
      {
        label: 'Indonesia',
        options: [
          {
            value: 'Bandung',
            label: 'Bandung'
          },
          {
            value: 'Jakarta',
            label: 'Jakarta'
          }
        ]
      }
    ];
  }
  return _mount(
    `
    <ef-select
      ref="select"
      v-model="value"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :popper-class="popperClass"
      :clearable="clearable"
      :filterable="filterable"
      :collapse-tags="collapseTags"
      :allow-create="allowCreate"
      :filterMethod="filterMethod"
      :remote="remote"
      :loading="loading"
      :remoteMethod="remoteMethod"
      :automatic-dropdown="automaticDropdown"
      :fit-input-width="fitInputWidth">
     <ef-group-option
        v-for="group in options"
        :key="group.label"
        :disabled="group.disabled"
        :label="group.label">
        <ef-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </ef-group-option>
    </ef-select>
`,
    () => ({
      options,
      multiple: configs.multiple,
      multipleLimit: configs.multipleLimit,
      clearable: configs.clearable,
      filterable: configs.filterable,
      collapseTags: configs.collapseTags,
      allowCreate: configs.allowCreate,
      popperClass: configs.popperClass,
      automaticDropdown: configs.automaticDropdown,
      fitInputWidth: configs.fitInputWidth,
      loading: false,
      filterMethod: configs.filterMethod,
      remote: configs.remote,
      remoteMethod: configs.remoteMethod,
      value: configs.multiple ? [] : ''
    })
  );
};

describe('Select', () => {
  let wrapper: ReturnType<typeof _mount>;
  const findInnerInput = () =>
    wrapper.find('.ef-input__inner').element as HTMLInputElement;

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('create', async () => {
    wrapper = _mount(`<ef-select v-model="value"></ef-select>`, () => ({
      value: ''
    }));
    expect(wrapper.classes()).toContain('ef-select');
    expect(findInnerInput().placeholder).toBe('请输入');
    const select = wrapper.findComponent({ name: 'EfSelect' });
    await select.trigger('click');
    await nextTick();
    expect((select.vm as any).visible).toBe(true);
  });

  test('options rendered correctly', () => {
    wrapper = getSelectVm();
    const options = wrapper.element.querySelectorAll(
      '.ef-select-dropdown__item'
    );
    const result = Array.prototype.every.call(options, (option, index) => {
      const text = option.querySelector('span').textContent;
      const vm = wrapper.vm as any;
      return text === vm.options[index].label;
    });
    expect(result).toBe(true);
  });

  test('custom dropdown class', () => {
    wrapper = getSelectVm({ popperClass: 'custom-dropdown' });
    const dropdown = wrapper.findComponent({ name: 'EfSelectDropdown' });
    expect(dropdown.classes()).toContain('custom-dropdown');
  });

  test('default value', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value">
        <ef-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }
        ],
        value: '选项2'
      })
    );
    await nextTick();

    expect(findInnerInput().value).toBe('双皮奶');
  });

  test('set default value to object', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value">
        <ef-option
          v-for="item in options"
          :label="item.label"
          :key="item.value.value"
          :value="item.value">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: {
              value: '选项1'
            },
            label: '黄金糕'
          },
          {
            value: {
              value: '选项2'
            },
            label: '双皮奶'
          }
        ],
        value: {
          value: '选项2'
        }
      })
    );
    await nextTick();

    expect(findInnerInput().value).toBe('双皮奶');
  });

  test('custom label', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value">
        <ef-option
          v-for="item in options"
          :label="item.name"
          :key="item.id"
          :value="item.id">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            id: 1,
            name: '黄金糕'
          },
          {
            id: 2,
            name: '双皮奶'
          }
        ],
        value: 2
      })
    );
    await nextTick();

    expect(findInnerInput().value).toBe('双皮奶');
  });

  test('custom label with object', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value" value-key="id">
        <ef-option
          v-for="item in options"
          :label="item.name"
          :key="item.id"
          :value="item">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            id: 1,
            name: '黄金糕'
          },
          {
            id: 2,
            name: '双皮奶'
          }
        ],
        value: {
          id: 2
        }
      })
    );
    await nextTick();

    expect(findInnerInput().value).toBe('双皮奶');
  });

  test('sync set value and options', async () => {
    wrapper = _mount(
      `
    <ef-select v-model="value">
      <ef-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </ef-option>
    </ef-select>
  `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }
        ],
        value: '选项2'
      })
    );
    const vm = wrapper.vm as any;
    vm.options = [
      {
        value: '选项1',
        label: '黄金糕'
      }
    ];
    vm.value = '选项1';
    await nextTick();
    expect(findInnerInput().value).toBe('黄金糕');
  });

  test('single select', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value" @change="handleChange">
        <ef-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
          <p>{{item.label}} {{item.value}}</p>
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        value: '',
        count: 0
      }),
      {
        methods: {
          handleChange() {
            this.count++;
          }
        }
      }
    );

    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    const vm = wrapper.vm as any;
    expect(vm.value).toBe('');
    expect(findInnerInput().value).toBe('');
    options[2].click();
    await nextTick();
    expect(vm.value).toBe('选项3');
    expect(findInnerInput().value).toBe('蚵仔煎');
    expect(vm.count).toBe(1);
    options[4].click();
    await nextTick();
    expect(vm.value).toBe('选项5');
    expect(findInnerInput().value).toBe('北京烤鸭');
    expect(vm.count).toBe(2);
  });

  test('disabled option', async () => {
    wrapper = getSelectVm();
    const vm = wrapper.vm as any;
    wrapper.find('.select-trigger').trigger('click');
    vm.options[1].disabled = true;
    await nextTick();
    const options = getOptions();
    expect(options[1].className).toContain('is-disabled');
    options[1].click();
    await nextTick();
    expect(vm.value).toBe('');
  });

  test('group disabled option', () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Melbourne',
            label: 'Melbourne'
          }
        ]
      }
    ];
    wrapper = getGroupSelectVm({}, optionGroupData);
    const options = wrapper.findAllComponents(Option);
    expect(options[0].classes('is-disabled')).toBeTruthy();
  });

  test('keyboard operations when option-group is disabled', async () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Melbourne',
            label: 'Melbourne'
          }
        ]
      },
      {
        label: 'China',
        options: [
          {
            value: 'Shanghai',
            label: 'Shanghai'
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen'
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou'
          },
          {
            value: 'Dalian',
            label: 'Dalian'
          }
        ]
      }
    ];
    wrapper = getGroupSelectVm({}, optionGroupData);
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const vm = select.vm as any;
    let i = 8;
    while (i--) {
      vm.navigateOptions('next');
    }
    vm.navigateOptions('prev');
    vm.navigateOptions('prev');
    vm.navigateOptions('prev');
    await nextTick();
    vm.selectOption();
    await nextTick();
    expect((wrapper.vm as any).value).toBe('Dalian');
  });

  test('visible event', async () => {
    wrapper = _mount(
      `
    <ef-select v-model="value" @visible-change="handleVisibleChange">
      <ef-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </ef-option>
    </ef-select>`,
      () => ({
        options: [],
        value: '',
        visible: ''
      }),
      {
        methods: {
          handleVisibleChange(val) {
            this.visible = val;
          }
        }
      }
    );
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const vm = wrapper.vm as any;
    const selectVm = select.vm as any;
    selectVm.visible = true;
    await selectVm.$nextTick();
    expect(vm.visible).toBe(true);
  });

  test('keyboard operations', async () => {
    vi.useFakeTimers();
    wrapper = getSelectVm();
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const vm = select.vm as any;
    let i = 8;
    while (i--) {
      vm.navigateOptions('next');
    }
    vm.navigateOptions('prev');
    vm.navigateOptions('prev');
    vm.navigateOptions('prev');
    await nextTick();
    expect(vm.hoverIndex).toBe(3);
    vm.selectOption();
    await nextTick();
    expect((wrapper.vm as any).value).toBe('选项4');
    vm.toggleMenu();

    vi.runAllTimers();
    await nextTick();

    vm.toggleMenu();
    await nextTick();
    expect(vm.hoverIndex).toBe(3);
    vi.useRealTimers();
  });

  test('clearable', async () => {
    wrapper = getSelectVm({ clearable: true });
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const vm = wrapper.vm as any;
    const selectVm = select.vm as any;
    vm.value = '选项1';
    await nextTick();
    selectVm.inputHovering = true;
    await selectVm.$nextTick();
    const iconClear = wrapper.find('.i-ion-ios-close-circle-outline');
    expect(iconClear.exists()).toBe(true);
    await iconClear.trigger('click');
    expect(vm.value).toBe('');
  });

  test('multiple select', async () => {
    wrapper = getSelectVm({ multiple: true });
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    const vm = wrapper.vm as any;
    vm.value = ['选项1'];
    nextTick();
    options[1].click();
    await nextTick();
    options[3].click();
    await nextTick();
    expect(vm.value.includes('选项2') && vm.value.includes('选项4')).toBe(true);
    const tagCloseIcons = wrapper.findAll('.ef-tag__close');
    await tagCloseIcons[0].trigger('click');
    expect(vm.value.indexOf('选项1')).toBe(-1);
  });

  test('multiple select when content overflow', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="selectedList" multiple placeholder="请选择">
        <ef-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label:
              '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕'
          },
          {
            value: '选项2',
            label:
              '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        selectedList: []
      })
    );
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    const selectWrapper = wrapper.findComponent(Select);
    const inputWrapper = selectWrapper.findComponent({ ref: 'reference' });
    const inputDom = inputWrapper.element;
    const inputRect = {
      height: 40,
      width: 221,
      x: 44,
      y: 8,
      top: 8
    };
    const mockInputWidth = vi
      .spyOn(inputDom, 'getBoundingClientRect')
      .mockReturnValue(inputRect as DOMRect);
    selectWrapper.vm.handleResize();
    options[0].click();
    await nextTick();
    options[1].click();
    await nextTick();
    options[2].click();
    await nextTick();
    const tagWrappers = wrapper.findAll('.ef-select__tags-text');
    for (const tagWrapper of tagWrappers) {
      const tagWrapperDom = tagWrapper.element;
      expect(
        Number.parseInt(tagWrapperDom.style.maxWidth) === inputRect.width - 75
      ).toBe(true);
    }
    mockInputWidth.mockRestore();
  });

  test('multiple select with collapseTags when content overflow', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="selectedList" multiple collapseTags placeholder="请选择">
        <ef-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label:
              '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕'
          },
          {
            value: '选项2',
            label:
              '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        selectedList: []
      })
    );
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    const selectWrapper = wrapper.findComponent(Select);
    const inputWrapper = selectWrapper.findComponent({ ref: 'reference' });
    const inputDom = inputWrapper.element;
    const inputRect = {
      height: 40,
      width: 221,
      x: 44,
      y: 8,
      top: 8
    };
    const mockInputWidth = vi
      .spyOn(inputDom, 'getBoundingClientRect')
      .mockReturnValue(inputRect as DOMRect);
    selectWrapper.vm.handleResize();
    options[0].click();
    await nextTick();
    options[1].click();
    await nextTick();
    options[2].click();
    await nextTick();
    const tagWrappers = wrapper.findAll('.ef-select__tags-text');
    const tagWrapperDom = tagWrappers[0].element;
    expect(
      Number.parseInt(tagWrapperDom.style.maxWidth) === inputRect.width - 123
    ).toBe(true);
    mockInputWidth.mockRestore();
  });

  test('multiple select with collapseTagsTooltip', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="selectedList" multiple collapseTags collapse-tags-tooltip placeholder="请选择">
        <ef-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        selectedList: []
      })
    );
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();

    options[0].click();
    await nextTick();
    options[1].click();
    await nextTick();
    options[2].click();
    await nextTick();
    const triggerWrappers = wrapper.findAll('.ef-tooltip__trigger');
    expect(triggerWrappers[0]).toBeDefined();
    const tags = document.querySelectorAll('.ef-select__tags-text');
    expect(tags.length).toBe(4);
    expect(tags[3].textContent).toBe('蚵仔煎');
  });

  test('multiple remove-tag', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value" multiple @remove-tag="handleRemoveTag">
        <ef-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
          <p>{{item.label}} {{item.value}}</p>
        </ef-option>
      </ef-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        value: ['选项1', '选项2']
      }),
      {
        methods: {
          handleRemoveTag() {
            // pass
          }
        }
      }
    );

    const vm = wrapper.vm as any;
    await nextTick();
    expect(vm.value.length).toBe(2);
    const tagCloseIcons = wrapper.findAll('.ef-tag__close');
    await tagCloseIcons[1].trigger('click');
    expect(vm.value.length).toBe(1);
    await tagCloseIcons[0].trigger('click');
    expect(vm.value.length).toBe(0);
  });

  test('multiple limit', async () => {
    wrapper = getSelectVm({ multiple: true, multipleLimit: 1 });
    const vm = wrapper.vm as any;
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    options[1].click();
    await nextTick();
    expect(vm.value.includes('选项2')).toBe(true);
    options[3].click();
    await nextTick();
    expect(vm.value.indexOf('选项4')).toBe(-1);
  });

  test('event:focus & blur', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    wrapper = _mount(
      `<ef-select
      @focus="handleFocus"
      @blur="handleBlur" />`,
      () => ({
        handleFocus,
        handleBlur
      })
    );
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const input = select.find('input');

    expect(input.exists()).toBe(true);
    await input.trigger('focus');
    expect(handleFocus).toHaveBeenCalled();
    await input.trigger('blur');
    expect(handleBlur).toHaveBeenCalled();
  });

  test('event:focus & blur for multile & filterable select', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    wrapper = _mount(
      `
    <ef-select
      @focus="handleFocus"
      @blur="handleBlur"
      multiple
      filterable
    />`,
      () => ({
        handleFocus,
        handleBlur
      })
    );
    const select = wrapper.findComponent({ name: 'EfSelect' });
    const input = select.find('input');

    expect(input.exists()).toBe(true);
    await input.trigger('focus');
    expect(handleFocus).toHaveBeenCalled();
    await input.trigger('blur');
    expect(handleBlur).toHaveBeenCalled();
  });

  test('should not open popper when automatic-dropdown not set', async () => {
    wrapper = getSelectVm();
    const select = wrapper.findComponent({ name: 'EfSelect' });
    await select
      .findComponent({ ref: 'reference' })
      .find('input')
      .element.focus();
    expect((select.vm as any).visible).toBe(false);
  });

  test('should open popper when automatic-dropdown is set', async () => {
    wrapper = getSelectVm({ automaticDropdown: true });
    const select = wrapper.findComponent({ name: 'EfSelect' });
    await select
      .findComponent({ ref: 'reference' })
      .find('input')
      .trigger('focus');
    expect((select.vm as any).visible).toBe(true);
  });

  test('only emit change on user input', async () => {
    let callCount = 0;
    wrapper = _mount(
      `
    <ef-select v-model="value" @change="change" ref="select">
      <ef-option label="1" value="1" />
      <ef-option label="2" value="2" />
      <ef-option label="3" value="3" />
    </ef-select>`,
      () => ({
        value: '1',
        change: () => ++callCount
      })
    );

    expect(callCount).toBe(0);
    await wrapper.find('.select-trigger').trigger('click');
    const options = getOptions();
    options[2].click();
    expect(callCount).toBe(1);
  });

  test('render slot `empty`', async () => {
    wrapper = _mount(
      `
      <ef-select v-model="value">
        <template #empty>
          <div class="empty-slot">EmptySlot</div>
        </template>
      </ef-select>`,
      () => ({
        value: '1'
      })
    );
    await wrapper.find('.select-trigger').trigger('click');
    expect(
      document.querySelector<HTMLElement>('.empty-slot')?.textContent
    ).toBe('EmptySlot');
  });

  test('should set placeholder to label of selected option when filterable is true and multiple is false', async () => {
    wrapper = _mount(
      `
      <ef-select ref="select" v-model="value" filterable>
        <ef-option label="test" value="test" />
      </ef-select>`,
      () => ({ value: 'test' })
    );
    const vm = wrapper.vm as any;
    await wrapper.trigger('click');
    const selectVm = wrapper.findComponent({ name: 'EfSelect' }).vm as any;
    expect(selectVm.visible).toBe(true);
    expect(findInnerInput().placeholder).toBe('test');
    expect(vm.value).toBe('test');
  });

  test('default value is null or undefined', async () => {
    wrapper = _mount(
      `
    <ef-select v-model="value">
      <ef-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </ef-option>
    </ef-select>`,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }
        ],
        value: undefined
      })
    );
    const vm = wrapper.vm as any;
    vm.value = null;
    await nextTick();
    expect(findInnerInput().value).toBe('');
    vm.value = '选项1';
    await nextTick();
    expect(findInnerInput().value).toBe('黄金糕');
  });

  test('emptyText error show', async () => {
    wrapper = _mount(
      `
    <ef-select :modef-value="value" filterable placeholder="Select">
      <ef-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </ef-option>
    </ef-select>`,
      () => ({
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2'
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          }
        ],
        value: 'test'
      })
    );
    const select = wrapper.findComponent({ name: 'EfSelect' });
    await select.trigger('click');
    await nextTick();
    expect(
      !!(document.querySelector('.ef-select__popper') as HTMLElement).style
        .display
    ).toBeFalsy();
    expect(wrapper.findAll('.ef-select-dropdown__empty').length).toBe(0);
  });

  test('multiple select with remote load', async () => {
    vi.useFakeTimers();
    wrapper = mount({
      template: `
      <ef-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <ef-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item"
        />
      </ef-select>`,
      components: { EfSelect: Select, EfOption: Option },
      data() {
        return {
          options: [],
          value: [],
          list: [],
          loading: false,
          states: [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
          ]
        };
      },
      mounted() {
        this.list = this.states.map((item) => {
          return { value: `value:${item}`, label: `label:${item}` };
        });
      },
      methods: {
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter((item) => {
                return item.label.toLowerCase().includes(query.toLowerCase());
              });
            }, 200);
          } else {
            this.options = [];
          }
        }
      }
    });

    const select = wrapper.findComponent({ name: 'EfSelect' }).vm;
    select.debouncedQueryChange({
      target: {
        value: ''
      }
    });

    select.debouncedQueryChange({
      target: {
        value: 'a'
      }
    });
    vi.runAllTimers();
    await nextTick();
    let options = getOptions();
    options[0].click();
    await nextTick();
    select.debouncedQueryChange({
      target: {
        value: 'n'
      }
    });
    vi.runAllTimers();
    await nextTick();
    options = getOptions();
    options[5].click();
    await nextTick();
    expect(select.selected.length === 2).toBeTruthy();
    expect(select.selected[0].currentLabel !== '').toBeTruthy();
    expect(select.selected[1].currentLabel !== '').toBeTruthy();
    vi.useRealTimers();
  });
});
