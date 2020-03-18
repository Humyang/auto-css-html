<template>
  <div>
    <!-- 
    v-if="rawData.tagName"-->
    <setPropery v-if="visible" ref="setPropery" @change="change" />
    <!-- @actionInsert="actionInsert" -->
  </div>
</template>

<script>
import vantConfig from "./Vant/index.js";
import elementConfig from "./elementUi/index";

import setPropery from "./setPropery";
export default {
  name: "setValue",
  // props: ["tagName", "value"],
  components: { setPropery },
  data() {
    return {
      rawData: {},
      visible: true,
      rawValue: {}
    };
  },
  methods: {
    // actionInsert(data) {
    //   this.$emit("actionInsert", data);
    // },
    change(data) {
      this.$emit("change", data);
    },
    setValue(tagName, value) {
      let rawData = {};
      this.visible = false;

      for (const key in vantConfig) {
        if (vantConfig.hasOwnProperty(key)) {
          const element = vantConfig[key];
          if (element.tagName == tagName) {
            rawData = element;
            break;
          }
        }
      }
      for (const key in elementConfig) {
        if (elementConfig.hasOwnProperty(key)) {
          const element = elementConfig[key];
          if (element.tagName == tagName) {
            rawData = element;
            break;
          }
        }
      }
      setTimeout(() => {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.setPropery.setRawData(rawData);
          if (value) {
            this.$refs.setPropery.setValue(value);
          }
        });
      }, 100);
    }
  },
  watch: {
    // value: {
    //   handler: function() {
    //     // consolvalue"v", this.value);
    //     this.$refs.setPropery.setValue(this.value);
    //     // if (this.value) {
    //     //   this.rawValue = JSON.parse(JSON.stringify(this.value));
    //     // } else {
    //     //   // this, (rawValue = {});
    //     // }
    //   },
    //   // immediate: true,
    //   deep: true
    // },
    // tagName: {
    //   handler: function() {
    //     this.rawData = {};
    //     this.value = {};
    //     // console.log("tagName", this.tagName, vantConfig, elementConfig);
    //   }
    // }
  },
  mounted() {}
};
</script>

<style>
</style>