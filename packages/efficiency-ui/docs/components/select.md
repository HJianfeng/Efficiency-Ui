# Select 下拉菜单
下拉菜单。

# 基础用法
基础用法。
:::demo
```vue
<template>
  <ef-select v-model="value" class="m-2" placeholder="Select" size="large">
    <ef-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
  { value: 'Option4', label: 'Option4' },
  { value: 'Option5', label: 'Option5' },
]
</script>
```
:::

# 禁用
在 ef-option 中，设定 disabled 值为 true，即可禁用该选项
:::demo
```vue
<template>
  <ef-select v-model="value" class="m-2" placeholder="Select" size="large">
    <ef-option
      v-for="item in options"
      :key="item.value"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.value"
    />
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'Option1', label: 'Option1', disabled: true },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
  { value: 'Option4', label: 'Option4' },
  { value: 'Option5', label: 'Option5' },
]
</script>
```
:::  

也可以直接在 ef-select 设定 disabled 禁止全部选项
:::demo
```vue
<template>
  <ef-select v-model="value" class="m-2" disabled placeholder="Select" size="large">
    <ef-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
  { value: 'Option4', label: 'Option4' },
  { value: 'Option5', label: 'Option5' },
]
</script>
```
:::

# 可清空单选
设置 clearable 属性为 true
:::demo
```vue
<template>
  <ef-select v-model="value" class="m-2" clearable placeholder="Select" size="large">
    <ef-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
  { value: 'Option4', label: 'Option4' },
  { value: 'Option5', label: 'Option5' },
]
</script>
```
:::

# 多选
为 ef-select 设置 multiple 属性即可启用多选， 此时 v-model 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现， 你也可以设置 collapse-tags 属性将它们合并为一段文字。 您可以使用 collapse-tags-tooltip 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。
:::demo
```vue
<template>
  <div class="m-4">
    <p>default</p>
    <ef-select
      v-model="value1"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <ef-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ef-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <ef-select
      v-model="value2"
      multiple
      collapse-tags
      placeholder="Select"
      style="width: 240px"
    >
      <ef-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ef-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <ef-select
      v-model="value3"
      multiple
      collapse-tags
      collapse-tags-tooltip
      placeholder="Select"
      style="width: 240px"
    >
      <ef-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ef-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
```
:::

# 自定义模板
你可以自定义如何来渲染每一个选项。

将自定义的 HTML 模板插入 ef-option 的 slot 中即可。
:::demo
```vue
<template>
  <ef-select v-model="value" placeholder="Select">
    <ef-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span
        style="
          float: right;
          color: var(--ef-text-color-secondary);
          font-size: 13px;
        "
        >{{ item.value }}</span
      >
    </ef-option>
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>

```
:::

# 选项分组
使用 ef-option-group 对备选项进行分组，它的 label 属性为分组名
:::demo
```vue
<template>
  <ef-select v-model="value" placeholder="Select">
    <ef-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <ef-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ef-option-group>
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]
</script>
```
:::

# 本地筛选
为el-select添加filterable属性即可启用搜索功能。 默认情况下，Select 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 filter-method 来实现。 filter-method 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。
:::demo
```vue
<template>
  <ef-select v-model="value" filterable placeholder="Select">
    <ef-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ef-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

```
:::

# 远程搜索
将 filterable 和 remote 设置为true，同时传入一个remote-method
:::demo
```vue
<template>
  <div class="flex flex-wrap">
    <div class="m-4">
      <p>default</p>
      <ef-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <ef-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ef-select>
    </div>
    <div class="m-4">
      <p>use remote-show-suffix</p>
      <ef-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <ef-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ef-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface ListItem {
  value: string
  label: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const states = [
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
  'Wyoming',
]
</script>
```
:::


## Select 属性

| 名称| 描述 | 类型 | 可选值 | 默认值 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------- |
| model-value / v-model | 绑定值 | array / string / number / boolean / object | —  | — |
| multiple | 是否多选  | boolean | true / false | false            |
| disabled | 是否禁用 | boolean | true / false | false            |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填  | string | — | value |
| clearable | 是否可以清空选项 | boolean | true / false | false |
| collapse-tags | 多选时是否折叠tag | boolean | true / false | false |
| collapse-tags-tooltip | 当开启 collapse-tags 是否在 ToolTip 中展示剩余 tag | boolean | true / false | false |
| multiple-limit | 多选时设置最大值 | number | — | 0 |
| name | 	Select 输入框的原生 name 属性 | string | — | — |
| effect | Tooltip 的主题, 可选主题: `dark` / `light` | string | string | light |
| autocomplete | Select 输入框的原生 autocomplete 属性 | string | — | off |
| placeholder | 占位文字 | string | — | 请选择 |
| filterable | Select 组件是否可筛选 | boolean | true / false | false |
| filter-method | 自定义筛选方法 | function | — | — |
| remote | 其中的选项是否从服务器远程加载 | boolean | true / false | false |
| remote-method | 自定义远程搜索方法 | function | — | —                |
| loading | 是否正在从远程获取数据 | boolean | true / false | false            |
| loading-text | 从服务器加载内容时显示的文本 | string | — | Loading |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置 | string | — | No matching data |
| no-data-text | 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容 | string | — | No data |
| popper-class | 选择器下拉菜单的自定义类名 | string | — | — |
| reserve-keyword | 当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词 | boolean | true / false | true |
| default-first-option | 是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用 | boolean | true / false | false |
| teleported | 该下拉菜单是否使用teleport插入body元素 | boolean | true / false | true |
| persistent | 当下拉选择器未被激活并且persistent设置为false，选择器会被删除。 | boolean | true / false | true |
| fit-input-width | 	下拉框的宽度是否与输入框相同 | boolean | true / false | false |
| validate-event |是否触发表单验证 | boolean | true / false | true |
| placement  | 下拉框出现的位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |


## Select 事件

| 名称 | 描述 | 参数 |
| -------------- | ------------------------------------------------------------- | ----------------------------------------- |
| change         | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除tag时触发 |移除的tag值                        |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur           | 当 input 失去焦点时触发 | (event: FocusEvent) |
| focus          | 	当 input 获得焦点时触发 | (event: FocusEvent) |

## Select 插槽

| 名称   | 描述                      | Subtags               |
| ------ | -------------------------------- | --------------------- |
| —      | Option 组件列表           | Option Group / Option |
| prefix | Select 组件头部内容    | —                     |
| empty  | 无选项时的列表 | —                     |

## Option Group 属性

| 名称     | 描述                                  | 类型    | 可选值 | 默认值 |
| -------- | -------------------------------------------- | ------- | --------------- | ------- |
| label    | 分组的组名                     | string  | —               | —       |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | —               | false   |

## Option Group 插槽

| 名称 | 描述               | Subtags |
| ---- | ------------------------- | ------- |
| -    | 自定义默认内容 | Option  |

## Option 属性

| 名称     | 描述                                 | 类型                               | 可选值 | 默认值 |
| -------- | ------------------------------------------- | ---------------------------------- | --------------- | ------- |
| value    | 选项的值 | string / number / boolean / object | —               | —       |
| label    | 选项的标签，若不设置则默认与value相同 | string/number                      | —               | —       |
| disabled | 是否禁用该选项 | boolean | —               | false   |

## Option 插槽

| 名称 | 描述               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

## 方法

| Method | 描述                                     | 参数 |
| ------ | ----------------------------------------------- | ---------- |
| focus  | 使选择器的输入框获取焦点 | -          |
| blur   | 使选择器的输入框失去焦点，并隐藏下拉框 | -          |
