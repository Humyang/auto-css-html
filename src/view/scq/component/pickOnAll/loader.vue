<template>
  <div>
    <!-- {{rootPick}} -->
    <el-tabs v-model="rootPick" tab-position="left" @tab-click="tabClick">
      <el-tab-pane
        v-for="item,index in config"
        :key="index"
        :label="item.tagName"
        :name="item.tagName"
      >
        <div class="flex" v-if="rootPick == item.tagName">
          <div style="min-width:300px">
            <el-button type="primary" @click="saveToCache(item)">存入缓存</el-button>
            <!-- @actionInsert="actionInsert" -->
            <!-- @rawToPreView="rawToPreView" -->
            <setValue ref="setValue" />
          </div>
          <div ref="canvasCache"></div>
          <div class="flex" style="    flex-flow: wrap;">
            <div v-for="item,index in datasetList">
              <div class="flex row">
                <el-button type="primary" @click="rawToPreView(item.dataset)">插入</el-button>
                <el-button type="danger" @click="remove(item)">删除</el-button>

                <el-button type="info" @click="setPreview(item)">预览</el-button>

                <el-button type="info" @click="setNewPreviewImage(item)">更新图片</el-button>
              </div>

              <iframe
                v-if="!item.imageBase64 || item.setPreview"
                ref="iframeRef"
                :src="'/component/'+item.id"
                class="componentIframe"
              ></iframe>
              <img v-else :src="item.imageBase64" style="width: 400px;" alt />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import engine from "../engine";
import { mapMutations, mapActions, mapState } from "vuex";

import resetUid from "@/utils/resetUid.js";

import setValue from "./setValue";
import { getNodeById } from "@/utils/nodeUtils.js";

import { getFormatedData, objToPropsArray } from "@/utils/formatMethods";
import uid2 from "uid2";
export default {
  name: "loader",
  props: ["config"],
  components: {
    // setPropery,
    engine,
    setValue
  },
  data() {
    return {
      rootPick: "",
      datasetList: []
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_PRESET"]),
    setNewPreviewImage(item) {
      parentDataset.componentCache.update(item.id, {
        imageBase64: false
      });
      this.tabClick();
    },
    remove(item) {
      parentDataset.componentCache.delete(item.id);
      this.tabClick();
    },
    setPreview(item) {
      item.setPreview = true;
    },
    async tabClick(tab, event) {
      let arr = await parentDataset.componentCache
        .where({
          tagName: this.rootPick
        })
        .toArray();
      this.datasetList = arr.map(item => {
        return { ...item, setPreview: false };
      });
      // alert(123);
      this.$refs.setValue[0].setValue(this.rootPick);
    },
    async rawToPreView(data) {
      let v = await parentDataset.dataset.get("1");
      let dataset = v.dataset;
      let currentSelect = v.currentSelect;
      let item = getNodeById(dataset, currentSelect);
      item.subset.push(resetUid(JSON.parse(JSON.stringify(data))));
      parentDataset.dataset.update("1", {
        dataset: dataset,
        modifyFlag: uid2(20)
      });
      // this.$emit("rawToPreView", resetUid(JSON.parse(JSON.stringify(data))));
    },
    saveToCache(data) {
      this.SET_PRESET({
        tagName: data.tagName,
        dataset: getFormatedData(data)
      });
    }
    // actionInsert(data) {
    //   this.$emit("actionInsert", data);
    // }
  }
};
</script>