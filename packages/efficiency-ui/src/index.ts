import { createApp } from 'vue/dist/vue.esm-browser';
import SmartyUI from './entry';
createApp({
  template: `
    <div style="margin-bottom:20px;">
       <EFButton color="blue">主要按钮</EFButton>
       <EFButton color="green">绿色按钮</EFButton>
       <EFButton color="gray">灰色按钮</EFButton>
       <EFButton color="yellow">黄色按钮</EFButton>
       <EFButton color="red">红色按钮</EFButton>
   </div>
       `
})
  .use(SmartyUI)
  .mount('#app');
