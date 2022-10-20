<template>
  {{ value1 }}
  {{ value2 }}
  <div><ef-switch loading size="large" v-model="value1" /></div>

  <div>
    <ef-switch
      activeText="是"
      inactiveText="否"
      v-model="value2"
      class="ml-2"
      size="large"
    />
  </div>
  <div>
    <ef-switch
      activeIcon="i-line-md-cloud-loop"
      inactiveIcon="i-line-md-cloud-outline-loop"
      v-model="value2"
      size="small"
      class="ml-2"
    />
  </div>

  <div>
    <ef-switch
      inlinePrompt
      activeText="是"
      inactiveText="否"
      v-model="value2"
      size="large"
      class="ml-2"
    />
  </div>
  <div>
    <ef-switch
      inlinePrompt
      activeIcon="i-line-md-cloud-loop"
      inactiveIcon="i-line-md-cloud-outline-loop"
      v-model="value2"
      class="ml-2"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// style="--ef-switch-on-color: #13ce66; --ef-switch-off-color: #ff4949"
const value1 = ref(true);
const value2 = ref(true);
</script>
