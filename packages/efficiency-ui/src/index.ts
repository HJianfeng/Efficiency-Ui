import { createApp } from 'vue/dist/vue.esm-browser';
import SmartyUI from './entry';
createApp({
  template: `
    <div style="margin-bottom:20px;">
       <ef-button >确定</ef-button>
       <ef-button type="primary" icon="search" plain>确定</ef-button>
       <ef-button type="success" icon="search" plain>确定</ef-button>
       <ef-button type="info"  icon="search" @click="handelClick" disabled>确定点击</ef-button>
       <ef-button type="danger" size="large">确定</ef-button>
       <ef-button type="warning" disabled size="small">确定</ef-button>
       <ef-button type="warning" disabled size="small" round>确定</ef-button>
       <ef-button type="text" icon="search" disabled>确定</ef-button>
   </div>
   `,
  methods: {
    handelClick(e) {
      console.log('button click:', e);
    }
  }
})
  .use(SmartyUI)
  .mount('#app');
