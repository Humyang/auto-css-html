<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="flex类" name="1">
      <div>
        <el-button
          v-for="(item, index) in config"
          :key="index"
          @click.native="actionEmit(item)"
        >{{ item.className }}</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Element UI 类" name="2">
      <iconNameSelect @change="actionNameSelect" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import config from "./config.js";

import iconNameSelect from "Component/pickOnAll/elementUi/component/iconNameSelect";
export default {
  name: "preClass",
  //   props:[''],
  components: { iconNameSelect },
  data() {
    return {
      config,
      activeName: "1"
    };
  },
  methods: {
    actionEmit(item) {
      this.$emit("actionClick", item.value);
    },
    actionNameSelect(value) {
      this.$emit("actionClick", value);
    }
  },
  computed: {},
  watch: {
    // example: {
    //   handler() {},
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {},
  mounted() {}
};
</script>

