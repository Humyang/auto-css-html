<template>
  <div class="mobile">
    <div class="flex column" v-for="item,index in preSave">
      <el-button type="primary" @click="rawToPreView(item)">插入</el-button>
      <engine :controlView="true" instanceType="preView" :key="index" :dataset="item"></engine>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import engine from "../../engine";

import resetUid from "@/utils/resetUid.js";
export default {
  data() {
    return {};
  },
  components: {
    engine
  },
  computed: {
    ...mapState({
      preSave: state => state.preSave
    })
  },
  methods: {
    rawToPreView(data) {
      this.$emit("rawToPreView", resetUid(JSON.parse(JSON.stringify(data))));
    }
  }
};
</script>

<style>
</style>