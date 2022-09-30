# InputNumber  数字输入框
仅允许输入数字值。

# 基础用法

:::demo
```vue
<template>
  <ef-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>
```
:::

# 禁用状态
disabled 属性接受一个 Boolean，设置为true即可禁用整个组件。
:::demo
```vue
<template>
  <ef-input-number v-model="num" disabled :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>
```
:::

# 步进
使用 step 属性控制递增递减的步长。

:::demo
```vue
<template>
  <ef-input-number v-model="num" :step="2" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>
```
:::

# 严格步进
step-strictly 属性接受一个Boolean。 如果这个属性被设置为 true，则只能输入步进的倍数。
:::demo
```vue
<template>
  <ef-input-number v-model="num" step-strictly :step="2" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>
```
:::

# 精度
设置 precision 属性可以控制数值精度，接收一个 Number。
:::demo
```vue
<template>
  <ef-input-number v-model="num" :precision="2" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>
```
:::

# 按钮位置
设置 controls-position 属性可以控制按钮位置。

设置 precision 属性可以控制数值精度，接收一个 Number。
:::demo
```vue
<template>
  <ef-input-number v-model="num" controls-position="right" :min="1" :max="10" />
  <span style="margin-right: 20px;" />
  <ef-input-number v-model="num" :min="1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)

</script>
```
:::

# 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | number | - | -
| min | 设置计数器允许的最小值 | number | - | -Infinity
| max | 设置计数器允许的最大值 | number | - | Infinity
| step | 计数器步长 | number | - | 1
| step-strictly | 是否只能输入 step 的倍数 | boolean | - | false
| precision | 数值精度 | number | - | -
| readonly | 原生  readonly 属性，是否只读 | boolean | - | false
| disabled | 是否禁用状态 | boolean | - | false
| controls | 是否使用控制按钮 | boolean | - | true
| controls-position | 控制按钮位置 | string | right | -
| placeholder | 输入框默认 placeholder | string | - | -
| name | 等价于原生 input name 属性 | string | - | -

# 事件

| Name   | Description                                                                                           | 参数                |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| blur   | 在 Input 失去焦点时触发 | (event: FocusEvent) | 
| focus  | 在 Input 获得焦点时触发 | (event: FocusEvent) |
| change | 绑定值被改变时触发 | (value: string \| number) |

# 方法

| Method | Description                      | 参数 |
| ------ | -------------------------------- | ---------- |
| focus  | 使 input 获取焦点 | — |
| blur   | 使 input 失去焦点 | — |
