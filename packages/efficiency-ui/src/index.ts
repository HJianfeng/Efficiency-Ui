import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
  <ef-input v-model="input" showPassword placeholder="Please input" />
  <ef-input v-model="input" maxlength="10" showWordLimit clearable placeholder="Please input" />
  <ef-input v-model="input" maxlength="10" showWordLimit type="textarea" placeholder="Please input" />
   `,
  data() {
    return {
      input: 20
    };
  },
  methods: {
    formatter(value) {
      return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    parser(value) {
      return value.replace(/\$\s?|(,*)/g, '');
    },
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
