
<template>
  <div class="scq-view">
    <div class="current flex row" style="width:100%;">
      <div>按下多选：{{isMulitle}}</div>
      <div>当前选中：{{current_id}}</div>
      <div>
        <el-select placeholder="请选择活动区域" v-model="tagType" @change="currentTagChange">
          <el-option v-for="(item,index) in tageTypeArray" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="flex row">
        containt name
        <el-input v-model="containerName" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex column content">
      <div>
        <button @click="setElementAttr('grow')">grow</button>
        <button @click="setElementAttr('justift-center')">justift-center</button>
        <button @click="setElementAttr('align-center')">align-center</button>
        <button @click="setElementAttr('padding-10')">padding-10</button>
      </div>
      <div style="min-height:200px;width: 100%;">
        <preview
          v-on:current="getCurrent"
          :dataset="dataset[0]"
          class="grow paremt_preview"
          :currentSelect="current_id"
          :tagType="dataset[0].tagType"
        ></preview>
        <div>
          <button
            v-for="(item,index) in currentItem.classObj"
            @click="setExtendAttr(index,item)"
          >{{index}} {{item}}</button>
        </div>
      </div>
      <div class="insersub-view flex column" style="margin-left:20px;">
        <div>
          <el-select placeholder="设置添加位置" v-model="appendPosition">
            <el-option label="直接子级直接添加" value="subChildAppend"></el-option>
            <el-option label="直接子级插入" value="subChildInsert"></el-option>
          </el-select>
        </div>
        <div class="flex row">
          <div class="row-list">
            <div class="subitem flex vcenter" @click="rowAdd(0)">ROW</div>
            <div
              class="subitem flex vcenter"
              v-for="(item,index) in rowList"
              @click="rowAdd(item)"
            >{{item}}</div>
          </div>
          <div class="column-list">
            <div class="subitem flex vcenter" @click="columnAdd(0)">COLUMN</div>
            <div
              class="subitem flex vcenter"
              v-for="item in columnList"
              @click="columnAdd(item)"
            >{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <textarea name id cols="30" rows="10" class="html-box" v-model="htmlcode"></textarea>

    <div class="css-box">
      <button @click="cssNormal">normal</button>
      <button @click="cssTree">tree</button>
      <code class="css-code" v-html="csscode"></code>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import preview from './component/preview'
import uid2 from 'uid2'
import classname from 'classname'
window.ccc = classname
export default {
  name: 'index',
  data() {
    return {
      current_id: ['1'],
      appendPosition: 'subChildAppend',
      cssType: 'normal', //normal tree
      dataset: [
        {
          id: '1',
          value: '1',
          tagType: 'div',
          direction: 'row',
          className: '',
          classObj: {},
          subset: []
        }
      ],
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
  methods: {
    setExtendAttr(index, item) {
      let obj = JSON.parse(JSON.stringify(this.currentItem.classObj))
      obj[index] = !item
      this.currentItem.classObj = obj
      // console.log('this.currentItem.classObj', this.currentItem.classObj)
      this.currentItem.className = classname(this.currentItem.className, obj)
    },
    setElementAttr(type) {
      let item = this.getNode(this.dataset, this.current_id)
      // console.log('item', arr)
      // arr.forEach(item => {
      switch (type) {
        case 'grow':
          item.classObj = Object.assign({}, item.classObj, { grow: true })
          item.className = classname(item.className, 'grow')
          break
        case 'justift-center':
          item.classObj = Object.assign({}, item.classObj, { center: true })
          item.className = classname(item.className, 'center')
          break
        case 'align-center':
          item.classObj = Object.assign({}, item.classObj, {
            'align-center': true
          })
          item.className = classname(item.className, 'align-center')
          break
        case 'padding-10':
          item.classObj = Object.assign({}, item.classObj, {
            'p-all-10': true
          })
          item.className = classname(item.className, 'p-all-10')
          break
      }
      this.currentItem = item
      // })
    },
    cssNormal() {
      this.cssType = 'normal'
    },
    cssTree() {
      this.cssType = 'tree'
    },
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
      console.log(event)
      this.tagType = event.tagType
      if (this.isMulitle) {
        let finditem = this.current_id.find(item => {
          return item == event.id
        })

        // console.log(finditem);
        if (finditem === undefined) {
          this.current_id.push(event.id)
        } else {
          // console.log(finditem)
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
        // arr.forEach(item => {
        //   this.currentItem = item
        // })
      }
    },
    getNode(subset, id) {
      // let res = subset.filter(item => {
      //   return item.id == id
      // })
      // console.log('getNode', id)
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
        // if (element.id == id[0]) {
        //   res = element
        //   console.log('resresresres', res)
        // } else {
        //   res = this.getNode(element.subset, id)
        // }
      }

      return res
      // let item = subset.filter(item => {
      //   // return item.id == id
      //   let findresult = id.find(subitem => {
      //     return subitem == item.id
      //   })
      //   return !!findresult
      // })
      // if (item.length > 0) {
      //   return item
      // } else {
      //   let res = ''
      //   subset.map(item => {
      //     res = this.getNode(item.subset, id)
      //   })
      //   return res
      // }
    },
    //   遍历树结构，找到指定值
    getNodeById(subset, id) {
      let item = subset.filter(item => {
        // return item.id == id
        let findresult = id.find(subitem => {
          return subitem == item.id
        })
        console.log(!!findresult)
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
      //   console.log( this.current_id)
      this.getNodeById(this.dataset, this.current_id)
      //   this.dataset.subset.push({
      //               id:"2.3",
      //               value:"2.3"
      //           })
    },
    resetUid(dataset) {
      console.log(dataset)
      if (dataset.length > 0) {
        dataset.forEach(item => {
          console.log(item.id)
          item.id = uid2(10)
          console.log(item.id)
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
              classObj: {},
              subset: []
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
              classObj: {},
              subset: nSubset
            })
          })
        }
      })
      this.setDatasetClassName(this.dataset, 1)
    },
    jsonToHtmlStyle1(array, tagType) {
      // 操作
      // let element = null
      // if(parentElement==null){
      if (tagType == undefined) {
        tagType = 'div'
      }
      let element = document.createElement(tagType)
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
        // let nodeHeader = ''
        // let sublevel = ''
        // if (parentHeader == '') {
        //   nodeHeader = '.' + this.containerName
        //   sublevel = ''
        // } else {
        //   nodeHeader =
        //     parentHeader + ' ' + item.tagType + '.s' + parentLevel + '-' + index
        //   sublevel = parentLevel + '-' + index
        // }

        // result.push(nodeHeader + ' {}')
        // this.jsonToCssStyle2(item.subset, nodeHeader, sublevel, result)
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
  computed: {
    htmlcode: function() {
      // console.log(this.jsonToHtmlStyle1(this.dataset))
      let element = this.jsonToHtmlStyle1(this.dataset)
      // // console.log(element);
      // console.log('change',this.dataset)
      console.log('change', element.outerHTML)
      var result = tidy_html5(element.outerHTML, options)
      console.log('result', result)
      return tidy_html5(element.outerHTML, options)
    },
    csscode: function() {
      let result = []
      if (this.cssType == 'normal') {
        this.jsonToCssStyle1(this.dataset, '', 1, result)
        let newResult = result.map(item => {
          return '<p>' + item + '</p>'
        })
        return newResult.join('\n')
      }
      if (this.cssType == 'tree') {
        let res = this.jsonToCssStyle2(this.dataset, '', true)

        return res
      }
      // console.log(result);
    }
  },
  watch: {
    containerName(newValue) {
      // console.log(v,e)
      this.dataset[0].className = newValue
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
  },
  components: {
    preview
  }
}
</script>

<style>
.html-box,
.css-box {
  display: block;
  margin-top: 20px;
  min-height: 500px;
  width: 100%;
  border: 1px solid #ddd;
  text-align: left;
}

.preview {
  height: 100%;
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
.paremt_preview {
  height: 800px;
}
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
</style>
