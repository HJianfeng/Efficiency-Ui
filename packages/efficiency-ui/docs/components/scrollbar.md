# Scrollbar 滚动条
用于替换浏览器原生滚动条。达到美化滚动条的目的。

# 基础用法
通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

:::demo
```vue
<template>
  <ef-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </ef-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}

</style>
```
:::

# 横向滚动
当元素宽度大于滚动条宽度时，会显示横向滚动条。

:::demo
```vue
<template>
  <ef-scrollbar>
    <div class="scrollbar-flex-content" >
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </ef-scrollbar>
</template>
<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-flex-content .scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}
</style>

```
:::

# 最大高度
当高度大于某个值时，才会显示滚动条
:::demo
```vue
<template>
  <ef-button @click="add">Add Item</ef-button>
  <ef-button class="m-2" @click="onDelete">Delete Item</ef-button>
  <ef-scrollbar max-height="300px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-height-item">
      {{ item }}
    </p>
  </ef-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(3)

const add = () => {
  count.value++
}
const onDelete = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<style scoped>
.scrollbar-demo-height-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #406eff;
}
</style>
```
:::
## Scrollbar 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值
| --- | --- | --- | --- | --- |
| height | 滚动条高度 | string/number | -|-
| max-height | 滚动条最大高度 | string/number | - | -
| wrap-style | 包裹容器的自定义样式 | string | - | -
| wrap-class | 包裹容器的自定义类名 | string | - | -
| view-style | 视图的自定义样式 | string | - | -
| view-class | 视图的自定义类名 | string | - | -
| tag|视图的元素标签|string|-|div
| always|滚动条总是显示|boolean|-|false
| min-size|滚动条最小尺寸|number|-|20

## Scrollbar 事件

| 事件 | 说明 | 参数 
| --- | --- | --- |
| scroll | 滚动时触发的事件 | `滚动距离 { scrollLeft, scrollTop }`

## Scrollbar 方法

| 方法 | 说明 | 参数 
| --- | --- | --- |
| scrollTo | 滚动到一组特定坐标 | (options: ScrollToOptions | number, yCoord?: number)
| setScrollTop | 设置滚动条到顶部的距离 | (scrollTop: number)
| setScrollLeft | 设置滚动条到左边的距离 | (scrollLeft: number)
| update   | 手动更新滚动条状态 | -