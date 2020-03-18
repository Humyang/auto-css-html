<template>
  <div class="preDefined">
    <el-button type="primary" @click="actionInsert">插入</el-button>
    <!-- {{rawData.props}} -->
    <!-- {{rawData}} -->
    <div v-for="item,index in rawData.props" :key="index">
      <div v-if="item.type =='String'" class="flex cell">
        <span class="label">{{item.name}}</span>

        <el-input v-model="item.value" placeholder="请输入内容"></el-input>
        <el-select v-if="item.options.length>0" v-model="item.value" placeholder="请选择">
          <el-option v-for="w in item.options" :key="w" :label="w" :value="w"></el-option>
        </el-select>
        <iconNameSelect v-if="item.isIconNamePick" @change="(iconName)=>{item.value=iconName}" />
      </div>
      <div v-if="item.type =='Boolean'" class="flex cell">
        <span class="label">{{item.name}}</span>
        <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import iconNameSelect from "./elementUi/component/iconNameSelect";
import { getNodeById } from "@/utils/nodeUtils.js";

import { getFormatedData, objToPropsArray } from "@/utils/formatMethods";
import uid2 from "uid2";
export default {
  // props: ["data"],
  components: { iconNameSelect },
  data() {
    return {
      isWatch: true,
      rawData: {}
    };
  },
  methods: {
    setRawData(obj) {
      this.isWatch = false;
      this.rawData = obj;
      setTimeout(() => {
        this.isWatch = true;
      }, 100);
    },
    setValue(value) {
      this.isWatch = false;
      let obj1 = {};
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //
      // }
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          const element = value[key];
          obj1[element.property] = element.value;
        }
      }
      for (const key in this.rawData.props) {
        if (this.rawData.props.hasOwnProperty(key)) {
          const element = this.rawData.props[key];
          element.value = obj1[element.name];
        }
      }
      setTimeout(() => {
        this.isWatch = true;
      }, 100);
      // console.log("1", value);
      // console.log("2", this.rawData.props);
      // this.rawData.props = value;
    },
    async actionInsert() {
      let v = await parentDataset.dataset.get("1");
      let dataset = v.dataset;
      let currentSelect = v.currentSelect;
      let item = getNodeById(dataset, currentSelect);
      item.subset.push(getFormatedData(this.rawData));
      parentDataset.dataset.update("1", {
        dataset: dataset,
        modifyFlag: uid2(20)
      });
      // this.$emit("actionInsert", this.rawData);
    }
  },
  mounted() {
    // this.rawData = this.data;
  },
  watch: {
    // rawData: {
    //   handler: function() {
    //     this.$emit("change", this.rawData);
    //   },
    //   immediate: true,
    //   deep:true
    // },
    rawData: {
      handler: function() {
        if (this.isWatch) {
          this.$emit("change", this.rawData);
        }
      },
      deep: true
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