<template>
  <div style="text-align:left;">
    <el-button type="success" plain @click="visible=true">选择图标</el-button>
    <el-dialog title="选择图标" :visible.sync="visible" :modal="false" :fullscreen="true">
      <div style="flex-flow: wrap;" class="flex">
        <div
          class="flex vcenter icon-wrap"
          v-for="item in iconConfig"
          @click="actionSelected(item)"
        >
          <!-- <div> -->
          <i :class="item"></i>
          <p>{{item}}</p>
          <!-- </div> -->
        </div>
      </div>
      <!-- {{iconConfig}} -->
    </el-dialog>
  </div>
</template>

<script>
import iconConfig from "./iconConfig";
export default {
  data() {
    return {
      visible: false,
      iconConfig
    };
  },
  methods: {
    actionSelected(item) {
      this.visible = false;
      this.$emit("change", item);
    }
  }
};
</script>

<style>
.icon-wrap {
  /* display: inline-block; */
  width: 100px;
  height: 100px;
  /* font-size: 20px; */
  border: 1px solid #ddd;
  padding: 5px;
  margin: 5px;
  flex-direction: column;
}

.icon-wrap:hover {
  background: #8ce5f1;
  border: 1px solid #8ce5f1;
  cursor: pointer;
}

.icon-wrap i {
  font-size: 40px;
}
.icon-wrap p,
.icon-wrap i {
  padding: 0;
  margin: 0;
}
</style>