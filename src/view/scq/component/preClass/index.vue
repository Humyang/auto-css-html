<template>
  <div>
    <el-button
      v-for="(item, index) in config"
      :key="index"
      @click.native="actionEmit(item)"
    >{{ item.className }}</el-button>
  </div>
</template>

<script>
import config from './config.js'
export default {
  name: 'preClass',
  //   props:[''],
  components: {},
  data() {
    return {
      config
    }
  },
  methods: {
    actionEmit(item) {
      this.$emit('actionClick', item.value)
    }
  },
  computed: {},
  watch: {
    // example: {
    //   handler() {},
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {},
  mounted() {}
}
</script>

