<h1 align="center" dir="auto">Efficiency-Ui</h1>
<p align="center">
<a href="https://www.npmjs.com/package/efficiency-ui"><img src="https://img.shields.io/npm/v/efficiency-ui" alt="NPM version"></a>
</p>

[![CI](https://github.com/HJianfeng/Smarty-Ui/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/HJianfeng/Smarty-Ui/actions/workflows/main.yml)  ![GitHub](https://img.shields.io/github/license/HJianfeng/efficiency-ui?color=red) [![codecov](https://codecov.io/gh/HJianfeng/Efficiency-Ui/branch/main/graph/badge.svg?token=08R9NHYG4H)](https://codecov.io/gh/HJianfeng/Efficiency-Ui)

## Features

简单高效UI组件库
- 基于Vue框架
- 支持JSX与Vue单文件组件
- Jest + Vue3 plugins实现单元测试
- Eslint + Prettier + Husky 语法检查
- 采用Rollup构建
- Vitepress + Vercel 文档网站搭建
- 基于Action CI 实现持续集成与交付

## Install
```
npm i efficiency-ui
```

## Quick Start
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
浏览 [Getting Started.](https://efficiency-ui.vercel.app/)


## LICENSE
[MIT](../../LICENSE)