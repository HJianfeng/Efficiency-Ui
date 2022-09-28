import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import './style/demo.scss';
createApp({
  template: `
      <ef-input v-model="input" prefixIcon="i-ic-baseline-search" suffix-icon="i-ic-baseline-search">
        <template #prepend>
          <div>asas</div>
        </template>
      </ef-input>
   `,
  data() {
    return {
      input: ''
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
      console.log(this.$refs.aaa);
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
