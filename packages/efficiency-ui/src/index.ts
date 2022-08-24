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
   <div style="margin-bottom:20px;"
   >
       <EFButton color="blue" plain>朴素按钮</EFButton>
       <EFButton color="green" plain>绿色按钮</EFButton>
       <EFButton color="gray" plain>灰色按钮</EFButton>
       <EFButton color="yellow" plain>黄色按钮</EFButton>
       <EFButton color="red" plain>红色按钮</EFButton>
   </div>
   <div style="margin-bottom:20px;">
       <EFButton size="small" plain>小按钮</EFButton>
       <EFButton size="medium" plain>中按钮</EFButton>
       <EFButton size="large" plain>大按钮</EFButton>
   </div>
   <div style="margin-bottom:20px;">
       <EFButton color="blue" round plain icon="search">搜索按钮</EFButton>
       <EFButton color="green" round plain icon="edit">编辑按钮</EFButton>
       <EFButton color="gray" round plain icon="check">成功按钮</EFButton>
       <EFButton color="yellow" round plain icon="message">提示按钮</EFButton>
       <EFButton color="red" round plain icon="delete">删除按钮</EFButton>
   </div>
   <div style="margin-bottom:20px;">
       <EFButton color="blue" round plain icon="search"></EFButton>
       <EFButton size="small" color="green"  round plain icon="edit"></EFButton>
       <EFButton size="large" color="gray" round plain icon="check"></EFButton>
       <EFButton color="yellow" round plain icon="message"></EFButton>
       <EFButton color="red" round plain icon="delete"></EFButton>
   </div>
       `
})
  .use(SmartyUI)
  .mount('#app');
