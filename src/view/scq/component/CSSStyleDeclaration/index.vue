<template>
  <div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="filterGroupPick" size="small">
        <el-checkbox v-for="(item,index) in filterGroup" :label="item" :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-row class="keyboard">
      <div v-for="(item,index) in Alphabetical" :key="index" :class="'keyboard-row'+index">
        <el-button
          :disabled="isDisable(im)"
          v-for="(im,ix) in item"
          @click.native="alphabetClick(im)"
          :key="ix"
        >{{im}}</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>

        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          highlight-current
          :filter-node-method="filterNode"
          @node-click="nodeClick"
          ref="tree"
        ></el-tree>
      </el-col>
      <el-col :span="12">
        <p>{{desc}}</p>
        <el-input v-model="saveInputValue"></el-input>
        <el-button size="mini" @click="save">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'CSSStyleDeclaration',
  //   props:[''],
  components: {},
  data() {
    let labelArr = []
    for (let index = 0; index < config.length; index++) {
      const element = config[index]
      for (let si = 0; si < element.children.length; si++) {
        const ee = element.children[si]
        labelArr.push(ee.label)
      }
    }
    return {
      saveInputValue: '',
      rules: '',
      desc: '',
      filterGroupPick: '',
      filterGroup: ['已有属性'],
      labelStr: labelArr.join(','),
      Alphabetical: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      ],
      input: '',
      data: config,
      filterText: '',
      allowList: [],
      allDisable: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', { rules: this.rules, value: this.saveInputValue })
    },
    nodeClick(data, node, nodeSelf) {
      console.log('nodeClick', data, node, nodeSelf)
      this.desc = data.desc
      this.rules = data.label
    },
    isDisable(alpha) {
      if (this.allDisable) {
        return true
      }
      return (
        this.allowList.length > 0 &&
        JSON.stringify(this.allowList).indexOf(alpha) == -1
      )
    },
    find(alpha) {
      this.allowList = []
      this.allDisable = true
      for (let index = 0; index < this.Alphabetical.length; index++) {
        const element = this.Alphabetical[index]
        for (let c = 0; c < element.length; c++) {
          const ee = element[c]
          let v = alpha + ee
          let i = this.labelStr.indexOf(v)
          if (i > 0) {
            this.allDisable = false
            this.allowList.push(ee)
            console.log('find', v, i)
          }
        }
      }
    },
    alphabetClick(item) {
      this.filterText += item
      this.find(this.filterText)
      // 循环搜索允许点击的字母
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      if (val == '') {
        this.allowList = []
        this.allDisable = false
      }
      this.find(val)
      this.$refs.tree.filter(val)
    }
    // example: {
    //   handler() {},
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {},
  mounted() {
    // for (var i in document.body.style) {
    //   this.obj[i] = "";
    //   // this.list.push(i);
    //   // console.log(i);
    // }
    // this.obj = JSON.parse(JSON.stringify(this.obj));
  }
}
</script>
<style>
.el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
.keyboard button {
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.keyboard-row1 {
  margin-left: 20px;
}
.keyboard-row2 {
  margin-left: 40px;
}
</style>
