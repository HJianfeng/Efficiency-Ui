# Link 链接
超链接

# 基础用法
基础用法。
:::demo
```vue
<template>
  <div>
    <ef-link href="https://github.com/HJianfeng/Efficiency-Ui">default</ef-link>
    <ef-link type="primary">primary</ef-link>
    <ef-link type="success">success</ef-link>
    <ef-link type="warning">warning</ef-link>
    <ef-link type="danger">danger</ef-link>
    <ef-link type="info">info</ef-link>
  </div>
</template>
<style scoped>
.ef-link {
  margin-right: 8px;
}
</style>
```
:::

# 禁用状态
不可用状态。
:::demo
```vue
<template>
  <div>
    <ef-link href="https://github.com/HJianfeng/Efficiency-Ui" disabled>default</ef-link>
    <ef-link type="primary" disabled>primary</ef-link>
    <ef-link type="success" disabled>success</ef-link>
    <ef-link type="warning" disabled>warning</ef-link>
    <ef-link type="danger" disabled>danger</ef-link>
    <ef-link type="info" disabled>info</ef-link>
  </div>
</template>
<style scoped>
.ef-link {
  margin-right: 8px;
}
</style>
```
:::

# 下划线
文字链接下划线。
:::demo
```vue
<template>
  <div>
    <ef-link href="https://github.com/HJianfeng/Efficiency-Ui">无下划线</ef-link>
    <ef-link href="https://github.com/HJianfeng/Efficiency-Ui" underline>有下划线</ef-link>
  </div>
</template>
<style scoped>
.ef-link {
  margin-right: 8px;
}
</style>
```
:::

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| type | 类型 | string | primary / success / warning / danger / info / default | default
| href | 原生 href 属性 | string | - | -
| target | 原生 target 属性 | string | - | _blank
| disabled | 是否禁用状态 | boolean | - | false
| underline | 是否有下划线 | boolean | - | false

