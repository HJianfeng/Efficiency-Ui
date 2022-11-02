import Checkbox from './checkbox.vue';
import CheckboxGroup from './checkbox-group.vue';
import CheckboxButton from './checkbox-button.vue';
import { App } from 'vue';

// 导出Button组件
export { Checkbox, CheckboxGroup, CheckboxButton };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Checkbox.name, Checkbox);
    app.component(CheckboxGroup.name, CheckboxGroup);
    app.component(CheckboxButton.name, CheckboxButton);
  }
};
