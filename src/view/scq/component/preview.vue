<template>
  <div
    @click.stop="actionClick"
    class="preview flex"
    :class="{'row':dataset.direction=='row',
    'column':dataset.direction=='column',
    'selected':onSelected,
    [dataset.className]:true
    }"
    style="height: 100%;"
  >
    {{dataset.direction}}
    <template v-if="dataset.subset!=undefined">
      <preview
        v-for="item,index in dataset.subset"
        :dataset="item"
        :current_length="clength"
        :key="index"
        :tagType="item.tagType"
        :direction="item.direction"
        v-on:current="getCurrent"
        :currentSelect="currentSelect"
      ></preview>
    </template>
  </div>
</template>
<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: 'preview',
  props: ['dataset', 'current_length', 'direction', 'currentSelect', 'tagType'],
  data() {
    return {
      clength: 1
    }
  },
  methods: {
    actionClick() {
      // console.log(this.dataset.id)
      this.$emit('current', { id: this.dataset.id, tagType: this.tagType })
    },
    getCurrent(event) {
      this.$emit('current', event)
    }
  },
  computed: {
    onSelected() {
      console.log(this.currentSelect)
      let result = this.currentSelect.find(item => {
        return item == this.dataset.id
      })
      return result != undefined ? true : false
    }
  },
  updated: function() {
    //   计算当前自己元素数量
    // console.log(this.dataset.subset.length)
    this.clength = this.dataset.subset && this.dataset.subset.length

    // console.log(this.current_length)
  }
}
</script>
