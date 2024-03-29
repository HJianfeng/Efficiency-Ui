import { App } from 'vue';
import { Button } from './components/Button';
import { Row } from './components/Row';
import { Col } from './components/Col';
import { Scrollbar } from './components/Scrollbar';
import { Link } from './components/Link';
import { Input } from './components/Input';
import { InputNumber } from './components/InputNumber';
import { Radio, RadioGroup, RadioButton } from './components/Radio';
import { Form, FormItem } from './components/Form';
import { Switch } from './components/Switch';
import { Tooltip } from './components/Tooltip';
import { Select, Option, OptionGroup } from './components/Select';
import { Tag } from './components/Tag';
import { Checkbox, CheckboxGroup, CheckboxButton } from './components/Checkbox';

const componentList = {
  Button,
  Row,
  Col,
  Scrollbar,
  Link,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Form,
  FormItem,
  Switch,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Select,
  Option,
  OptionGroup,
  Tag
};

// 导出单独组件
export {
  Button,
  Row,
  Col,
  Scrollbar,
  Link,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Form,
  FormItem,
  Switch,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Select,
  Option,
  OptionGroup,
  Tag
};
// 编写一个插件，实现一个install方法
export default {
  install(app: App): void {
    for (const key in componentList) {
      const com = componentList[key];
      app.component(com.name, com);
    }
  }
};
