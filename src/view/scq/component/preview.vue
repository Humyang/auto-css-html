<template>
  <div>
    <el-button type="danger" plain @click="actionSaveSelected">存入预设</el-button>
    <div class="preview mobile" @click="rootClick">
      <engine
        instanceType="preView"
        v-for="item,index in dataset"
        :key="index"
        :currentSelect="currentSelect"
        v-on:actionClick="actionClick"
        :dataset="item"
        :controlView="controlView"
      ></engine>
    </div>
  </div>
</template>

<script>
import engine from "./engine";
export default {
  props: ["dataset", "controlView"],
  components: {
    engine
  },
  data() {
    return {
      currentSelect: []
    };
  },
  methods: {
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
  border: 2px solid #000;
  border-style: dotted;
  box-sizing: content-box;
}
</style>