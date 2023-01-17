# Tag 标签
Tag 标签

# 基础用法
基础用法。
:::demo
```vue
<template>
  <ef-tag>Tag 1</ef-tag>
  <ef-tag class="ml-2" type="success">Tag 2</ef-tag>
  <ef-tag class="ml-2" type="info">Tag 3</ef-tag>
  <ef-tag class="ml-2" type="warning">Tag 4</ef-tag>
  <ef-tag class="ml-2" type="danger">Tag 5</ef-tag>
</template>
```
:::

# 带关闭按钮标签
:::demo
```vue
<template>
  <ef-tag closable>Tag 1</ef-tag>
  <ef-tag class="ml-2" closable type="success">Tag 2</ef-tag>
  <ef-tag class="ml-2" closable type="info">Tag 3</ef-tag>
  <ef-tag class="ml-2" closable type="warning">Tag 4</ef-tag>
  <ef-tag class="ml-2" closable type="danger">Tag 5</ef-tag>
</template>
```
:::

# 不同尺寸
:::demo
```vue
<template>
  <ef-row>
    <ef-tag class="mx-1" size="large">Large</ef-tag>
    <ef-tag class="mx-1">默认</ef-tag>
    <ef-tag class="mx-1" size="small">Small</ef-tag>
  </ef-row>

  <ef-row class="mt-4">
    <ef-tag class="mx-1" size="large" closable>Large</ef-tag>
    <ef-tag class="mx-1" closable>默认</ef-tag>
    <ef-tag class="mx-1" size="small" closable>Small</ef-tag>
  </ef-row>
</template>
```
:::

# 主题
Tag 组件提供了三个不同的主题：dark、light 和 plain。

通过设置 effect 属性来改变主题，默认为 light。
:::demo
```vue
<template>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1 line-height-2">Dark</span>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
    >
      {{ item.label }}
    </ef-tag>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
      closable
    >
      {{ item.label }}
    </ef-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Light</span>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="light"
    >
      {{ item.label }}
    </ef-tag>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="light"
      closable
    >
      {{ item.label }}
    </ef-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Plain</span>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="plain"
    >
      {{ item.label }}
    </ef-tag>
    <ef-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="plain"
      closable
    >
      {{ item.label }}
    </ef-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])
</script>

```
:::

# 圆形标签
:::demo
```vue
<template>
  <div class="flex flex-wrap gap-2 my-2">
    <ef-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
      round
    >
      {{ item.label }}
    </ef-tag>
  </div>
  <div class="flex flex-wrap gap-2">
    <ef-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="light"
      round
    >
      {{ item.label }}
    </ef-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <ef-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="plain"
      round
    >
      {{ item.label }}
    </ef-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const items = ref([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])
</script>
```
:::


# 属性

| 名称                | 描述                          | 类型    | 可选值             | 默认 |
| ------------------- | ------------------------------------ | ------- | --------------------------- | ------- |
| type                | 类型                      | string  | success/info/warning/danger | —       |
| closable            | 是否可关闭           | boolean | —                           | false   |
| disable-transitions | 是否禁用渐变动画        | boolean | —                           | false   |
| hit                 | 是否有边框描边 | boolean | —                           | false   |
| color               | 背景色          | string  | —                           | —       |
| size                | 尺寸                          | string  | large / default /small      | default |
| effect              | 主题                    | string  | dark / light / plain        | light   |
| round               | 是否为圆形             | boolean | —                           | false   |

# 事件

| 名称  | 描述                  | Parameters |
| ----- | ---------------------------- | ---------- |
| click | 点击 Tag 时触发的事件 | —          |
| close | 关闭 Tag 时触发的事件 | —          |

# 插槽

| 名称 | 描述               |
| ---- | ------------------------- |
| —    | 默认内容 |

# CheckTag 属性

| 名称    | 描述 | 类型    | 可选值 | 默认 |
| ------- | ----------- | ------- | --------------- | ------- |
| checked | 是否选中  | boolean | true/false      | —       |

# CheckTag 事件

| 名称   | 描述                        | Parameters |
| ------ | ---------------------------------- | ---------- |
| change | 点击 Check Tag 时触发的事件 | checked    |

# CheckTag 插槽

| 名称 | 描述               |
| ---- | ------------------------- |
| —    | 默认内容 |
