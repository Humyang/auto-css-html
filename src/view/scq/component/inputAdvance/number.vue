<template>
  <div class="flex">
    <div class="grow">
      <el-slider style="padding: 0 25px" show-input :max="500" v-model="sliderValue" :step="5"></el-slider>
    </div>
    <div>
      单位
      <el-autocomplete
        class="inline-input"
        v-model="unitValue"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
      ></el-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderValue: 0,
      unitValue: "px",
      units: ["px", "em", "rem"]
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var units = this.units;
      let arr = [];
      for (let index = 0; index < units.length; index++) {
        const element = units[index];
        if (element.indexOf(queryString) != -1) {
          arr.push({ value: element });
        }
        // for (let subIndex = 0; subIndex < element.children.length; subIndex++) {
        //   const subElement = element.children[subIndex];
        //   if (subElement.label.indexOf(queryString) != -1) {
        //     arr.push({ value: subElement.label });
        //   }
        // }
      }
      arr = arr.sort((a, b) => {
        return a.length - b.length;
      });
      cb(arr);
    },
    valueChange() {
      this.$emit("valueChange", this.sliderValue + this.unitValue);
    }
  },
  watch: {
    sliderValue: {
      handler() {
        this.valueChange();
      }
    },
    unitValue: {
      handler() {
        this.valueChange();
      }
    }
  }
};
</script>

<style>
</style>