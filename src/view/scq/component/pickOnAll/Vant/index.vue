<template>
  <div>
    <el-tabs v-model="rootPick" tab-position="left">
      <!-- <el-tab-pane label="Element-UI" name="0">用户管理</el-tab-pane>
      <el-tab-pane label="Vant" name="1">配置管理</el-tab-pane>-->
      <el-tab-pane
        v-for="item,index in config"
        :key="index"
        :label="item.desc"
        :name="item.tagName"
      >
        <div class="flex">
          <div>
            <el-button type="primary" @click="saveToCache(item)">存入</el-button>
            <setPropery v-if="rootPick==item.tagName" @actionInsert="actionInsert" :data="item" />
          </div>
          <div></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import setPropery from "../setPropery";
import config from "./index.js";

import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "pickOnAll",
  components: { setPropery },
  data() {
    return {
      rootPick: "1",
      config
    };
  },
  methods: {
    ...mapMutations(["SET_PRESET"]),
    saveToCache() {
      this.SET_PRESET({ tagname: item.tagName });
    },
    actionInsert(data) {
      this.$emit("actionInsert", data);
    }
  }
};
</script>