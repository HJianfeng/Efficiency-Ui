# Button 按钮
常用操作按钮

# 基础用法
基础的函数用法

:::demo 使用`type`、`round`、`size`、`icon`属性来定义 Button 的样式。

```vue
<template>
 <div style="margin-bottom:20px;">
  <ef-button>默认按钮</ef-button>
  <ef-button type="primary">主要按钮</ef-button>
  <ef-button type="success">成功按钮</ef-button>
  <ef-button type="info">信息按钮</ef-button>
  <ef-button type="warning">警告按钮</ef-button>
  <ef-button type="danger">危险按钮</ef-button>
 </div>
 <div style="margin-bottom:20px;">
  <ef-button round>圆角按钮</ef-button>
  <ef-button round type="primary">主要按钮</ef-button>
  <ef-button round type="success">成功按钮</ef-button>
  <ef-button round type="info">信息按钮</ef-button>
  <ef-button round type="warning">警告按钮</ef-button>
  <ef-button round type="danger">危险按钮</ef-button>
 </div>
 <div style="margin-bottom:20px;">
  <ef-button type="primary" round icon="i-ic-baseline-search">搜索按钮</ef-button>
  <ef-button type="success" round icon="i-ic-baseline-edit">编辑按钮</ef-button>
  <ef-button type="info" round icon="i-ic-baseline-check">成功按钮</ef-button>
  <ef-button type="warning" round icon="i-ic-baseline-message">提示按钮</ef-button>
  <ef-button type="danger" round icon="i-ic-baseline-delete">删除按钮</ef-button>
 </div>
 <div style="margin-bottom:20px;">
  <ef-button type="primary" round icon="i-ic-baseline-search"></ef-button>
  <ef-button type="success" round icon="i-ic-baseline-edit"></ef-button>
  <ef-button type="info" round icon="i-ic-baseline-check"></ef-button>
  <ef-button type="warning" round icon="i-ic-baseline-message"></ef-button>
  <ef-button type="danger" round icon="i-ic-baseline-delete"></ef-button>
 </div>
</template>

```
:::
# 禁用状态
按钮不可用状态。

:::demo 你可以使用disabled属性来定义按钮是否可用，它接受一个Boolean值。
```vue
<template>
<div>
  <ef-button disabled>默认按钮</ef-button>
  <ef-button type="primary" disabled>主要按钮</ef-button>
  <ef-button type="success" disabled>成功按钮</ef-button>
  <ef-button type="info" disabled>信息按钮</ef-button>
  <ef-button type="warning" disabled>警告按钮</ef-button>
  <ef-button type="danger" disabled>危险按钮</ef-button>
</div>
</template>
```
:::
# 文字按钮
没有边框和背景色的按钮。
:::demo
```vue
<template>
  <ef-button type="text">文字按钮</ef-button>
  <ef-button type="text" disabled>文字按钮</ef-button>
</template>
```
:::

# 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。只要传入 icon 的 class 名称，具体可查看 `Icon 图标`

:::demo 设置 icon 属性即可，icon 的列表可以参考 icon 组件，也可以设置在文字右边的 icon ，只要使用 i 标签即可，可以使用自定义图标。

```vue
<template>
 <div class="flex flex-row">
  <ef-button icon="i-ic-baseline-edit" type="primary"></ef-button>
  <ef-button icon="i-ic-baseline-delete" type="primary"></ef-button>
  <ef-button icon="i-ic-baseline-share" type="primary"></ef-button>
  <ef-button round icon="i-ic-baseline-search" type="primary">搜索</ef-button>
 </div>
</template>
<style>
.ef-button {
  margin-right: 10px;
}
</style>
```
:::

# 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。
:::demo 要设置为 loading 状态，只要设置loading属性为true即可。
```vue
<template>
  <ef-button type="primary" :loading="true">加载中</ef-button>
</template>
```
:::

# 不同尺寸
Button 组件提供了三种尺寸，可以在不同场景下选择合适的按钮尺寸。
:::demo 额外的尺寸：medium、small、mini，通过设置size属性来配置它们。
```vue
<template>
  <ef-button size="large">大型按钮</ef-button>
  <ef-button size="medium">中等按钮</ef-button>
  <ef-button size="small">小型按钮</ef-button>
</template>
```
:::

## 全部属性

| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| size | 尺寸 | string | medium / small / mini | medium
| type | 类型 | string | primary / success / warning / danger / info / text | -
| round | 是否圆角按钮 | boolean | - | false
| loading | 是否加载中状态 | boolean | - | false
| disabled | 是否禁用状态 | boolean | - | false
| icon | 图标名称 | string | - | -
