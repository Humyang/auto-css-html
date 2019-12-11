<template>
  <div class="insersub-view flex column" style="margin-left:0;margin-top:10px;">
    <div>
      <preview :dataset="preSetImg[0]" :tagType="preSetImg[0].tagType" :currentSelect="['1']"></preview>
    </div>
    <div>
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
  </div>
</template>

<script>
import uid2 from 'uid2'
import preview from '../preview'
export default {
  name: 'index',
  //   props:[''],
  components: { preview },
  data() {
    return {
      appendPosition: 'subChildAppend',
      preSetImg: [
        {
          tagType: 'img',
          direction: 'row',
          id: uid2(10),
          className: '',
          classObj: { grow: true },
          subset: [],
          style: {},
          raw: {
            url: '~/assets/lara.jpg'
          }
        }
      ],

      rowList: [1, 2, 3, 4, 5],
      columnList: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    actionSetExtendAttr(index, item) {
      this.$emit('actionSetExtendAttr', { index, item })
    },
    actionRowAdd(number) {
      this.$emit('actionRowAdd', number)
    },
    actionColumnAdd(number) {
      this.$emit('actionColumnAdd', number)
    }
  },
  computed: {},
  watch: {
    appendPosition: {
      handler() {
        this.$emit('onChangePosition', this.appendPosition)
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {}
}
</script>