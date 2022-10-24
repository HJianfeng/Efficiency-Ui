# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

# 基础用法
绑定 v-model 到一个 Boolean 类型的变量。
:::demo
```vue
<template>
  <ef-switch v-model="value1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
</script>
```
:::

# Size
通过设置 size 属性来决定组件的大小。
:::demo
```vue
<template>
<div>
  <ef-switch
    v-model="value"
    size="large"
    active-text="Open"
    inactive-text="Close"
  />
</div>
<div><ef-switch v-model="value" active-text="Open" inactive-text="Close" /></div>
<div><ef-switch
    v-model="value"
    size="small"
    active-text="Open"
    inactive-text="Close"
  /></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(true)
</script>
```
:::

# 文字
使用 active-text 属性与 inactive-text 属性来设置开关的文字描述。 使用 inline-prompt 属性来控制文本是否显示在点内。
:::demo
```vue
<template>
  <ef-switch
    v-model="value1"
    class="mb-2"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <ef-switch
    v-model="value2"
    class="mb-2"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <ef-switch
    v-model="value3"
    inline-prompt
    active-text="是"
    inactive-text="否"
  />
  <ef-switch
    v-model="value4"
    class="ml-2"
    inline-prompt
    active-text="Y"
    inactive-text="N"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
</script>

```
:::

# 显示自定义图标
使用 inactive-icon 和 active-icon 属性来添加图标。 使用 inline-prompt 属性来控制图标显示在点内。

:::demo
```vue
<template>
  <ef-switch v-model="value1" active-icon="i-ic-baseline-check" inactive-icon="i-line-md-close" />
  <br />
  <ef-switch v-model="value1" inline-prompt active-icon="i-ic-baseline-check" inactive-icon="i-line-md-close" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
</script>
```
:::

# 自定义颜色
使用 inactive-color 和 active-color 属性来自定义颜色。

:::demo
```vue
<template>
  <ef-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
</script>
```
:::

# 扩展的 value 类型
你可以设置 active-value 和 inactive-value 属性， 它们接受 Boolean、String 或 Number 类型的值。
:::demo
```vue
<template>
 {{value}}
 <br />
  <ef-switch
    v-model="value"
    active-value="100"
    inactive-value="0"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>
```
:::

# 禁用状态

:::demo
```vue
<template>
  <ef-switch v-model="value1" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
</script>
```
:::

# 加载状态

:::demo
```vue
<template>
  <ef-switch v-model="value1" loading />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
</script>
```
:::

# 阻止切换
设置beforeChange属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。
:::demo
```vue
<template>
  <ef-switch
    v-model="value1"
    :loading="loading1"
    :before-change="beforeChange1"
  />
  <ef-switch
    v-model="value2"
    class="ml-2"
    :loading="loading2"
    :before-change="beforeChange2"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false
      return resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      return reject(new Error('Error'))
    }, 1000)
  })
}
</script>
```
:::



# 属性

| 属性             | 描述                                                                                                                                     | Type                                | Accepted Values         | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------- | ------- |
| model-value / v-model | 绑定值 | boolean / string / number           | —                       | —       |
| disabled              | 是否禁用 | boolean                             | —                       | false   |
| loading               | 是否加载 | boolean                             | —                       | false   |
| size                  | 大小 | string                              | large / default / small | default |
| width                 | 宽度 | number / string                     | —                       | —       |
| inline-prompt         | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 | boolean                             | —                       | false   |
| active-icon           | switch 状态为 on 时所显示图标，设置此项会忽略 active-text | string / Component                  | —                       | —       |
| inactive-icon         | switch 状态为 off 时所显示图标，设置此项会忽略 active-text | string / Component                  | —                       | —       |
| active-text           | switch 打开时的文字描述 | string                              | —                       | —       |
| inactive-text         | switch 关闭时的文字描述 | string                              | —                       | —       |
| active-value          | switch 状态为 on 时的值 | boolean / string / number           | —                       | true    |
| inactive-value        | switch 状态为 off 时的值 | boolean / string / number           | —                       | false   |
| active-color          | 当在 on 状态时的背景颜色 | string                              | —                       | —       |
| inactive-color        | 当在 off 状态时的背景颜色 | string                              | —                       | —       |
| name                  | switch 对应的 name 属性 | string                              | —                       | —       |
| validate-event        | 改变 switch 状态时是否触发表单的校验 | boolean                             | —                       | true    |
| before-change         | switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换 | `() => Promise<boolean> \| boolean` | —                       | —       |

# 事件

| 事件名 | 描述                 | 参数           |
| ---------- | --------------------------- | -------------------- |
| change     | switch 状态发生变化时的回调函数 | val，新状态的值 |

# 方法

| 方法名 | 描述                | 参数 |
| ------ | -------------------------- | ---------- |
| focus  | 使 Switch 获取焦点 | —          |
