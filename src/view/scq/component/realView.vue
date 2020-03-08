<template>
  <div>
    <!-- {{dataset}} -->
    <engine
      v-if="dataset.id"
      instanceType="realView"
      :dataset="dataset"
      v-on:actionClick="actionClick"
      :controlView="controlView"
    ></engine>
  </div>
</template>

<script>
import engine from "./engine";
export default {
  props: ["dataset", "controlView"],
  components: {
    engine
  },
  methods: {
    actionClick(dataset) {
      this.$emit("currentId", dataset);
    }
  }
};
</script>

<style>
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
