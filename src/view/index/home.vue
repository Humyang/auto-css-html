
<template>
  <el-container style="height:100%;">
    <!-- <el-aside >
      <el-menu
        :router="true"
        :default-active="activePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="scq">
          <i class="el-icon-menu"></i>
          <span slot="title">生成器</span>
        </el-menu-item>
        <el-menu-item index="pdsc">
          <i class="el-icon-menu"></i>
          <span slot="title">片段生成</span>
        </el-menu-item>
        <el-menu-item index="qiongju">
          <i class="el-icon-menu"></i>
          <span slot="title">穷举</span>
        </el-menu-item>
      </el-menu>
    </el-aside>-->
    <el-main style="margin:0;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// var config = require('../config')
// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// }

export default {
  name: "App",
  data() {
    return {
      isCollapse: false,
      activePath: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    updateActivePath(routerObj) {
      this.activePath = routerObj.name;
      //   console.log(routerObj.name);
    }
  },
  watch: {
    $route(to, from) {
      //   console.log(to,from)
      this.updateActivePath(to);
    }
  },
  mounted() {
    // alert(1);

    this.updateActivePath(this.$route);
  }
  //   ,
  // beforeRouteEnter(to, from, next){
  //     console.log(to,from)
  //     next()
  // }
};
</script>
<style>
li.el-menu-item {
  text-align: left;
}
.el-menu {
  border-right: 0;
}
html,
body,
#app {
  min-height: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
