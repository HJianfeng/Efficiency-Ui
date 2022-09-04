import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
  <ef-button @click="add">Add Item</ef-button>
  <ef-button @click="onDelete">Delete Item</ef-button>
  <ef-scrollbar ref="scrollbarRef"  max-height="400px" always>
    <div ref="innerRef">
      <p v-for="item in count" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </ef-scrollbar>
  <ef-scrollbar always>
    <div class="scrollbar-flex-content" >
      <p v-for="item in count" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </ef-scrollbar>
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
