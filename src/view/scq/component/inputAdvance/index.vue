<template>
  <div>
    <el-button @click="popup=true" type="primary" icon="el-icon-edit" circle></el-button>
    <el-dialog title="辅助输入" :modal="false" :visible.sync="popup">
      <el-tabs>
        <el-tab-pane label="Number" name="0">
          <numberInput @valueChange="valueChange" />
        </el-tab-pane>
      </el-tabs>

      <el-button type="primary" circle @click="popup=false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
import numberInput from "./number";
export default {
  components: {
    numberInput
  },
  data() {
    return {
      popup: false
    };
  },
  methods: {
    valueChange(value) {
      this.$emit("valueChange", value);
    }
  }
};
</script>

<style>
</style>