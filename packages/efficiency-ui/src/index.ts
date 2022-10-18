import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import Demo from '../demo/demo.vue';
createApp(Demo).use(EfficiencyUI).mount('#app');
