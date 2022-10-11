# Radio 单选框

# 基础用法
只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 `label` 属性的值， label可以是`String`、`Number` 或 `Boolean`。
:::demo
```vue
<template>
  <ef-radio-group v-model="radio1" class="ml-4">
    <ef-radio label="1">Option 1</ef-radio>
    <ef-radio label="2">Option 2</ef-radio>
  </ef-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
</script>
```
:::

# 禁用状态
`disabled` 属性可以用来控制单选框的禁用状态。

:::demo
```vue
<template>
  <ef-radio v-model="radio1" disabled label="1">Option 1</ef-radio>
  <ef-radio v-model="radio1" disabled label="2">Option 2</ef-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
</script>
```
:::

# 单选框组
适用于在多个互斥的选项中选择的场景  
结合el-radio-group元素和子元素el-radio可以实现单选组， 为 ef-radio-group 绑定 v-model，再为 每一个 ef-radio 设置好 label 属性即可， 另外，还可以通过 change 事件来响应变化，它会传入一个参数 value 来表示改变之后的值。
:::demo
```vue
<template>
  <ef-radio-group v-model="radio">
    <ef-radio :label="3">Option A</ef-radio>
    <ef-radio :label="6">Option B</ef-radio>
    <ef-radio :label="9">Option C</ef-radio>
  </ef-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref(3)
</script>

```
:::

# 按钮样式
可以让单选框看起来像一个按钮一样。  
  
只需要把 ef-radio 元素换成 ef-radio-button 元素即可， 此外，Element Plus 还提供了 size 属性用来控制单选框的大小。
:::demo
```vue
<template>
  <div>
    <ef-radio-group v-model="radio1" size="large">
      <ef-radio-button label="New York" />
      <ef-radio-button label="Washington" />
      <ef-radio-button label="Los Angeles" />
      <ef-radio-button label="Chicago" />
    </ef-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ef-radio-group v-model="radio2">
      <ef-radio-button label="New York" />
      <ef-radio-button label="Washington" />
      <ef-radio-button label="Los Angeles" />
      <ef-radio-button label="Chicago" />
    </ef-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ef-radio-group v-model="radio3" size="small">
      <ef-radio-button label="New York" />
      <ef-radio-button label="Washington" disabled />
      <ef-radio-button label="Los Angeles" />
      <ef-radio-button label="Chicago" />
    </ef-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('New York')
const radio2 = ref('New York')
const radio3 = ref('New York')
</script>
```
:::

# Radio 属性
| 名称                  | 说明                          | 类型                      | 可选值        | 默认值 |
| --------------------- | ------------------------------------ | ------------------------- | ---------------------- | ------- |
| model-value / v-model | 绑定值                        | string / number / boolean | —                      | —       |
| label                 | 单选框对应的值                   | string / number / boolean | —                      | —       |
| disabled              | 是否禁用单选框            | boolean                   | —                      | false   |
| size                  | Radio 的尺寸：只对按钮样式生效                    | string                    | large / default /small | —       |
| name                  | 原生 name 属性              | string                    | —                      | —       |

# Radio 事件

| 名称   | 说明                           | 回调参数                          |
| ------ | ------------------------------------- | ----------------------------------- |
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

# Radio 插槽

| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

# Radio-group 属性

| 名称                  | 说明                                       | 类型                      | 可选值        | 默认值 |
| --------------------- | ------------------------------------------------- | ------------------------- | ----------------------- | ------- |
| model-value / v-model | 绑定值                                    | string / number / boolean | —                       | —       |
| size                  | Radio 的尺寸：只对按钮样式生效                                 | string                    | large / default / small | default |
| disabled              | 是否禁用单选框          | boolean                   | —                       | false   |
| text-color            | 按钮形式的 Radio 激活时的文本颜色                  | string                    | —                       | #ffffff |
| fill                  | 按钮形式的 Radio 激活时的填充色和边框色 | string                    | —                       | #409EFF |

# Radio-group 事件

| 名称   | 说明                           | 回调参数                          |
| ------ | ------------------------------------- | ----------------------------------- |
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

# Radio-group 插槽

| 名称 | 说明               | 子标签              |
| ---- | ------------------------- | -------------------- |
| —    | 自定义默认内容 | Radio / Radio-button |

# Radio-button 属性

| 名称     | 说明               | 类型            | 可选值 | 默认值 |
| -------- | ------------------------- | --------------- | --------------- | ------- |
| label    | radio 的 value        | string / number | —               | —       |
| disabled | 是否禁用 | boolean         | —               | false   |

# Radio-button 插槽

| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 默认插槽内容 |
