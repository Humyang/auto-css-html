<template>
  <div>
    <el-button type="primary" @click="addProperty">添加属性</el-button>
    <div v-for="property,index in propertyList" :key="index">
      <div class="flex align-baseline">
        <div>
          <!-- <el-select filterable v-model="property.property" slot="prepend" placeholder="请选择">
            <el-option-group v-for="group,index in config" :key="group.id" :label="group.label">
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-option-group>
          </el-select>-->
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
          <inputAdvance @valueChange="(value)=>valueChange(property,value)" />
          <el-button type="danger" @click="actionRemove(index)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "./config";
import inputAdvance from "../inputAdvance/index";
export default {
  name: "CSSStyleDeclaration",
  components: {
    inputAdvance
  },
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
      propertyList: [
        // {
        //   property: "",
        //   value: ""
        // }
      ],
      saveInputValue: "",
      rules: "",
      desc: "",
      filterGroupPick: "",
      filterGroup: ["已有属性"],
      labelStr: labelArr.join(","),
      Alphabetical: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
      ],
      input: "",
      data: config,
      filterText: "",
      allowList: [],
      allDisable: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    valueChange(property, value) {
      property.value = value;
    },
    setList(data) {
      this.propertyList = data;
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
      this.propertyList = [
        ...this.propertyList.slice(0, i),
        ...this.propertyList.slice(i + 1)
      ];
    },
    addProperty() {
      this.propertyList.push({ property: "", value: "" });
    },
    save() {
      this.$emit("save", { rules: this.rules, value: this.saveInputValue });
    },
    nodeClick(data, node, nodeSelf) {
      console.log("nodeClick", data, node, nodeSelf);
      this.desc = data.desc;
      this.rules = data.label;
    },
    isDisable(alpha) {
      if (this.allDisable) {
        return true;
      }
      return (
        this.allowList.length > 0 &&
        JSON.stringify(this.allowList).indexOf(alpha) == -1
      );
    },
    find(alpha) {
      this.allowList = [];
      this.allDisable = true;
      for (let index = 0; index < this.Alphabetical.length; index++) {
        const element = this.Alphabetical[index];
        for (let c = 0; c < element.length; c++) {
          const ee = element[c];
          let v = alpha + ee;
          let i = this.labelStr.indexOf(v);
          if (i > 0) {
            this.allDisable = false;
            this.allowList.push(ee);
            console.log("find", v, i);
          }
        }
      }
    },
    alphabetClick(item) {
      this.filterText += item;
      this.find(this.filterText);
      // 循环搜索允许点击的字母
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  computed: {},
  watch: {
    // property: {
    //   handler: function() {
    //     // this.$emit("change", this.propertyList);
    //     if (this.propertyList.length == 0) {
    //       this.propertyList = this.property;
    //     }
    //   },
    //   deep: true
    // },
    // propertyList: {
    //   handler: function() {
    //     this.$emit("change", this.propertyList);
    //   },
    //   deep: true
    // }
    // filterText(val) {
    //   if (val == "") {
    //     this.allowList = [];
    //     this.allDisable = false;
    //   }
    //   this.find(val);
    //   this.$refs.tree.filter(val);
    // }
    // example: {
    //   handler() {},
    //   deep: true,
    //   immediate: true
    // }
  },
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
