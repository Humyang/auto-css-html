<template>
  <div class="preDefined">
    <el-button type="primary" @click="actionInsert">插入</el-button>
    <!-- {{rawData}} -->
    <div v-for="item,index in rawData.props" :key="index">
      <div v-if="item.type ===String" class="flex cell">
        <span class="label">{{item.name}}</span>
        <el-input v-model="item.value" placeholder="请输入内容"></el-input>
      </div>
      <div v-if="item.type ===Boolean" class="flex cell">
        <span class="label">{{item.name}}</span>
        <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
        <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import rawData from "./navMenu.js";
export default {
  data() {
    return {
      rawData
    };
  },
  methods: {
    actionInsert() {
      this.$emit("actionInsert", this.rawData);
    }
  }
};
</script>

<style>
.preDefined {
  margin-top: 15px;
}
.preDefined .label {
  min-width: 100px;
}
.preDefined .cell {
  /* min-width:100px; */
  margin-bottom: 15px;
}
</style>