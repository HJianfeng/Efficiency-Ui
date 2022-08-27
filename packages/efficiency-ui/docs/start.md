# 快速上手
本节将介绍如何在项目中使用 EfficiencyUI。

## 完整引入
在 main.js 中写入以下内容：
```js
import Vue from 'vue';
import EfficiencyUI from 'efficiency-ui';
import 'efficiency-ui/dist/style.css';
import App from './App.vue';

Vue.use(EfficiencyUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
样式文件需要单独引入。
