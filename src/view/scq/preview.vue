<template>
  <div class="fix-full">
    <!-- <realView :dataset="dataset" :controlView="true"></realView> -->
    <engine
      instanceType="preView"
      :currentSelect="currentSelect"
      v-on:actionClick="actionClick"
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
export default {
  components: { realView, engine },

  data() {
    return {
      dataset: {},

      currentSelect: []
    };
  },
  methods: {
    async actionClick(dataset) {
      this.currentSelect = [dataset.id];
      let v = await parentDataset.dataset.get("1");
      parentDataset.dataset.update("1", {
        currentSelect: this.currentSelect
      });
      //   this.$emit("currentSelect", dataset);
    }
  },
  async mounted() {
    setInterval(async () => {
      //   this.dataset = parent.INS.$store.state.dataset;
      // parentDataset.
      let v = await parentDataset.dataset.get("1");
      this.dataset = v.dataset;
    }, 500);
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