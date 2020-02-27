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
          <div style="min-width:300px">
            <el-button type="primary" @click="saveToCache(item)">存入缓存</el-button>
            <setPropery v-if="rootPick==item.tagName" @actionInsert="actionInsert" :data="item" />
          </div>
          <div class="grow">
            <div class="flex column" v-for="item,index in preSet[item.tagName]">
              <el-button type="primary" @click="rawToPreView(item)">插入</el-button>
              <engine :controlView="true" instanceType="preView" :key="index" :dataset="item"></engine>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import setPropery from "../setPropery";
import config from "./index.js";

import engine from "../../engine";
import { getFormatedData } from "@/utils/formatMethods";
import { mapMutations, mapActions, mapState } from "vuex";

import resetUid from "@/utils/resetUid.js";
export default {
  name: "pickOnAll",
  components: { setPropery, engine },
  data() {
    return {
      rootPick: "1",
      config
    };
  },
  computed: {
    ...mapState({
      preSet: state => state.preSet
    })
  },
  methods: {
    ...mapMutations(["SET_PRESET"]),
    rawToPreView(data) {
      this.$emit("rawToPreView", resetUid(JSON.parse(JSON.stringify(data))));
    },
    // actionInsert() {
    //   this.$emit("actionInsert", this.rawData);
    // },
    saveToCache(data) {
      this.SET_PRESET({
        tagName: data.tagName,
        dataset: getFormatedData(data)
      });
    },
    actionInsert(data) {
      this.$emit("actionInsert", data);
    }
  }
};
</script>