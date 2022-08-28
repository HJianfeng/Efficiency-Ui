# Layout 布局
通过基础的 24 分栏，迅速简便地创建布局。

> 组件默认使用 Flex 布局，不需要手动设置 type="flex"。  
> 请注意父容器避免使用 inline 相关样式，会导致组件宽度不能撑满。

# 基础布局
使用列创建基础网格布局。 
   
通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

:::demo
```vue
<template>
  <ef-row>
    <ef-col :span="24"><div class="grid-content ep-bg-purple-dark" /></ef-col>
  </ef-row>
  <ef-row>
    <ef-col :span="12"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="12"><div class="grid-content ep-bg-purple-light" /></ef-col>
  </ef-row>
  <ef-row>
    <ef-col :span="8"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="8"><div class="grid-content ep-bg-purple-light" /></ef-col>
    <ef-col :span="8"><div class="grid-content ep-bg-purple" /></ef-col>
  </ef-row>
  <ef-row>
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple-light" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple-light" /></ef-col>
  </ef-row>
  <ef-row>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple-light" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple-light" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple-light" /></ef-col>
  </ef-row>
</template>
<style lang="scss">
.ef-row {
  margin-bottom: 20px;
}
.ef-row:last-child {
  margin-bottom: 0;
}
.ef-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
.ep-bg-purple-dark {
  background: #99a9bf;
}
</style>
```
:::

# 分栏间隔
支持列间距 
   
行提供 gutter 属性来指定列之间的间距，其默认值为0。
:::demo
```vue
<template>
  <ef-row :gutter="20">
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
  </ef-row>
</template>
```
:::

# 混合布局
通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
:::demo
```vue
<template>
  <ef-row :gutter="20">
    <ef-col :span="16"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="8"><div class="grid-content ep-bg-purple" /></ef-col>
  </ef-row>
  <ef-row :gutter="20">
    <ef-col :span="8"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="8"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
  </ef-row>
  <ef-row :gutter="20">
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="16"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="4"><div class="grid-content ep-bg-purple" /></ef-col>
  </ef-row>
</template>
```
:::
# 列偏移
您可以指定列偏移量。

通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。
:::demo
```vue
<template>
  <ef-row :gutter="20">
    <ef-col :span="6"><div class="grid-content ep-bg-purple" /></ef-col>
    <ef-col :span="6" :offset="6"><div class="grid-content ep-bg-purple"/></ef-col>
  </ef-row>
  <ef-row :gutter="20">
    <ef-col :span="6" :offset="6"><div class="grid-content ep-bg-purple"/></ef-col>
    <ef-col :span="6" :offset="6"><div class="grid-content ep-bg-purple"/></ef-col>
  </ef-row>
  <ef-row :gutter="20">
    <ef-col :span="12" :offset="6"><div class="grid-content ep-bg-purple"/></ef-col>
  </ef-row>
</template>
```
:::
# 响应式布局
预设了五个响应尺寸：xs、sm、md、lg 和 xl。
:::demo
```vue
<template>
  <ef-row :gutter="10">
    <ef-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content ep-bg-purple"/></ef-col>
    <ef-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ep-bg-purple-light"/></ef-col>
    <ef-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ep-bg-purple"/></ef-col>
    <ef-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content ep-bg-purple-light"/></ef-col>
  </ef-row>
</template>
```
:::

## Row 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| gutter | 栅格间隔 | number | -
| justify | 水平排列方式 | string | start/center/end/around/between/evenly | start
| align | 垂直排列方式 | string | start/center/end | start
| tag | 自定义元素标签 | string | - | div

## Col 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| span | 栅格占据的列数 | number | - | 24
| offset | 栅格左侧的间隔格数 | number | -  | 0
| push | 栅格向右移动格数 | number | - | 0
| pull | 栅格向左移动格数 | number | - | 0
| xs | <768px 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4}) | - | -
| sm | ≥768px 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4}) | - | -
| md | ≥992px 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4}) | - | -
| lg | ≥1200px 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4}) | - | -
| xl | ≥1920px 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4}) | - | -
| tag | 自定义元素标签 | string | - | div