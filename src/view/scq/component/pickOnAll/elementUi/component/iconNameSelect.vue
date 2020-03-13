<template>
  <div style="text-align:left;">
    <el-button type="success" plain @click="visible=true">在所有组件中选取</el-button>
    <el-dialog title="所有组件" :visible.sync="visible" :fullscreen="true"></el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style>
</style>