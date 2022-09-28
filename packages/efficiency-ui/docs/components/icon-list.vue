<template>
  <ef-row class="demo-icon-block" style="margin-top: 20px">
    <ef-col :span="6" v-for="i in baseIcon" :key="i" class="demo-icon-item">
      <i :class="i"></i>
      <div class="label">{{ i }}</div>
    </ef-col>
  </ef-row>
</template>
<script>
import IconList from '../../config/icon';
export default {
  data() {
    return {
      baseIcon: IconList
    };
  }
};
</script>
<style lang="scss">
.demo-icon-block {
  /* display: flex;
  flex-wrap: wrap; */
  border: 1px solid #ddd;
  border-bottom: none;
  border-right: none;
}
.demo-icon-item {
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.demo-icon-item i {
  width: 30px;
  height: 30px;
  &:hover {
    color: #406eff;
  }
}
.demo-icon-item .label {
  text-align: center;
  margin-top: 10px;
  white-space: nowrap;
  font-size: 12px;
}
</style>
