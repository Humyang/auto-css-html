<template>
  <div class="preDefined">
    <el-button type="primary" @click="actionInsert">插入</el-button>
    <div v-for="item,index in rawData.props" :key="index">
      <div v-if="item.type ===String" class="flex cell">
        <span class="label">{{item.name}}</span>

        <el-input v-model="item.value" placeholder="请输入内容"></el-input>
        <el-select v-model="item.value" placeholder="请选择">
          <el-option v-for="w in item.options" :key="w" :label="w" :value="w"></el-option>
        </el-select>
      </div>
      <div v-if="item.type ===Boolean" class="flex cell">
        <span class="label">{{item.name}}</span>
        <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      rawData: {}
    };
  },
  methods: {
    actionInsert() {
      this.$emit("actionInsert", this.rawData);
    }
  },
  mounted() {
    this.rawData = this.data;
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