import Radio from './radio.vue';
import RadioGroup from './radio-group.vue';
import RadioButton from './radio-button.vue';
import { App } from 'vue';

// 导出Button组件
export { Radio, RadioGroup, RadioButton };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Radio.name, Radio);
    app.component(RadioGroup.name, RadioGroup);
    app.component(RadioButton.name, RadioButton);
  }
};
