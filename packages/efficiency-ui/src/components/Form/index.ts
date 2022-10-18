export type FormInstance = InstanceType<typeof Form>;
export type FormItemInstance = InstanceType<typeof FormItem>;

import Form from './form.vue';
import FormItem from './form-item.vue';
import { App } from 'vue';

export * from './form';
export * from './form-item';
export * from './types';
// 导出Button组件
export { Form, FormItem };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Form.name, Form);
    app.component(FormItem.name, FormItem);
  }
};
