# Form 表单

# 基础使用
在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。
:::demo
```vue
<template>
  <ef-form :model="form" label-width="70px">
    <ef-form-item label="名称">
      <ef-input v-model="form.name" />
    </ef-form-item>
    <ef-form-item label="单选">
      <ef-radio-group v-model="form.resource">
        <ef-radio label="Sponsor" />
        <ef-radio label="Venue" />
      </ef-radio-group>
    </ef-form-item>
    <ef-form-item label="输入">
      <ef-input v-model="form.desc" type="textarea" />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" style="margin-right: 10px;" @click="onSubmit">确定</ef-button>
      <ef-button>取消</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
  name: '',
  resource: '',
  desc: '',
})
const onSubmit = () => {
  console.log('submit!')
}
</script>

```
:::

# 行内表单
当垂直方向空间受限且表单较简单时，可以在一行内放置表单。  
  
通过设置 inline 属性为 true 可以让表单域变为行内的表单域。
:::demo
```vue
<template>
  <ef-form :model="form" inline label-width="40px">
    <ef-form-item label="名称">
      <ef-input v-model="form.name" />
    </ef-form-item>
    <ef-form-item label="输入">
      <ef-input v-model="form.desc" />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" style="margin-right: 10px;" @click="onSubmit">确定</ef-button>
      <ef-button>取消</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
  name: '',
  desc: '',
})
const onSubmit = () => {
  console.log('submit!')
}
</script>

```
:::

# 对齐方式
通过设置 label-position 属性可以改变表单域标签的位置，可选值为 top、left， 当设为 top 时标签会置于表单域的顶部

:::demo
```vue
<template>
  <ef-radio-group v-model="labelPosition" label="label position">
    <ef-radio-button label="left">Left</ef-radio-button>
    <ef-radio-button label="right">Right</ef-radio-button>
    <ef-radio-button label="top">Top</ef-radio-button>
  </ef-radio-group>
  <div style="margin: 20px" />
  <ef-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <ef-form-item label="Name">
      <ef-input v-model="formLabelAlign.name" />
    </ef-form-item>
    <ef-form-item label="Activity zone">
      <ef-input v-model="formLabelAlign.region" />
    </ef-form-item>
    <ef-form-item label="Activity form">
      <ef-input v-model="formLabelAlign.type" />
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>
```
:::

# 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。
:::demo
```vue
<template>
  <ef-form ref="formRef" :model="form" :rules="rules" label-width="70px">
    <ef-form-item label="名称" prop="name">
      <ef-input v-model="form.name" />
    </ef-form-item>
    <ef-form-item label="单选" prop="resource">
      <ef-radio-group v-model="form.resource">
        <ef-radio label="Sponsor" />
        <ef-radio label="Venue" />
      </ef-radio-group>
    </ef-form-item>
    <ef-form-item label="描述" prop="desc">
      <ef-input v-model="form.desc" type="textarea" />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" style="margin-right: 10px;" @click="onSubmit">确定</ef-button>
      <ef-button @click="resetFields">重置</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formRef = ref();
const form = reactive({
  name: '',
  resource: '',
  desc: '',
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度限制在 3 到 5个字内', trigger: 'blur' },
  ],
  resource: [{ required: true,message: '请选择单选',trigger: 'change'}],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
})
const onSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetFields = () => {
  formRef.value.resetFields()
}
</script>

```
:::

# 自定义校验规则
这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::demo
```vue
<template>
  <ef-form ref="formRef" :model="form" :rules="rules" label-width="70px">
    <ef-form-item label="名称" prop="name">
      <ef-input v-model="form.name" />
    </ef-form-item>
    <ef-form-item label="单选" prop="resource">
      <ef-radio-group v-model="form.resource">
        <ef-radio label="Sponsor" />
        <ef-radio label="Venue" />
      </ef-radio-group>
    </ef-form-item>
    <ef-form-item label="描述" prop="desc">
      <ef-input v-model="form.desc" type="textarea" />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" style="margin-right: 10px;" @click="onSubmit">确定</ef-button>
      <ef-button @click="resetFields">重置</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formRef = ref();
const form = reactive({
  name: '',
  resource: '',
  desc: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ required: true, validator: validatePass, trigger: 'blur' }],
  resource: [{ required: true, validator: validatePass, trigger: 'change'}],
  desc: [{ required: true, validator: validatePass,  trigger: 'blur' }],
})
const onSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetFields = () => {
  formRef.value.resetFields()
}
</script>

```
:::

# 数字类型验证
数字类型的验证需要在 v-model 处加上 .number 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。

:::demo
```vue
<template>
  <ef-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <ef-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]"
    >
      <ef-input
        v-model.number="numberValidateForm.age"
        type="text"
        autocomplete="off"
      />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" style="margin-right: 10px;" @click="submitForm(formRef)">确定</ef-button>
      <ef-button @click="resetForm(formRef)">重置</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const numberValidateForm = reactive({
  age: '',
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
```
:::

# Form 属性

| 属性                   | 说明                                                                                                                    | 类型                              | 默认值   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | --------- |
| `model`                     | 表单数据对象 | -             | —         |
| `rules`                     | 表单验证规则 | `FormRules`                       | —         |
| `inline`                    | 行内表单模式 | `boolean`                         | `false`   |
| `label-position`            | 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 | `'left' \| 'right' \| 'top'`      | `'right'` |
| `label-width`               | 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 | `string \| number`                | —         |
| `label-suffix`              | 表单域标签的后缀 | `string`                          | —         |
| `hide-required-asterisk`    | 是否隐藏必填字段标签旁边的红色星号。 | `boolean`                         | `false`   |
| `require-asterisk-position` | 星号的位置。  | `'left' \| 'right'`               | `'left'`  |
| `show-message`              | 是否显示校验错误信息 | `boolean` | `true`    |
| `inline-message`            | 是否以行内形式展示校验信息 | `boolean` | `false`   |
| `status-icon`               | 是否在输入框中显示校验结果反馈图标 | `boolean` | `false`   |
| `validate-on-rule-change`   | 是否在 rules 属性改变后立即触发一次验证 | `boolean` | `true`    |
| `size`                      | 用于控制该表单内组件的尺寸 | `'large' \| 'default' \| 'small'` | —         |
| `disabled`                  | 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性 | `boolean`                         | `false`   |
| `scroll-to-error`           | 当校验失败时，滚动到第一个错误表单项 | `boolean` | `false`   |

# Form 方法

| 方法          | 说明                                                        | 类型                                                                                                                             |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `validate`      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。 | `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                  |
| `validateField` | 验证具体的某个字段。 | `(props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| `resetFields`   | 重置该表单项，将其值重置为初始值，并移除校验结果 | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |
| `scrollToField` | 滚动到指定的字段 | `(prop: FormItemProp) => void`                                                                                                   |
| `clearValidate` | 清理某个字段的表单验证信息。 | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |

# Form 事件

| Event 名称 | 说明                             | 传参                                                        |
| ---------- | --------------------------------------- | ----------------------------------------------------------------- |
| `validate` | 任一表单项被校验后触发 | `(prop: FormItemProp, isValid: boolean, message: string) => void` |

# Form 插槽

| 名称 | 说明               | 子标签  |
| ---- | ------------------------- | -------- |
| -    | 自定义默认内容 | FormItem |


# Form Item 属性

| 属性        | 说明                                                                                                                                                   | 类型                              | 默认值     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `prop`           | model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。 在定义了 validate、resetFields 的方法时，该属性是必填的 | `string \| string[]`              | —           |
| `label`          | 标签文本 | `string`                          | —           |
| `label-width`    | 标签宽度，例如 '50px'。 可以使用 auto。 | `string \| number`                | —           |
| `required`       | 是否为必填项，如不设置，则会根据校验规则确认 | `boolean`                         | `false`     |
| `rules`          | 表单验证规则。更多内容可以参考 [async-validator](https://github.com/yiminghe/async-validator).    | `FormItemRule \| FormItemRule[]`  | —           |
| `error`          | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 | `string`                          | —           |
| `show-message`   | 是否显示校验错误信息 | `boolean`                         | `true`      |
| `inline-message` | 是否在行内显示校验信息 | `boolean`                         | `false`     |
| `size`           | 用于控制该表单域下组件的默认尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |

# FormItemRule

| 名称      | 说明                     | 类型                 | 默认值 |
| --------- | ------------------------------- | -------------------- | ------- |
| `trigger` | 验证逻辑的触发方式 | `'blur' \| 'change'` | —       |

# Form Item 插槽

| 名称    | 说明                                   | 插槽作用域  |
| ------- | --------------------------------------------- | ----------- |
| —       | 表单的内容。                        | —           |
| `label` | 标签位置显示的内容          | `{ label }` |
| `error` | 验证错误信息的显示内容 | `{ error }` |

# Form Item 方法

| 方法          | 说明                                       | 类型         |
| --------------- | ------------------------------------------------- | ------------ |
| `resetField`    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | `() => void` |
| `clearValidate` | 移除该表单项的校验结果 | `() => void` |
