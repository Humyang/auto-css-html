<template>
  <div class="scq-view flex column" style="height: 100%;">
    <!-- <van-nav-bar title="标题" left-text="返回" left-arrow class="grow" ref="vanNavBar">
  <van-icon name="search" slot="right" />
    </van-nav-bar>-->
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
      <div style="height:100%;overflow:auto;margin-right:10px;flex-grow: 1;" class="flex column">
        <el-tabs type="border-card" @tab-click="resultClick">
          <el-tab-pane label="视图">
            <div>
              <el-switch
                v-for="(item, index) in currentItem.classObj"
                :key="index"
                :value="item"
                @change="setExtendAttr(index, item)"
                :inactive-text="index"
                inactive-color="#13ce66"
                active-color="#ff4949"
                :active-value="false"
                :inactive-value="true"
              ></el-switch>
            </div>

            <div class="flex row">
              <!-- <realView :dataset="dataset" :controlView="controlView"></realView> -->
              <iframe src="/realview" frameborder="0" class="realviewIframe"></iframe>
              <preview
                @actionSaveSelected="actionSaveSelected"
                v-on:currentSelect="actionPreviewClick"
                v-on:rootClick="rootClick"
                :dataset="dataset"
                :controlView="controlView"
              ></preview>
            </div>
          </el-tab-pane>
          <el-tab-pane label="HTML">
            <code class="css-code">{{ htmlCode }}</code>
          </el-tab-pane>
          <el-tab-pane label="CSS">
            <div class="css-box">
              <!-- <button @click="cssNormal">normal</button>
              <button @click="cssTree">tree</button>-->

              <el-tabs type="border-card">
                <el-tab-pane label="RAW">
                  <code class="css-code" v-html="csscodeList"></code>
                </el-tab-pane>
                <el-tab-pane label="SCSS、LESS">
                  <code class="css-code" v-html="csscodeTree"></code>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width:500px">
        <el-tabs type="border-card">
          <el-tab-pane label="预设">
            <collection
              @actionColumnAdd="columnAdd"
              @actionRowAdd="rowAdd"
              @rawToPreView="rawToPreView"
              @onChangePosition="onChangePosition"
              @onSelected="collectionInsert"
              @actionInsert="actionInsert"
            />
          </el-tab-pane>
          <el-tab-pane label="预设类名">
            <div class="flex column content" style="text-align: left;">
              <preClass @actionClick="setElementAttr" />
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
          <el-tab-pane label="操作">
            <!-- <p>删除选中</p> -->
            <el-button type="danger" plain @click="actionRemoveSelected">删除选中</el-button>
            <!-- <p>选中上级</p> -->
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import preview from "./component/preview";
import uid2 from "uid2";
import classname from "classname";
window.ccc = classname;
import { mapMutations, mapActions, mapState } from "vuex";

// import cssObj from '@/css/flex.scss'
// console.log('cssObj', cssObj)
import cssDeclaration from "./component/CSSStyleDeclaration";
import preClass from "./component/preClass";
import collection from "./component/collection";
import realView from "./component/realView";
export default {
  name: "SCQ",
  components: { cssDeclaration, preview, preClass, collection, realView },
  data() {
    return {
      controlView: true,
      deviceType: "mobile",
      htmlCode: "",
      // preClass,
      currentHistroyIndex: 0,
      current_id: [],
      appendPosition: "subChildAppend",
      // cssType: 'normal', //normal tree
      dataset: [],
      containerName: "container",
      addDirection: "row",
      addNumber: 1,
      currentItem: {},
      currentItemSubset: [],
      tagType: "div",
      tageTypeArray: ["div", "view", "image", "text", "span", "van-nav-bar"],
      isMulitle: false
    };
  },

  computed: {
    ...mapState({
      elementHistory: state => state.elementHistory
    }),
    csscodeList: function() {
      let result = [];
      this.jsonToCssStyle1(this.dataset, "", 1, result);
      let newResult = result.map(item => {
        return "<p>" + item + "</p>";
      });
      return newResult.join("\n");
    },
    csscodeTree: function() {
      let res = this.jsonToCssStyle2(this.dataset, "", true);

      return res;
    }
  },
  methods: {
    ...mapActions(["pushPreSave", "setElement", "timeTravel"]),
    actionSaveSelected(selected) {
      let item = this.getNodeById(this.dataset, this.current_id);
      this.pushPreSave(item[0]);
    },
    rootClick() {
      this.currentItem = this.dataset;
      this.currentItemSubset = this.dataset;
    },
    rawToPreView(data) {
      let item = this.getNodeById(this.dataset, this.current_id);
      // item.push(parent);
      this.currentItemSubset.push(data);

      // // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    actionRemoveSelected() {
      // item.subset = [];
      this.dataset = this.removeSelected(this.dataset, this.current_id);
      this.updateElementSetElement();

      console.log("removeSelected2", this.dataset);
    },
    removeSelected(subset, id) {
      let res = "";
      for (let index = 0; index < subset.length; index++) {
        const element = subset[index];
        let findresult = id.find(subitem => {
          return subitem == element.id;
        });

        if (findresult) {
          subset = [...subset.slice(0, index), ...subset.slice(index + 1)];
          break;
        } else {
          element.subset = this.removeSelected(element.subset, id);
        }
      }
      return subset;
    },
    actionInsert(data) {
      // subitem.subset.push({
      //         tagType: this.tagType,
      //         direction: this.addDirection,
      //         id: uid2(10),
      //         className: '',
      //         levelClassName: '',
      //         classObj: { grow: true },
      //         subset: nSubset,
      //         style: {}
      //       })
      let props = {};
      data.props.forEach(item => {
        props[item.name] = item.value;
      });
      let obj = {
        tagType: data.tagName,
        direction: this.addDirection,
        id: uid2(10),
        props: props,
        levelClassName: "",
        classObj: { grow: true },
        subset: [],
        style: {}
      };
      // console.log('actionInsert',data)
      let parent = {
        tagType: "div",
        // direction: 'row',
        id: uid2(10),
        className: "",
        // classObj: { grow: true },
        subset: [obj],
        style: {}
      };
      let item = this.getNodeById(this.dataset, this.current_id);
      // item.push(parent);
      this.currentItemSubset.push(parent);

      // // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    collectionInsert(data) {
      console.log("collectionInsert", data);
      let item = this.getNode(this.dataset, this.current_id);
      item.subset.push(data);

      // // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    updateElementSetElement() {
      this.setElement(JSON.parse(JSON.stringify(this.dataset)));
      this.refreshRealView();
    },
    onChangePosition(value) {
      this.appendPosition = value;
    },
    resultClick(r) {
      console.log("resultClick", r);
      if (r.label == "HTML") {
        this.htmlCode = this.$refs.preview.outerHTML;
      }
    },
    onCssDeclarationSave(obj) {
      let item = this.getNode(this.dataset, this.current_id);
      // console.log('onCssDeclarationSave item', item)
      item.style[obj.rules] = obj.value;
      this.currentItem = item;

      // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    actionTimeTravel(index) {
      this.timeTravel(index);
      this.currentHistroyIndex = index;
    },
    refreshRealView() {
      this.controlView = false;
      setTimeout(() => {
        this.controlView = true;
      }, 50);
    },
    setExtendAttr(index, item) {
      let obj = JSON.parse(JSON.stringify(this.currentItem.classObj));
      obj[index] = !item;
      this.currentItem.classObj = obj;
      this.currentItem.className = classname(this.currentItem.className, obj);
      // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
      // this.updateElementSetElement()
    },
    setElementAttr(type) {
      let item = this.getNode(this.dataset, this.current_id);

      item.classObj = Object.assign({}, item.classObj, {
        [type]: true
      });
      item.className = classname(item.className, type);
      this.currentItem = item;

      // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    // cssNormal() {
    //   this.cssType = 'normal'
    // },
    // cssTree() {
    //   this.cssType = 'tree'
    // },
    currentTagChange(event) {
      console.log(event);
      this.getNodeByIdChaneType(this.dataset, this.current_id, event);
    },
    getNodeByIdChaneType(subset, id, tagType) {
      let item = subset.filter(item => {
        // return item.id == id
        let findresult = id.find(subitem => {
          return subitem == item.id;
        });
        console.log(!!findresult);
        return !!findresult;
      });
      if (item.length > 0) {
        item.forEach(subitem => {
          subitem.tagType = tagType;
        });
        this.setDatasetClassName(this.dataset, 1);
      } else {
        subset.map(item => {
          this.getNodeByIdChaneType(item.subset, id, tagType);
        });
      }
    },
    actionPreviewClick(dataset) {
      this.current_id = JSON.parse(JSON.stringify([dataset.id]));
      let arr = this.getNode(this.dataset, this.current_id);
      this.currentItemSubset = arr.subset;
      this.currentItem = arr;
    },
    // getCurrent(event) {
    //   this.tagType = event.tagType;
    //   if (this.isMulitle) {
    //     // alert(444)
    //     let finditem = this.current_id.find(item => {
    //       return item == event.id;
    //     });
    //     if (finditem === undefined) {
    //       this.current_id.push(event.id);
    //     } else {
    //       this.current_id.splice(
    //         this.current_id.findIndex(item => {
    //           return item === finditem;
    //         }),
    //         1
    //       );
    //     }

    //     let newarray = JSON.parse(JSON.stringify(this.current_id));
    //     this.current_id = newarray;
    //   } else {
    //     // console.log('getCurrent')
    //     // debugger
    //     // alert(123)
    //     this.current_id = JSON.parse(JSON.stringify([event.id]));
    //     let arr = this.getNode(this.dataset, this.current_id);
    //     this.currentItem = arr;
    //   }
    // },
    getNode(subset, id) {
      let res = "";
      for (let index = 0; index < subset.length; index++) {
        const element = subset[index];
        let findresult = id.find(subitem => {
          return subitem == element.id;
        });
        if (findresult) {
          res = element;
          break;
        } else {
          res = this.getNode(element.subset, id);
          if (res != "") {
            break;
          }
        }
      }
      return res;
    },
    //   遍历树结构，找到指定值
    getNodeById(subset, id) {
      let item = subset.filter(item => {
        let findresult = id.find(subitem => {
          return subitem == item.id;
        });
        return !!findresult;
      });
      if (item.length > 0) {
        return item;
      } else {
        subset.forEach(item => {
          let res = this.getNodeById(item.subset, id);
          if (res) {
            return res;
          }
        });
      }
      return false;
    },
    columnAdd(number) {
      this.addDirection = "column";
      if (number == 0) {
        this.currentItem.direction = this.addDirection;
        this.updateElementSetElement();
      } else {
        this.addNumber = number;
        let item = this.getNodeById(this.dataset, this.current_id);

        this.addElement(this.currentItemSubset);
      }
    },
    rowAdd(number) {
      this.addDirection = "row";
      if (number == 0) {
        this.currentItem.direction = this.addDirection;
        this.updateElementSetElement();
      } else {
        this.addNumber = number;
        let item = this.getNodeById(this.dataset, this.current_id);

        this.addElement(this.currentItemSubset);
      }
    },
    resetUid(dataset) {
      if (dataset.length > 0) {
        dataset.forEach(item => {
          item.id = uid2(10);
          this.resetUid(item.subset);
        });
      }
    },
    addElement(item) {
      // console.log('add element', item)
      let addArray = new Array(this.addNumber);
      addArray.fill(1);
      // item.forEach(subitem => {
      item.direction = this.addDirection;

      if (this.appendPosition == "subChildAppend") {
        addArray.forEach(() => {
          item.push({
            tagType: this.tagType,
            direction: this.addDirection,
            id: uid2(10),
            className: "",
            levelClassName: "",
            classObj: { grow: true },
            subset: [],
            style: {}
          });
        });
      }
      if (this.appendPosition == "subChildInsert") {
        let subset = JSON.parse(JSON.stringify(item.subset));

        item.subset = [];

        addArray.forEach(() => {
          let nSubset = JSON.parse(JSON.stringify(subset));
          this.resetUid(nSubset);
          item.subset.push({
            tagType: this.tagType,
            direction: this.addDirection,
            id: uid2(10),
            className: "",
            levelClassName: "",
            classObj: { grow: true },
            subset: nSubset,
            style: {}
          });
        });
      }
      // });
      this.setDatasetClassName(this.dataset, 1);
      // this.setElement(JSON.parse(JSON.stringify(this.dataset)))
      this.updateElementSetElement();
    },
    // jsonToHtmlStyle1(array, tagType) {
    //   // 操作
    //   // let element = null
    //   // if(parentElement==null){
    //   if (tagType == undefined) {
    //     tagType = 'div'
    //   }
    //   let element = document.createElement(tagType)
    //   // 子级
    //   array.forEach(item => {
    //     console.log('item.tagType', item.tagType)
    //     let childElement = this.jsonToHtmlStyle1(item.subset, item.tagType)
    //     childElement.className = classname(
    //       item.className,
    //       'flex',
    //       item.direction
    //     )
    //     childElement.style = item.style
    //     element.appendChild(childElement)
    //   })
    //   // 返回元素
    //   return element
    // },

    jsonToCssStyle1(array, parentHeader, parentLevel, result) {
      array.forEach((item, index) => {
        let nodeHeader = "";
        let sublevel = "";
        if (parentHeader == "") {
          nodeHeader = "." + this.containerName;
          sublevel = "";
        } else {
          nodeHeader =
            parentHeader +
            " " +
            item.tagType +
            ".s" +
            parentLevel +
            "-" +
            index;
          sublevel = parentLevel + "-" + index;
        }

        result.push(nodeHeader + " {}");
        this.jsonToCssStyle1(item.subset, nodeHeader, sublevel, result);
      });
    },
    jsonToCssStyle2(array, result, top) {
      // console.log('2222222222', array)
      let res = "";
      array.forEach((item, index) => {
        res = res + "." + item.className + "{";
        if (item.subset) {
          res += this.jsonToCssStyle2(item.subset, result, false);
        }
      });
      if (!top) {
        res += "}";
      }
      return res;
    },
    setDatasetClassName(array, parentLevel) {
      array.forEach((item, index) => {
        let sublevel = "";
        if (parentLevel == 1) {
          sublevel = "";
        } else {
          sublevel = parentLevel + "-" + index;
          item.className = classname({}, item.classObj);
          item.levelClassName = "s" + sublevel;
        }

        this.setDatasetClassName(item.subset, sublevel);
      });
    }
  },
  watch: {
    elementHistory: {
      handler: function() {
        this.currentHistroyIndex = this.elementHistory.length - 1;
      },
      immediate: true
    },
    // dset: {
    //   handler: function() {
    //     this.dataset = this.dset;
    //     let arr = this.getNode(this.dataset, this.current_id);
    //     this.currentItem = arr;
    //   },
    //   immediate: true
    // },
    containerName(newValue) {
      // console.log(v,e)
      this.dataset[0].className = newValue;
      this.setElement(this.dataset);
    }
  },
  created() {
    //   let body = document.getElementsByTagName('body')
    // this.dataset[0].className = this.containerName;
    window.addEventListener("keydown", event => {
      //   console.log(event)
      if (event.keyCode == 17) {
        this.isMulitle = true;
      }
    });
    window.addEventListener("keyup", event => {
      //   console.log(event)
      if (event.keyCode == 17) {
        this.isMulitle = false;
      }
    });
    window.deb = this;
    this.currentItemSubset = this.dataset;
  }
};
</script>

<style>
.realviewIframe {
  width: 414px;
  height: 700px;
  border: 4px solid #333;
}
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
  /* box-sizing: border-box; */
  border: 1px solid black;
  padding: 20px;

  box-sizing: content-box;
}
.scq-view {
  /* height: 800px; */
  min-width: 100px;
}
.content {
  height: 100%;
}
.scq-view .el-button + .el-button,
.scq-view .el-button {
  margin-left: 0;
  margin-right: 10px;
  margin-top: 5px;
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
