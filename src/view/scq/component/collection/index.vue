<template>
  <div class="insersub-view flex column" style="margin-left:0;margin-top:10px;">
    <el-tabs tab-position="left">
      <el-tab-pane label="DIV">
        <div style="    text-align: left;margin-bottom: 10px;">
          <el-select placeholder="设置添加位置" v-model="appendPosition">
            <el-option label="子级添加" value="subChildAppend"></el-option>
            <el-option label="孙级添加" value="subChildInsert"></el-option>
          </el-select>
        </div>

        <div class="flex row">
          <div class="row-list">
            <div class="subitem flex vcenter" @click="actionRowAdd(0)">ROW</div>
            <div
              class="subitem flex vcenter"
              v-for="(item, index) in rowList"
              @click="actionRowAdd(item)"
            >{{ item }}</div>
          </div>
          <div class="column-list">
            <div class="subitem flex vcenter" @click="actionColumnAdd(0)">COLUMN</div>
            <div
              class="subitem flex vcenter"
              v-for="item in columnList"
              @click="actionColumnAdd(item)"
            >{{ item }}</div>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="预设图片">
        <div>
          <div class="flex column" v-for="item,index in preSetImg.subset">
            <el-button type="primary" @click="rawToPreView(item)">插入</el-button>
            <engine :controlView="true" instanceType="preView" :key="index" :dataset="item"></engine>
          </div>
        </div>
      </el-tab-pane>-->

      <el-tab-pane label="预设框架">
        <div class="flex column" v-for="item,index in preSave">
          <el-button type="primary" @click="rawToPreView(item)">插入</el-button>
          <engine :controlView="controlView" instanceType="preView" :key="index" :dataset="item"></engine>
        </div>
      </el-tab-pane>
      <el-tab-pane label="NavMenu 导航菜单">
        <nav-menu @actionInsert="actionInsert" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uid2 from "uid2";
import preview from "../preview";
import lara from "@/assets/lara.jpg";
import navMenu from "./navMenu.vue";
import engine from "../engine";

import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "collection",
  props: ["controlView"],
  components: { engine, preview, navMenu },
  data() {
    return {
      appendPosition: "subChildAppend",
      current_id: ["1"],
      // preSetImg: {
      //   tagName: "div",
      //   direction: "row",
      //   id: uid2(10),
      //   className: "",
      //   classObj: { grow: true },
      //   subset: [
      //     {
      //       tagName: "img",
      //       direction: "row",
      //       id: uid2(10),
      //       className: "",
      //       classObj: { grow: true },
      //       subset: [],
      //       style: [],
      //       property: [
      //         { property: "src", value: lara },
      //         { property: "width", value: "300px" }
      //       ]
      //     },
      //     {
      //       tagName: "img",
      //       direction: "row",
      //       id: uid2(10),
      //       className: "",
      //       classObj: { grow: true },
      //       subset: [],
      //       style: [],
      //       property: [
      //         { property: "src", value: lara },
      //         { property: "width", value: "150px" },
      //         { property: "height", value: "150px" }
      //       ]
      //     }
      //   ],
      //   style: []
      // },
      currentItem: {},
      rowList: [1, 2, 3, 4, 5],
      columnList: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    ...mapState({
      preSave: state => state.preSave
    })
  },
  methods: {
    resetUid(data) {
      if (typeof data == "object") {
        data.id = uid2(10);
        for (let index = 0; index < data.subset.length; index++) {
          const element = data.subset[index];
          this.resetUid(element);
        }
      }
      return data;
    },
    rawToPreView(data) {
      console.log(JSON.parse(JSON.stringify(this.resetUid(data))));

      this.$emit(
        "rawToPreView",
        JSON.parse(JSON.stringify(this.resetUid(data)))
      );
    },
    actionInsert(data) {
      this.$emit("actionInsert", data);
    },
    // getNode(subset, id) {
    //   let res = "";
    //   for (let index = 0; index < subset.length; index++) {
    //     const element = subset[index];
    //     let findresult = id.find(subitem => {
    //       return subitem == element.id;
    //     });
    //     if (findresult) {
    //       res = element;
    //       break;
    //     } else {
    //       res = this.getNode(element.subset, id);
    //       if (res != "") {
    //         break;
    //       }
    //     }
    //   }
    //   return res;
    // },
    // getCurrent(event) {
    // this.current_id = JSON.parse(JSON.stringify([event.id]));
    // let arr = this.getNode(this.preSetImg, this.current_id);
    // this.currentItem = arr;
    // this.$emit("onSelected", this.currentItem);
    // },
    actionSetExtendAttr(index, item) {
      this.$emit("actionSetExtendAttr", { index, item });
    },
    actionRowAdd(number) {
      this.$emit("actionRowAdd", number);
    },
    actionColumnAdd(number) {
      this.$emit("actionColumnAdd", number);
    }
  },
  watch: {
    appendPosition: {
      handler() {
        this.$emit("onChangePosition", this.appendPosition);
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {}
};
</script>
<style >
.insersub-view {
  /* width: 200px; */
}
.insersub-view .subitem {
  height: 50px;
  width: 100px;
  border: 1px solid #ddd;
}
</style>