<template>
  <div class="flex">
    <div class="preview mobile" @click="rootClick">
      <engine
        instanceType="preView"
        :currentSelect="currentSelect"
        v-on:actionClick="actionClick"
        :dataset="dataset"
        :controlView="controlView"
      ></engine>
    </div>
    <!-- <div style="padding-left: 20px;">
      <el-button type="danger" plain @click="actionSaveSelected">存入预设</el-button>

      <pickOnAll @actionInsert="actionInsert" @rawToPreView="rawToPreView" />
    </div>-->
  </div>
</template>

<script>
import engine from "./engine";
import pickOnAll from "./pickOnAll";

import resetUid from "@/utils/resetUid.js";
export default {
  props: ["dataset", "controlView"],
  components: {
    engine,
    pickOnAll
  },
  data() {
    return {
      currentSelect: []
    };
  },
  methods: {
    actionInsert(data) {
      this.$emit("actionInsert", data);
    },
    actionSaveSelected() {
      this.$emit("actionSaveSelected", this.currentSelect);
    },
    rootClick() {
      this.currentSelect = [];
      this.$emit("rootClick");
    },
    actionClick(dataset) {
      this.currentSelect = [dataset.id];
      this.$emit("currentSelect", dataset);
    }
  }
};
</script>

<style>
.preview {
  position: relative;
}
.mobile {
  width: 414px;
  height: 736px;
  background: #fff;
  margin: 0 auto;
  border: 4px solid #000;
  border-style: dotted;
  box-sizing: content-box;
  padding: 0;
  overflow: auto;
}
</style>