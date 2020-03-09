<template>
  <div style="text-align:left;">
    <el-button type="success" plain @click="pickOnAllVisible=true">在所有组件中选取</el-button>
    <el-dialog title="所有组件" :visible.sync="pickOnAllVisible" :fullscreen="true">
      <!-- <el-menu :default-active="rootPick" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="0">Element-UI</el-menu-item>
        <el-menu-item index="1">Vant</el-menu-item>
      </el-menu>-->
      <el-tabs v-model="rootPick">
        <el-tab-pane label="Element-UI" name="0">用户管理</el-tab-pane>
        <el-tab-pane label="Vant" name="1">
          <Vant @actionInsert="actionInsert" @rawToPreView="rawToPreView" />
        </el-tab-pane>
        <el-tab-pane label="自定义" name="2">
          <custom @rawToPreView="rawToPreView" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import Vant from "./Vant/index.vue";
import custom from "./custom/index";
export default {
  name: "pickOnAll",
  components: { Vant, custom },
  data() {
    return {
      rootPick: "1",
      pickOnAllVisible: false
    };
  },
  methods: {
    rawToPreView(data) {
      this.$emit("rawToPreView", data);
    },
    actionInsert(data) {
      this.pickOnAllVisible = false;
      this.$emit("actionInsert", data);
    }
  }
};
</script>