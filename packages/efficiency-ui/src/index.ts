import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
    <ef-input-number v-model="num" :min="1" :max="12" step="2" @change="handleChange" />
    <ef-input-number controlsPosition="right" v-model="num" disabled :min="1" :max="10" @change="handleChange" />
   `,
  data() {
    return {
      num: ''
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
})
  .use(EfficiencyUI)
  .mount('#app');
