import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
  <ef-link href="https://www.baidu.com" underline>链接</ef-link>
  <ef-link href="https://www.baidu.com" type="primary">链接</ef-link>
  <ef-link href="https://www.baidu.com" type="info" disabled>链接</ef-link>
  <ef-link href="https://www.baidu.com" type="danger" disabled>链接</ef-link>
  <ef-link href="https://www.baidu.com" type="warning" disabled>链接</ef-link>
  <ef-link href="https://www.baidu.com" type="success">链接</ef-link>
   `,
  data() {
    return {
      count: 20
    };
  },
  methods: {
    add() {
      this.$refs.scrollbarRef.setScrollTop(200);
    },
    onDelete() {
      this.count--;
    },
    scroll(e) {
      console.log('scroll:', e);
    }
  }
})
  .use(EfficiencyUI)
  .mount('#app');
