<template>
  <div>
    <!-- {{rawData}} -->
    <setPropery
      v-if="rawData.tagName"
      :value="value"
      @actionInsert="actionInsert"
      :data="rawData"
      @change="change"
    />
  </div>
</template>

<script>
import vantConfig from "./Vant/index.js";
import elementConfig from "./elementUi/index";

import setPropery from "./setPropery";
export default {
  name: "setValue",
  props: ["tagName", "value"],
  components: { setPropery },
  data() {
    return {
      rawData: {}
    };
  },
  methods: {
    actionInsert() {
      this.$emit("actionInsert", this.rawData);
    },
    change(data) {
      this.$emit("change", data);
    }
  },
  watch: {
    tagName: {
      handler: function() {
        this.rawData = {};
        // console.log("tagName", this.tagName, vantConfig, elementConfig);
        for (const key in vantConfig) {
          if (vantConfig.hasOwnProperty(key)) {
            const element = vantConfig[key];
            if (element.tagName == this.tagName) {
              this.rawData = element;
              break;
            }
          }
        }
        for (const key in elementConfig) {
          if (elementConfig.hasOwnProperty(key)) {
            const element = elementConfig[key];
            if (element.tagName == this.tagName) {
              this.rawData = element;
              break;
            }
          }
        }
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>