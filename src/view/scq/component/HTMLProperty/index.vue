<template>
  <div>
    <div>
      <div class="flex align-baseline">
        <div>标签类型</div>
        <div style="margin-left:20px">
          <el-autocomplete
            class="inline-input"
            v-model="dataObj.tagType"
            :fetch-suggestions="tagTypeFilter"
            placeholder="请输入内容"
          ></el-autocomplete>
        </div>
      </div>
      <el-button type="primary" @click="addSubText">添加文本</el-button>
      <div class="flex align-center" v-for="item,index in dataObj.subset">
        <div>文本</div>
        <div style="margin-left:20px">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dataObj.subset[index]"></el-input>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="addProperty">添加属性</el-button>
    <div v-for="property,index in dataObj.property" :key="index">
      <div class="flex align-baseline">
        <div>
          <el-autocomplete
            class="inline-input"
            v-model="property.property"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
          ></el-autocomplete>
        </div>
        <div class="flex align-baseline">
          <el-input placeholder="请输入内容" v-model="property.value" class="input-with-select"></el-input>
          <!-- <el-button>保存</el-button> -->
          <el-button type="danger" @click="actionRemove(index)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "./config";
export default {
  name: "HTMLProperty",
  components: {},
  data() {
    let labelArr = [];
    for (let index = 0; index < config.length; index++) {
      const element = config[index];
      for (let si = 0; si < element.children.length; si++) {
        const ee = element.children[si];
        labelArr.push(ee.label);
      }
    }
    return {
      config,
      tagType: "",
      dataObj: {}
    };
  },
  methods: {
    addSubText() {
      this.dataObj.subset.push("");
    },
    tagTypeFilter(queryString, cb) {
      let tageTypeArray = [
        "div",
        "view",
        "image",
        "text",
        "span",
        "van-nav-bar"
      ];
      let arr = [];
      for (let index = 0; index < tageTypeArray.length; index++) {
        const element = tageTypeArray[index];
        if (element.indexOf(queryString) != -1) {
          arr.push({ value: element });
        }
      }
      arr = arr.sort((a, b) => {
        return a.length - b.length;
      });
      cb(arr);
    },
    actionHtmlProperty() {},
    setList(data) {
      this.dataObj = data;
    },
    // createFilter(queryString) {
    //   return config => {

    //     // return config.value.toLowerCase().indexOf(config.toLowerCase()) === 0;
    //   };
    // },
    querySearch(queryString, cb) {
      var config = this.config;
      let arr = [];
      for (let index = 0; index < config.length; index++) {
        const element = config[index];
        for (let subIndex = 0; subIndex < element.children.length; subIndex++) {
          const subElement = element.children[subIndex];
          if (subElement.label.indexOf(queryString) != -1) {
            arr.push({ value: subElement.label });
          }
        }
      }
      arr = arr.sort((a, b) => {
        return a.value.length - b.value.length;
      });
      cb(arr);
    },
    actionRemove(i) {
      this.dataObj.property = [
        ...this.dataObj.property.slice(0, i),
        ...this.dataObj.property.slice(i + 1)
      ];
    },
    addProperty() {
      this.dataObj.property.push({ property: "", value: "" });
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
};
</script>
<style>
.el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
.keyboard button {
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.keyboard-row1 {
  margin-left: 20px;
}
.keyboard-row2 {
  margin-left: 40px;
}
</style>
