import { App } from 'vue';
import { Button } from './components/Button';
import { Row } from './components/Row';
import { Col } from './components/Col';
import { Scrollbar } from './components/Scrollbar';
import { Link } from './components/Link';

const componentList = [Button, Row, Col, Scrollbar, Link];
// 导出单独组件
export { Button, Row, Col, Scrollbar, Link };
// 编写一个插件，实现一个install方法
export default {
  install(app: App): void {
    componentList.forEach((com) => {
      app.component(com.name, com);
    });
  }
};
