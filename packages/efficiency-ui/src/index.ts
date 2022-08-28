import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
    <ef-row justify="start" align="center" :gutter="10">
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   <ef-row justify="start" :gutter="10">
   <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   <ef-col :span="6" :pull="2"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   <ef-row justify="end" :gutter="10">
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   <ef-row justify="around" :gutter="10">
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   <ef-row justify="between" :gutter="10">
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   <ef-row justify="evenly" :gutter="10">
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
      <ef-col :span="8"><div class="grid-content bg-purple" /></ef-col>
   </ef-row>
   `,
  methods: {
    handelClick(e) {
      console.log('button click:', e);
    }
  }
})
  .use(EfficiencyUI)
  .mount('#app');
