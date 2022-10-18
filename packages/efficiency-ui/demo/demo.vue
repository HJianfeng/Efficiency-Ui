<template>
  <ef-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="150px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <ef-form-item label="Activity name" prop="name">
      <ef-input v-model="ruleForm.name" />
    </ef-form-item>
    <ef-form-item label="Resources" prop="resource">
      <ef-radio-group v-model="ruleForm.resource">
        <ef-radio label="Sponsorship" />
        <ef-radio label="Venue" />
      </ef-radio-group>
    </ef-form-item>
    <ef-form-item label="Activity form" prop="desc">
      <ef-input v-model="ruleForm.desc" type="textarea" />
    </ef-form-item>
    <ef-form-item>
      <ef-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</ef-button
      >
      <ef-button @click="resetForm(ruleFormRef)">Reset</ef-button>
    </ef-form-item>
  </ef-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const formSize = ref('');
const ruleFormRef = ref('');
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: undefined
});

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'change' }
  ]
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
