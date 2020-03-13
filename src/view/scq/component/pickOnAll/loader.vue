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
        <!-- {{item.tagName}} -->
        <div class="flex" v-if="rootPick == item.tagName">
          <div style="min-width:300px">
            <el-button type="primary" @click="saveToCache(item)">存入缓存</el-button>
            <!-- <setPropery v-if="rootPick==item.tagName" @actionInsert="actionInsert" :data="item" /> -->
            <!-- :tagName="item.tagName" -->
            <setValue ref="setValue" @actionInsert="actionInsert" @rawToPreView="rawToPreView" />
          </div>
          <div class="flex" style="    flex-flow: wrap;">
            <div v-for="item,index in datasetList">
              <div class="flex row">
                <el-button type="primary" @click="rawToPreView(item.dataset)">插入</el-button>
                <el-button type="danger" @click="rawToPreView(item)">删除</el-button>
              </div>

              <iframe ref="iframeRef" :src="'/component/'+item.id" class="componentIframe"></iframe>
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
    async tabClick(tab, event) {
      this.datasetList = await parentDataset.componentCache
        .where({
          tagName: this.rootPick
        })
        .toArray();
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