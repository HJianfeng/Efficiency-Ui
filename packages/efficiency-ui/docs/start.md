# 快速上手
本节将介绍如何在项目中使用 EfficiencyUI。

## 完整引入
在 main.js 中写入以下内容：
```js
import { createApp } from 'vue'
import App from './App.vue';
import EfficiencyUI from 'efficiency-ui'
import 'efficiency-ui/dist/style.css'

const app = createApp(App);
app.use(EfficiencyUI);
app.mount('#app');

```
样式文件需要单独引入。