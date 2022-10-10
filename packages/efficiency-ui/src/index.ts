import { createApp } from 'vue/dist/vue.cjs';
import EfficiencyUI from './entry';
import { ref, onMounted } from 'vue';
import './style/demo.scss';
createApp({
  template: `
    <ef-radio-group ref="re1" v-model="radio"   @change="handleChange">
      <ef-radio  label="New York" />
      <ef-radio label="Washington" />
      <ef-radio label="Los Angeles" />
      <ef-radio label="Chicago" />
    </ef-radio-group>
   `,
  setup() {
    const radio = ref('');
    const re1 = ref(null);
    const handleChange = (val) => {
      console.log(val);
    };
    onMounted(() => {
      console.log(re1.value);
    });
    return {
      radio,
      handleChange,
      re1
    };
  }
})
  .use(EfficiencyUI)
  .mount('#app');
