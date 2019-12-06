<template>
  <div class="scq-view flex column" style="height: 100%;">
    <div>
      <div class="current flex row" style="width:100%;">
        <div>按下多选：{{ isMulitle }}</div>
        <!-- <div>当前选中：{{current_id}}</div> -->

        <div class="flex row">
          父级名称
          <el-input v-model="containerName" placeholder="请输入内容"></el-input>
        </div>
      </div>
    </div>
    <div class="flex row">
      <div style="width: 50%;height:100%;overflow:auto;margin-right:10px;" class="flex column">
        <el-tabs type="border-card">
          <el-tab-pane label="视图">
            <div class="flex">
              <div class="history flex" style="flex-flow: row-reverse;">
                <span
                  class="vcenter flex"
                  v-for="(item, index) in elementHistory"
                  :key="index"
                  @click="actionTimeTravel(index)"
                  :class="{ active: index == currentHistroyIndex }"
                >{{ index + 1 }}</span>
              </div>
            </div>
            <div>
              <preview
                v-on:current="getCurrent"
                :dataset="dataset[0]"
                class="paremt_preview"
                :currentSelect="current_id"
                :tagType="dataset[0].tagType"
                style
              ></preview>
            </div>
          </el-tab-pane>
          <el-tab-pane label="HTML">
            <code class="css-code">{{ htmlcode }}</code>
          </el-tab-pane>
          <el-tab-pane label="CSS">
            <div class="css-box">
              <!-- <button @click="cssNormal">normal</button>
              <button @click="cssTree">tree</button>-->

              <el-tabs type="border-card">
                <el-tab-pane label="List">
                  <code class="css-code" v-html="csscodeList"></code>
                </el-tab-pane>
                <el-tab-pane label="Tree">
                  <code class="css-code" v-html="csscodeTree"></code>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width: 50%;overflow:hidden;">
        <el-tabs type="border-card">
          <el-tab-pane label="预设类名">
            <div class="flex column content" style="text-align: left;">
              <div>
                <el-button
                  v-for="(item, index) in preClass"
                  :key="index"
                  @click.native="setElementAttr(item.className)"
                >{{ item.className }}</el-button>
              </div>
              <!-- <div style>
                <div>
                  <button
                    v-for="(item,index) in currentItem.classObj"
                    @click="setExtendAttr(index,item)"
                  >{{index}} {{item}}</button>
                </div>
              </div>-->
              <div style="margin-top: 20px">
                <el-checkbox
                  v-for="(item, index) in currentItem.classObj"
                  :key="index"
                  @click.native="setExtendAttr(index, item)"
                  :label="index"
                  :value="item"
                  border
                  size="medium"
                ></el-checkbox>
              </div>
              <div class="insersub-view flex column" style="margin-left:20px;">
                <div>
                  <el-select placeholder="设置添加位置" v-model="appendPosition">
                    <el-option label="子级添加" value="subChildAppend"></el-option>
                    <el-option label="孙级添加" value="subChildInsert"></el-option>
                  </el-select>
                </div>
                <div class="flex row">
                  <div class="row-list">
                    <div class="subitem flex vcenter" @click="rowAdd(0)">ROW</div>
                    <div
                      class="subitem flex vcenter"
                      v-for="(item, index) in rowList"
                      @click="rowAdd(item)"
                    >{{ item }}</div>
                  </div>
                  <div class="column-list">
                    <div class="subitem flex vcenter" @click="columnAdd(0)">COLUMN</div>
                    <div
                      class="subitem flex vcenter"
                      v-for="item in columnList"
                      @click="columnAdd(item)"
                    >{{ item }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="原生属性">
            <div style="    text-align: left;">
              <el-tabs type="border-card">
                <el-tab-pane label="CSS">
                  <css-declaration @save="onCssDeclarationSave" />
                </el-tab-pane>
                <el-tab-pane label="HTML">
                  <el-select v-model="tagType" @change="currentTagChange">
                    <el-option
                      v-for="(item, index) in tageTypeArray"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-tab-pane>
                <el-tab-pane label="属性组合"></el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预设">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import preview from './component/preview'
import uid2 from 'uid2'
import classname from 'classname'
window.ccc = classname
import { mapMutations, mapActions, mapState } from 'vuex'

// import cssObj from '@/css/flex.scss'
// console.log('cssObj', cssObj)
import cssDeclaration from './component/CSSStyleDeclaration'
import preClass from './preClass'
export default {
  name: 'index',
  components: { cssDeclaration, preview },
  data() {
    return {
      preClass,
      currentHistroyIndex: 0,
      current_id: ['1'],
      appendPosition: 'subChildAppend',
      // cssType: 'normal', //normal tree
      dataset: [],
      currentItem: {},
      containerName: 'container',
      addDirection: 'row',
      addNumber: 1,
      tagType: 'div',
      rowList: [1, 2, 3, 4, 5],
      columnList: [1, 2, 3, 4, 5],
      tageTypeArray: ['div', 'view', 'image', 'text', 'span'],
      isMulitle: false
    }
  },

  computed: {
    ...mapState({
      dset: state => JSON.parse(JSON.stringify(state.element)),
      elementHistory: state => state.elementHistory
    }),
    htmlcode: function() {
      let element = this.jsonToHtmlStyle1(this.dataset)
      console.log('change', element.outerHTML)
      var result = tidy_html5(element.outerHTML, options)
      console.log('result', result)
      return tidy_html5(element.outerHTML, options)
    },
    csscodeList: function() {
      let result = []
      this.jsonToCssStyle1(this.dataset, '', 1, result)
      let newResult = result.map(item => {
        return '<p>' + item + '</p>'
      })
      return newResult.join('\n')
    },
    csscodeTree: function() {
      let res = this.jsonToCssStyle2(this.dataset, '', true)

      return res
    }
  },
  methods: {
    ...mapActions(['setElement', 'timeTravel']),
    onCssDeclarationSave(obj) {
      let item = this.getNode(this.dataset, this.current_id)
      item.style[obj.rules] = obj.value
      // item.style = `${obj.rules}:${obj.value}`
      this.currentItem = item

      this.setElement(JSON.parse(JSON.stringify(this.dataset)))
    },
    actionTimeTravel(index) {
      this.timeTravel(index)
      this.currentHistroyIndex = index
    },
    setExtendAttr(index, item) {
      console.log('setExtendArrt')
      let obj = JSON.parse(JSON.stringify(this.currentItem.classObj))
      obj[index] = !item
      this.currentItem.classObj = obj
      this.currentItem.className = classname(this.currentItem.className, obj)
      this.setElement(JSON.parse(JSON.stringify(this.dataset)))
    },
    setElementAttr(type) {
      let item = this.getNode(this.dataset, this.current_id)

      item.classObj = Object.assign({}, item.classObj, {
        [type]: true
      })
      item.className = classname(item.className, type)
      this.currentItem = item

      this.setElement(JSON.parse(JSON.stringify(this.dataset)))
    },
    // cssNormal() {
    //   this.cssType = 'normal'
    // },
    // cssTree() {
    //   this.cssType = 'tree'
    // },
    currentTagChange(event) {
      console.log(event)
      this.getNodeByIdChaneType(this.dataset, this.current_id, event)
    },
    getNodeByIdChaneType(subset, id, tagType) {
      let item = subset.filter(item => {
        // return item.id == id
        let findresult = id.find(subitem => {
          return subitem == item.id
        })
        console.log(!!findresult)
        return !!findresult
      })
      if (item.length > 0) {
        item.forEach(subitem => {
          subitem.tagType = tagType
        })
        this.setDatasetClassName(this.dataset, 1)
      } else {
        subset.map(item => {
          this.getNodeByIdChaneType(item.subset, id, tagType)
        })
      }
    },
    getCurrent(event) {
      this.tagType = event.tagType
      if (this.isMulitle) {
        let finditem = this.current_id.find(item => {
          return item == event.id
        })
        if (finditem === undefined) {
          this.current_id.push(event.id)
        } else {
          this.current_id.splice(
            this.current_id.findIndex(item => {
              return item === finditem
            }),
            1
          )
        }

        let newarray = JSON.parse(JSON.stringify(this.current_id))
        this.current_id = newarray
      } else {
        this.current_id = JSON.parse(JSON.stringify([event.id]))
        let arr = this.getNode(this.dataset, this.current_id)
        this.currentItem = arr
      }
    },
    getNode(subset, id) {
      let res = ''
      for (let index = 0; index < subset.length; index++) {
        const element = subset[index]
        let findresult = id.find(subitem => {
          return subitem == element.id
        })
        if (findresult) {
          res = element
          break
        } else {
          res = this.getNode(element.subset, id)
          if (res != '') {
            break
          }
        }
      }
      return res
    },
    //   遍历树结构，找到指定值
    getNodeById(subset, id) {
      let item = subset.filter(item => {
        let findresult = id.find(subitem => {
          return subitem == item.id
        })
        return !!findresult
      })
      if (item.length > 0) {
        this.addElement(item)
      } else {
        subset.map(item => {
          this.getNodeById(item.subset, id)
        })
      }
    },
    columnAdd(number) {
      this.addDirection = 'column'
      this.addNumber = number
      this.getNodeById(this.dataset, this.current_id)
    },
    rowAdd(number) {
      this.addNumber = number
      this.addDirection = 'row'
      this.getNodeById(this.dataset, this.current_id)
    },
    resetUid(dataset) {
      if (dataset.length > 0) {
        dataset.forEach(item => {
          item.id = uid2(10)
          this.resetUid(item.subset)
        })
      }
    },
    addElement(item) {
      let addArray = new Array(this.addNumber)
      addArray.fill(1)
      item.forEach(subitem => {
        subitem.direction = this.addDirection

        if (this.appendPosition == 'subChildAppend') {
          addArray.forEach(() => {
            subitem.subset.push({
              tagType: this.tagType,
              direction: this.addDirection,
              id: uid2(10),
              className: '',
              classObj: { grow: true },
              subset: [],
              style: {}
            })
          })
        }
        if (this.appendPosition == 'subChildInsert') {
          let subset = JSON.parse(JSON.stringify(subitem.subset))

          subitem.subset = []

          addArray.forEach(() => {
            let nSubset = JSON.parse(JSON.stringify(subset))
            this.resetUid(nSubset)
            subitem.subset.push({
              tagType: this.tagType,
              direction: this.addDirection,
              id: uid2(10),
              className: '',
              classObj: { grow: true },
              subset: nSubset,
              style: {}
            })
          })
        }
      })
      this.setDatasetClassName(this.dataset, 1)
      this.setElement(JSON.parse(JSON.stringify(this.dataset)))
    },
    jsonToHtmlStyle1(array, tagType) {
      // 操作
      // let element = null
      // if(parentElement==null){
      if (tagType == undefined) {
        tagType = 'div'
      }
      let element = document.createElement(tagType)
      // element.style = array.style
      // console.log('array.tagType',tagType)
      // }
      // 子级
      array.forEach(item => {
        console.log('item.tagType', item.tagType)
        let childElement = this.jsonToHtmlStyle1(item.subset, item.tagType)
        childElement.className = classname(
          item.className,
          'flex',
          item.direction
        )
        childElement.style = item.style
        element.appendChild(childElement)
      })
      // 返回元素
      return element
    },

    jsonToCssStyle1(array, parentHeader, parentLevel, result) {
      array.forEach((item, index) => {
        let nodeHeader = ''
        let sublevel = ''
        if (parentHeader == '') {
          nodeHeader = '.' + this.containerName
          sublevel = ''
        } else {
          nodeHeader =
            parentHeader + ' ' + item.tagType + '.s' + parentLevel + '-' + index
          sublevel = parentLevel + '-' + index
        }

        result.push(nodeHeader + ' {}')
        this.jsonToCssStyle1(item.subset, nodeHeader, sublevel, result)
      })
    },
    jsonToCssStyle2(array, result, top) {
      // console.log('2222222222', array)
      let res = ''
      array.forEach((item, index) => {
        res = res + '.' + item.className + '{'
        if (item.subset) {
          res += this.jsonToCssStyle2(item.subset, result, false)
        }
      })
      if (!top) {
        res += '}'
      }
      return res
    },
    setDatasetClassName(array, parentLevel) {
      array.forEach((item, index) => {
        let sublevel = ''
        if (parentLevel == 1) {
          sublevel = ''
        } else {
          sublevel = parentLevel + '-' + index
          item.className = classname({}, 's' + sublevel, item.classObj)
        }

        this.setDatasetClassName(item.subset, sublevel)
      })
    }
  },
  watch: {
    elementHistory: {
      handler: function() {
        this.currentHistroyIndex = this.elementHistory.length - 1
      },
      immediate: true
    },
    dset: {
      handler: function() {
        this.dataset = this.dset
        let arr = this.getNode(this.dataset, this.current_id)
        this.currentItem = arr
      },
      immediate: true
    },
    containerName(newValue) {
      // console.log(v,e)
      this.dataset[0].className = newValue
      this.setElement(this.dataset)
    }
  },
  created() {
    //   let body = document.getElementsByTagName('body')
    this.dataset[0].className = this.containerName
    window.addEventListener('keydown', event => {
      //   console.log(event)
      if (event.keyCode == 17) {
        this.isMulitle = true
      }
    })
    window.addEventListener('keyup', event => {
      //   console.log(event)
      if (event.keyCode == 17) {
        this.isMulitle = false
      }
    })
  }
}
</script>

<style>
.html-box,
.css-box {
  /* display: block; */
  /* margin-top: 20px; */
  /* width: 100%; */
  /* border: 1px solid #ddd; */
  text-align: left;
}

.preview {
  /* height: 100%; */
  box-sizing: border-box;
  border: 1px solid black;
  padding: 20px;
}
.scq-view {
  /* height: 800px; */
  min-width: 100px;
}
.content {
  height: 100%;
}
/* .paremt_preview {
  height: 800px;
} */
.flex {
  display: flex;
}
.row {
  flex-direction: row;
}
.flex .grow {
  flex-grow: 1;
}
.flex.vcenter {
  justify-content: center;
  align-items: center;
}
.column {
  flex-direction: column;
}

.insersub-view {
  width: 200px;
}
.insersub-view .subitem {
  height: 50px;
  width: 100px;
  border: 1px solid #ddd;
}
.preview {
  background-color: #d4d4d4;
}
.selected {
  background-color: #ffaf3a;
}
.current {
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.current div {
  margin-right: 20px;
}
.history span {
  width: 30px;
  height: 30px;
  background: #ddd;
  border-right: 1px solid black;
}
span.vcenter.flex.active {
  background: #009688;
  color: white;
  font-weight: 600;
  border: 0;
}
</style>
