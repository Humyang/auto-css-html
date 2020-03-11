<template>
  <div class="fix-full">
    <engine
      instanceType="preView"
      :currentSelect="currentSelect"
      :dataset="dataset"
      v-if="dataset.id"
      :controlView="true"
    ></engine>
  </div>
</template>

<script>
import realView from "./component/realView";

import engine from "./component/engine";
import { mapMutations, mapActions, mapState } from "vuex";
import uid2 from "uid2";
export default {
  components: { realView, engine },

  data() {
    return {
      dataset: {},

      currentSelect: []
    };
  },

  async mounted() {
    let modifyFlag = "";
    let id = this.$route.params.id;
    // setInterval(async () => {
    //   this.dataset = parent.INS.$store.state.dataset;
    // parentDataset.
    let v = await parentDataset.componentCache.get(id);
    // if (modifyFlag != v.modifyFlag) {
    this.dataset = v.dataset;
    // }
    // }, 100);
  }
};
</script>

<style>
.fix-full {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
}
.preview {
  /* height: 100%; */
  /* box-sizing: border-box; */
  border: 1px solid black;
  padding: 20px;

  box-sizing: content-box;
}
.preview {
  /* height: 100%; */
  /* box-sizing: border-box; */
  border: 1px solid black;
  padding: 20px;

  box-sizing: content-box;
}
.preview {
  background-color: #d4d4d4;
}
.selected {
  background-color: #ffaf3a;
}
.preview {
  position: relative;
}
</style>