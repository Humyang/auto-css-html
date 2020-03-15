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
            <setValue ref="setValue" @actionInsert="actionInsert" @rawToPreView="rawToPreView" />
          </div>
          <div ref="canvasCache"></div>
          <div class="flex" style="    flex-flow: wrap;">
            <div v-for="item,index in datasetList">
              <div class="flex row">
                <el-button type="primary" @click="rawToPreView(item.dataset)">插入</el-button>
                <el-button type="danger" @click="remove(item)">删除</el-button>

                <el-button type="info" @click="setPreview(item)">预览</el-button>
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
import { getFormatedData } from "@/utils/formatMethods";
import { mapMutations, mapActions, mapState } from "vuex";

import resetUid from "@/utils/resetUid.js";

import setValue from "./setValue";
export default {
  name: "Vant",
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
    rawToPreView(data) {
      this.$emit("rawToPreView", resetUid(JSON.parse(JSON.stringify(data))));
    },
    saveToCache(data) {
      this.SET_PRESET({
        tagName: data.tagName,
        dataset: getFormatedData(data)
      });
    },
    actionInsert(data) {
      this.$emit("actionInsert", data);
    }
  }
};
</script>