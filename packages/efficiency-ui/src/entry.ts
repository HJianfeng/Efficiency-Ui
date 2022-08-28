import { App } from 'vue';
import { Button } from './components/Button';
import { Row } from './components/Row';
import { Col } from './components/Col';

const componentList = [Button, Row, Col];
// 导出单独组件
export { Button, Row, Col };
// 编写一个插件，实现一个install方法
export default {
  install(app: App): void {
    componentList.forEach((com) => {
      app.component(com.name, com);
    });
  }
};
