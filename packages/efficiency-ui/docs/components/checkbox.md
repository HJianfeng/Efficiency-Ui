# Checkbox 多选框

# 基础用法

:::demo
```vue
<template>
  <div>
    <ef-checkbox v-model="checked1" label="Option 1" size="large" />
    <ef-checkbox v-model="checked2" label="Option 2" size="large" />
  </div>
  <div>
    <ef-checkbox v-model="checked3" label="Option 1" />
    <ef-checkbox v-model="checked4" label="Option 2" />
  </div>
  <div>
    <ef-checkbox v-model="checked5" label="Option 1" size="small" />
    <ef-checkbox v-model="checked6" label="Option 2" size="small" />
  </div>
  <div>
    <ef-checkbox v-model="checked5" label="Option 1" size="small" disabled />
    <ef-checkbox v-model="checked6" label="Option 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>
```
:::

# 多选框组
:::demo
```vue
<template>
  <ef-checkbox-group v-model="checkList">
    <ef-checkbox label="Option A" />
    <ef-checkbox label="Option B" />
    <ef-checkbox label="Option C" />
    <ef-checkbox label="disabled" disabled />
    <ef-checkbox label="selected and disabled" disabled />
  </ef-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkList = ref(['selected and disabled', 'Option A'])
</script>
```
:::

# 中间状态
indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
:::demo
```vue
<template>
  <ef-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >全选</ef-checkbox
  >
  <ef-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <ef-checkbox v-for="city in cities" :key="city" :label="city">{{
      city
    }}</ef-checkbox>
  </ef-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>

```
:::

# 数量限制
使用 min 和 max 属性能够限制可以被勾选的项目的数量。
:::demo
```vue
<template>
  <ef-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <ef-checkbox v-for="city in cities" :key="city" :label="city">{{
      city
    }}</ef-checkbox>
  </ef-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedCities = ref()
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

```
:::

# 按钮样式
使用 ef-checkbox-button 替换 ef-checkbox
:::demo
```vue
<template>
  <ef-checkbox-group v-model="checkboxGroup1">
    <ef-checkbox-button v-for="city in cities" :key="city" :label="city">
      {{ city }}
    </ef-checkbox-button>
  </ef-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checkboxGroup1 = ref(['Shanghai'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>
```
:::

# 边框
:::demo
```vue
<template>
    <ef-checkbox v-model="checked3" label="Option1" border />
    <ef-checkbox v-model="checked4" label="Option2" border />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked4 = ref(false)
const checked3 = ref(false)
const checkboxGroup1 = ref(['Option1'])
</script>
```
:::


# Checkbox 属性

| 属性             | 说明| 类型                               | 可选值        | 默认值 |
| --------------------- | --------------------------------------------------------- | ---------------------------------- | ---------------------- | ------- |
| model-value / v-model | 绑定值 | string / number / boolean          | —                      | —       |
| label                 | 选中状态的值 | string / number / boolean / object | — | — | 
| true-label            | 选中时的值                    | string / number                    | —                      | —       |
| false-label           | 没有选中时的值               | string / number                    | —                      | —       |
| disabled              | 是否禁用                         | boolean                            | —                      | false   |
| border                | 是否显示边框                  | boolean                            | —                      | false   |
| size                  | 尺寸 | string | large / default /small | —       |
| name                  | 原生 name 属性 | string | — | —       |
| checked               | 当前是否勾选 | boolean | — | false   |
| indeterminate         | 设置 indeterminate 状态，只负责样式控制 | boolean | — | false   |
| validate-event        | 输入时是否触发表单的校验 | boolean | - | true    |

# Checkbox Events

| Event Name | 说明                             | 参数        |
| ---------- | --------------------------------------- | ----------------- |
| change     | 当绑定值变化时触发的事件 | value |

# Checkbox Slots

| Name | 说明               |
| ---- | ------------------------- |
| —    | 默认内容 |

# Checkbox-group 属性

| 属性             | 说明                                       | 类型    | 可选值        | 默认值 |
| --------------------- | ------------------------------------------------- | ------- | ---------------------- | ------- |
| model-value / v-model | 绑定值 | array   | —                      | []      |
| size                  | 尺寸 | string  | large / default /small | —       |
| disabled              | 是否禁用   | boolean | —                      | false   |
| min                   | 最小数量 | number  | —                      | —       |
| max                   | 最大数量        | number  | —                      | —       |
| text-color            | 当按钮为活跃状态时的字体颜色 | string  | —                      | #ffffff |
| fill                  | 当按钮为活跃状态时的边框和背景颜色 | string  | —                      | #409EFF |
| validate-event        | 输入时是否触发表单的校验 | boolean | -                      | true    |

# Checkbox-group Events

| Event Name | 说明                             | 参数        |
| ---------- | --------------------------------------- | ----------------- |
| change     | 当绑定值变化时触发的事件 | the updated value |

# Checkbox-group Slots

| Name | 说明               | 子标签                    |
| ---- | ------------------------- | -------------------------- |
| -    | 默认内容 | Checkbox / Checkbox-button |

# Checkbox-button 属性

| 属性   | 说明 | 类型 | 可选值 | 默认值 | 
| ----------- | --------------------------------------------------------- | ---------------------------------- | --------------- | ------- |
| label       | 选中状态的值 | string / number / boolean / object | —               | —       |
| true-label  | 选中时的值 | string / number                    | —               | —       |
| false-label | 没有选中时的值 | string / number                    | —               | —       |
| disabled    | 是否禁用 | boolean                            | —               | false   |
| name        | 原生 name 属性 | string                             | —               | —       |
| checked     | 当前是否勾选 | boolean | —               | false   |

# Checkbox-button Slots

| Name | 说明               |
| ---- | ------------------------- |
| —    | 默认内容 |
