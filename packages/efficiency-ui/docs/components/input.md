# Input 输入框
输入框

# 基础用法 

:::demo
```vue
<template>
  <ef-input v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 禁用状态
通过 `disabled` 属性指定是否禁用 input 组件
:::demo
```vue
<template>
  <ef-input v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 一键清空
使用 clearable 属性即可得到一个可一键清空的输入框
:::demo
```vue
<template>
  <ef-input v-model="input" clearable placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 密码框
使用 show-password 属性即可得到一个可切换显示隐藏的密码框
:::demo
```vue
<template>
  <ef-input v-model="input" show-password placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 格式化
使用 formatter 对输入的值进行格式化，通常同时使用 parser
:::demo
```vue
<template>
  <ef-input
    v-model="input"
    placeholder="Please input"
    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 带图标的输入框
带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 prefix-icon 和 suffix-icon 属性。只需要传入对应图标的 class 值，所有图标可参考 `Icon 图标`
:::demo
```vue
<template>
  <ef-input
    v-model="input1"
    class="m-2"
    placeholder="something"
    suffix-icon="i-line-md-edit-twotone-full"
  />
  <ef-input
    v-model="input2"
    class="m-2"
    placeholder="something"
    prefix-icon="i-line-md-calendar"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>

```
:::

# 文本域
需要输入多行文本时，可以使用文本域，只需要添加 `type = "textarea"`。  
高度可使用 rows 控制

:::demo
```vue
<template>
  <ef-input v-model="input" type="textarea" rows="3" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```
:::

# 自适应文本域
设置 autosize 可以使文本域的高度变为自适应。
:::demo
```vue
<template>
  <ef-input
    v-model="textarea1"
    autosize
    type="textarea"
    placeholder="Please input"
  />
  <ef-input
    v-model="textarea2"
    :autosize="{ minRows: 2, maxRows: 4 }"
    class="mt-20px"
    type="textarea"
    placeholder="Please input"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textarea1 = ref('')
const textarea2 = ref('')
</script>
```
:::

# 前后插槽
可以使用插槽在输入框前后设置一个元素。
:::demo
```vue
<template>
  <ef-input v-model="input1" placeholder="Please input">
    <template #prepend>https://</template>
  </ef-input>
  <ef-input v-model="input2" class="mt-20px" placeholder="Please input">
    <template #append>.com</template>
  </ef-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>
```
:::

# 输入长度限制
使用 maxlength  属性, 来控制输入内容的最大字数。 可通过设置 show-word-limit 到 true 来显示剩余字数。
:::demo
```vue
<template>
  <ef-input
    v-model="input1"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
  />
  <ef-input
    v-model="input2"
    maxlength="30"
    class="mt-20px"
    placeholder="Please input"
    show-word-limit
    type="textarea"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>
```
:::

# Input 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string / number | - | -
| type | 类型 | string |text，textarea 和其他原生 input 的 type 值  | text
| maxlength | 最大输入长度 | string / number | - | -
| show-word-limit      | 是否显示统计字数 | boolean | — | false |
| placeholder          | 输入框占位文本 | string | — | — |
| clearable            | 是否可清空 | boolean | — | false |
| formatter            | 指定输入值的格式。 | (value: string \| number) => string | — | — |
| parser               | 指定从格式化器输入中提取的值。 | (string) => string | — | — |
| show-password        | 是否密码 | boolean | — | false |
| disabled             | 	是否禁用 | boolean | — | false |
| prefix-icon          | 自定义前缀图标 | string | — | — |
| suffix-icon          | 自定义后缀图标 | string | — | — |
| rows                 | 输入框行数，仅 type 为 'textarea' 时有效 | number | — | 2 |
| autosize             | textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | boolean / object | — | false   |
| readonly             | 原生  readonly 属性，是否只读 | boolean | — | false   |
| resize               | 控制是否能被用户缩放 | string | none / both / horizontal / vertical | — |
| autofocus            | 原生属性，自动获取焦点 | boolean | — | false |
| input-style          | input 元素或 textarea 元素的 style | object | - |


# Input Slots

| Name    | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| prepend | 输入框前置内容，只对非 type="textarea" 有效 |
| append  | 输入框后置内容，只对非 type="textarea" 有效 |

# 事件

| Name   | Description                                                                                           | 参数                |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| blur   | 在 Input 失去焦点时触发 | (event: FocusEvent) | 
| focus  | 在 Input 获得焦点时触发 | (event: FocusEvent) |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | (value: string \| number) |
| input  | 在 Input 值改变时触发 | (value: string \| number) |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发 | — |

# 方法

| Method | Description                      | 参数 |
| ------ | -------------------------------- | ---------- |
| focus  | 使 input 获取焦点 | — |
| blur   | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |
