<template>
  <el-tabs tab-position="left">
    <!-- <el-tab-pane
      v-for="(item, index) in obj"
      :label="index"
      :key="index"
    ></el-tab-pane> -->
    <!-- <el-tab-pane  >用户管理</el-tab-pane> -->
    <!-- <el-tab-pane label="用户管理">用户管理</el-tab-pane> -->
    <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
  </el-tabs>
  <!-- <div>{{ obj }}</div> -->
</template>

<script>
export default {
  name: "CSSStyleDeclaration",
  //   props:[''],
  components: {},
  data() {
    return {
      obj: {}
    };
  },
  methods: {},
  computed: {},
  watch: {
    // example: {
    //   handler() {},
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {},
  mounted() {
    for (var i in document.body.style) {
      this.obj[i] = "";
      // this.list.push(i);
      // console.log(i);
    }
    this.obj = JSON.parse(JSON.stringify(this.obj));
  }
};
</script>
<style>
.el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
</style>
