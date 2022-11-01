# Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

# 基础用法
:::demo
```vue
<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Top Left"
        placement="top-start"
      >
        <ef-button>top-start</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Top Center"
        placement="top"
      >
        <ef-button>top</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Top Right"
        placement="top-end"
      >
        <ef-button>top-end</ef-button>
      </ef-tooltip>
    </div>
    <div class="row">
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Left Top"
        placement="left-start"
      >
        <ef-button>left-start</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Right Top"
        placement="right-start"
      >
        <ef-button>right-start</ef-button>
      </ef-tooltip>
    </div>
    <div class="row">
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Left Center"
        placement="left"
      >
        <ef-button class="mt-3 mb-3">left</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Right Center"
        placement="right"
      >
        <ef-button>right</ef-button>
      </ef-tooltip>
    </div>
    <div class="row">
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom"
        placement="left-end"
      >
        <ef-button>left-end</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom"
        placement="right-end"
      >
        <ef-button>right-end</ef-button>
      </ef-tooltip>
    </div>
    <div class="row center">
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left"
        placement="bottom-start"
      >
        <ef-button>bottom-start</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center"
        placement="bottom"
      >
        <ef-button>bottom</ef-button>
      </ef-tooltip>
      <ef-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right"
        placement="bottom-end"
      >
        <ef-button>bottom-end</ef-button>
      </ef-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
```
:::

# 主题
通过设置 effect 来修改主题，默认值为 dark.  

当设置为 customized 时可以进行自定义
:::demo
```vue
<template>
  <ef-tooltip content="Dark" placement="top">
    <ef-button>Dark</ef-button>
  </ef-tooltip>
  <ef-tooltip content="Light" placement="top" effect="light">
    <ef-button>Light</ef-button>
  </ef-tooltip>

  <ef-tooltip content="Customized" placement="top" effect="customized">
    <ef-button>Customized theme</ef-button>
  </ef-tooltip>
</template>

<style>
.ef-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.ef-popper.is-customized .ef-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
```
:::

# 插槽
:::demo
```vue
<template>
  <ef-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <ef-button>Top center</ef-button>
  </ef-tooltip>
</template>
```
:::

# 显示 HTML 标签
通过设置 raw-content 为 true 来支持显示 HTML 标签
:::demo
```vue
<template>
  <ef-tooltip
   placement="top"
    content="<h1>HTML</h1><span>The content can be </span>"
    raw-content
  >
    <ef-button>hover me</ef-button>
  </ef-tooltip>
</template>
```
:::

# 受控模式
Tooltip 可以通过父组件使用 :visible 来控制它的显示与关闭。
:::demo
```vue
<template>
  <ef-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <ef-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </ef-button>
  </ef-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

```
:::

# 属性
| 属性                                | 说明                                                                                                                                                  | 类型                       | 接收类型                                                                                     | 默认                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| append-to                                | 指示 Tooltip 的内容将附加在哪一个网页元素上                                                                                                                | CSSSelector \| HTMLElement | —                                                                                                         | #ef-popper-container-[randomValue]                      |
| effect                                   | Tooltip 主题，内置了 dark / light 两种                                                                                                             | string                     | string                                                                                                    | dark                                                    |
| content                                  | 显示的内容，也可被 slot#content 覆盖                                                                                                        | String                     | —                                                                                                         | —                                                       |
| raw-content                              | content 中的内容是否作为 HTML 字符串处理                                                                                                               | boolean                    | —                                                                                                         | false                                                   |
| placement                                | Tooltip 组件出现的位置                                                                                                                                          | string                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| visible / v-model:visible                | Tooltip 组件可见性                                                                                                                                      | boolean                    | —                                                                                                         | false                                                   |
| disabled                                 | Tooltip 组件是否禁用                                                                                                                                | boolean                    | —                                                                                                         | false                                                   |
| offset                                   | 出现位置的偏移量                                                                                                                                       | number                     | —                                                                                                         | 0                                                       |
| transition                               | 动画名称                                                                                                                                             | string                     | —                                                                                                         | ef-fade-in-linear                                       |
| popper-options                           | [popper.js](https://popper.js.org/docs/v2/) 参数                                                                                                       | Object                     | refer to [popper.js](https://popper.js.org/docs/v2/) doc                                                  | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| show-after                               | 延迟出现，单位毫秒                                                                                                                         | number                     | —                                                                                                         | 0                                                       |
| show-arrow                               | tooltip 的内容是否有箭头                                                                                                             | boolean                    | true / false                                                                                              | true                                                    |
| hide-after                               | 延迟关闭，单位毫秒                                                                                                                           | number                     | —                                                                                                         | 200                                                     |
| auto-close                               | tooltip 出现后自动隐藏延时，单位毫秒                                                                                                                    | number                     | —                                                                                                         | 0                                                       |
| manual                                   | 是否手动控制 Tooltip。 如果设置为 true，mouseenter 和 mouseleave 将不会生效 | boolean                    | —                                                                                                         | false                                                   |
| popper-class                             | 为 Tooltip 的 popper 添加自定义类名 | string                     | —                                                                                                         | —                                                       |
| enterable                                | 鼠标是否可进入到 tooltip 中 | Boolean                    | —                                                                                                         | true                                                    |
| teleported                               | 是否使用 teleport。设置成 true则会被追加到 append-to 的位置 | boolean                    | true / false                                                                                              | true                                                    |
| trigger                                  | 如何触发 tooltip (来显示) | string                     | hover / click / focus / contextmenu                                                                       | hover                                                   |
| virtual-triggering                       | 用来标识虚拟触发是否被启用 | boolean                    | —                                                                                                         | false                                                   |
| virtual-ref                              | 表明 tooltip 绑定到哪个 html 元素 | HTMLElement                | —                                                                                                         | —                                                       |
| trigger-keys                             | 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示   | Array                      | —                                                                                                         | `['Enter','Space']`                                     |

# 插槽

| 插槽    | 说明                            |
| ------- | -------------------------------------- |
| —       | Tooltip 触发 & 引用的元素 |
| content | 自定义内容                     |
