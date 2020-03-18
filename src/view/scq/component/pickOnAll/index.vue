<template>
  <div style="text-align:left;">
    <el-button type="success" plain @click="pickOnAllVisible=true">在所有组件中选取</el-button>
    <el-dialog title="所有组件" :visible.sync="pickOnAllVisible" :fullscreen="true">
      <!-- <el-menu :default-active="rootPick" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="0">Element-UI</el-menu-item>
        <el-menu-item index="1">Vant</el-menu-item>
      </el-menu>-->
      <el-tabs v-model="rootPick" v-if="pickOnAllVisible">
        <el-tab-pane label="Element-UI" name="0">
          <!-- @actionInsert="actionInsert" -->
          <loader :config="elementConfig" @rawToPreView="rawToPreView" />
        </el-tab-pane>
        <el-tab-pane label="Vant" name="1">
          <!-- @actionInsert="actionInsert" -->
          <loader :config="vantConfig" @rawToPreView="rawToPreView" />
        </el-tab-pane>
        <el-tab-pane label="自定义" name="2">
          <!-- <custom @rawToPreView="rawToPreView" /> -->
          <!-- @actionInsert="actionInsert" -->
          <loader :config="customConfig" @rawToPreView="rawToPreView" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import vantConfig from "./Vant/index.js";
import elementConfig from "./elementUi/index";
import customConfig from "./custom";
// import Vant from "./Vant/index.vue";

import loader from "./loader";
// import custom from "./custom/index";
export default {
  name: "pickOnAll",
  components: {
    // Vant,
    // custom,
    // setValue
    loader
  },
  data() {
    return {
      customConfig,
      vantConfig,
      elementConfig,
      rootPick: "0",
      pickOnAllVisible: false
    };
  },
  methods: {
    rawToPreView(data) {
      this.$emit("rawToPreView", data);
    },
    actionInsert(data) {
      this.pickOnAllVisible = false;
      // this.$emit("actionInsert", data);
    }
  }
};
</script>
<style >
.componentIframe {
  width: 600px;
  height: 300px;
  border: 4px solid #333;
}
</style>