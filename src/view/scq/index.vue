<template>
  <div class="scq-view flex column" style="height: 100%;">
    <!-- <van-nav-bar title="标题" left-text="返回" left-arrow class="grow" ref="vanNavBar">
  <van-icon name="search" slot="right" />
    </van-nav-bar>-->
    <!-- <div>
      <div class="current flex row" style="width:100%;">
        <div>按下多选：{{ isMulitle }}</div>

        <div class="flex row">
          父级名称
          <el-input v-model="containerName" placeholder="请输入内容"></el-input>
        </div>
      </div>
    </div>-->
    <div class="flex row">
      <div style="height:100%;overflow:auto;margin-right:10px;flex-grow: 1;" class="flex column">
        <el-tabs type="border-card" @tab-click="resultClick">
          <el-tab-pane label="视图">
            <div class="flex row">
              <!-- <realView :dataset="dataset" :controlView="controlView"></realView> -->

              <div>
                <iframe ref="iframeRef" :src="'/realview'" class="realviewIframe"></iframe>
              </div>
              <div class="grow flex row" style="padding-left: 20px;">
                <preview
                  @actionSaveSelected="actionSaveSelected"
                  v-on:currentSelect="actionPreviewClick"
                  @actionInsert="actionInsert"
                  v-on:rootClick="rootClick"
                  :dataset="dataset"
                  :controlView="controlView"
                ></preview>
                <div>
                  <el-switch
                    v-for="(item, index) in currentItem.options&&currentItem.options.attrs.class"
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
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="HTML">
            <!-- <code class="css-code">{{ htmlCode }}</code> -->
          </el-tab-pane>
          <el-tab-pane label="CSS">
            <div class="css-box">
              <!-- <button @click="cssNormal">normal</button>
              <button @click="cssTree">tree</button>-->

              <el-tabs type="border-card">
                <el-tab-pane label="RAW">
                  <!-- <code class="css-code" v-html="csscodeList"></code> -->
                </el-tab-pane>
                <el-tab-pane label="SCSS、LESS">
                  <!-- <code class="css-code" v-html="csscodeTree"></code> -->
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
              :controlView="controlView"
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
                  <css-declaration ref="CssDec" />
                </el-tab-pane>
                <el-tab-pane label="HTML">
                  <htmlProperty ref="HtmlDec" />
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
import cssDeclaration from "./component/CSSStyleDeclaration/CSSStyleDeclaration";
import htmlProperty from "./component/HTMLProperty/index";
import preClass from "./component/preClass";
import collection from "./component/collection";
import realView from "./component/realView";
export default {
  name: "SCQ",
  components: {
    cssDeclaration,
    preview,
    preClass,
    collection,
    realView,
    htmlProperty
  },
  data() {
    return {
      realViewCount: 0,
      controlView: true,
      deviceType: "mobile",
      htmlCode: "",
      // preClass,
      currentHistroyIndex: 0,
      current_id: [],
      appendPosition: "subChildAppend",
      // cssType: 'normal', //normal tree
      // dataset: [],
      containerName: "container",
      // addDirection: "row",
      addNumber: 1,
      currentItem: {},
      currentItemSubset: [],
      tagName: "div",

      isMulitle: false,
      dataset: []
    };
  },

  computed: {
    ...mapState({
      elementHistory: state => state.elementHistory,
      datasetStore: state => {
        this.dataset = JSON.parse(JSON.stringify(state.dataset));
      }
    })

    // csscodeList: function() {
    //   let result = [];
    //   this.jsonToCssStyle1(this.dataset, "", 1, result);
    //   let newResult = result.map(item => {
    //     return "<p>" + item + "</p>";
    //   });
    //   return newResult.join("\n");
    // },
    // csscodeTree: function() {
    //   let res = this.jsonToCssStyle2(this.dataset, "", true);

    //   return res;
    // }
  },
  methods: {
    ...mapActions(["pushPreSave", "setElement", "timeTravel"]),
    ...mapMutations(["SET_DATASET"]),
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
      this.currentItemSubset.push(data);

      this.updateElementSetElement();
    },
    actionRemoveSelected() {
      // item.subset = [];
      this.dataset = this.removeSelected(this.dataset, this.current_id);

      // this.setElement(JSON.parse(JSON.stringify(dataset)));
      this.updateElementSetElement();
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
      let props = {};
      data.props.forEach(item => {
        props[item.name] = item.value;
      });
      let obj = {
        tagName: data.tagName,
        id: uid2(10),
        options: {
          props: props,
          attrs: {
            class: [],
            style: [],
            property: []
          }
        },
        subset: []
        // tagName: data.tagName,
        // direction: this.addDirection,
        // id: uid2(10),
        // props: props,
        // levelClassName: "",
        // subset: [],
        // style: [],
        // property: []
      };
      let parent = {
        tagName: "div",
        id: uid2(10),
        options: {
          props: props,
          attrs: {
            class: [],
            style: [],
            property: []
          }
        },
        subset: [obj]
        // tagName: "div",
        // id: uid2(10),
        // className: "",
        // subset: [obj],
        // style: [],
        // property: []
      };
      let item = this.getNodeById(this.dataset, this.current_id);
      this.currentItemSubset.push(parent);
      this.updateElementSetElement();
    },
    collectionInsert(data) {
      console.log("collectionInsert", data);
      let item = this.getNode(this.dataset, this.current_id);
      item.subset.push(data);

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
    actionTimeTravel(index) {
      this.timeTravel(index);
      this.currentHistroyIndex = index;
    },
    refreshRealView() {
      this.controlView = false;
      this.realViewCount++;
      setTimeout(() => {
        this.controlView = true;
      }, 50);
    },
    setExtendAttr(index, item) {
      let obj = JSON.parse(
        JSON.stringify(this.currentItem.options.attrs.class)
      );
      obj[index] = !item;
      this.currentItem.options.attrs.class = obj;
      // this.currentItem.className = classname(this.currentItem.className, obj);
      this.updateElementSetElement();
    },
    setElementAttr(type) {
      let item = this.getNode(this.dataset, this.current_id);

      item.options.attrs.class = Object.assign({}, item.options.attrs.class, {
        [type]: true
      });
      // item.className = classname(item.className, type);
      this.currentItem = item;

      this.updateElementSetElement();
    },
    // currentTagChange(event) {
    //   console.log(event);
    //   this.getNodeByIdChaneType(this.dataset, this.current_id, event);
    // },
    // getNodeByIdChaneType(subset, id, tagName) {
    //   let item = subset.filter(item => {
    //     let findresult = id.find(subitem => {
    //       return subitem == item.id;
    //     });
    //     console.log(!!findresult);
    //     return !!findresult;
    //   });
    //   if (item.length > 0) {
    //     item.forEach(subitem => {
    //       subitem.tagName = tagName;
    //     });
    //     this.setDatasetClassName(this.dataset, 1);
    //   } else {
    //     subset.map(item => {
    //       this.getNodeByIdChaneType(item.subset, id, tagName);
    //     });
    //   }
    // },
    actionPreviewClick(dataset) {
      this.current_id = JSON.parse(JSON.stringify([dataset.id]));
      let arr = this.getNode(this.dataset, this.current_id);
      this.currentItemSubset = arr.subset;
      this.currentItem = arr;
      this.$refs.CssDec.setList(this.currentItem.options.attrs.style);
      this.$refs.HtmlDec.setList(this.currentItem);
    },
    getNode(subset, id) {
      let res = "";
      for (let index = 0; index < subset.length; index++) {
        const element = subset[index];
        if (typeof element == "object") {
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
        let res = false;
        for (let index = 0; index < subset.length; index++) {
          const element = subset[index];
          if (typeof element == "object") {
            res = this.getNodeById(element.subset, id);
            if (res) {
              // continue;
              break;
            }
          }
        }
        if (res) {
          return res;
        } else {
          return false;
        }
      }
    },
    columnAdd(number) {
      // this.addDirection = "column";
      if (number == 0) {
        // this.currentItem.direction = this.addDirection;
        this.updateElementSetElement();
      } else {
        this.addNumber = number;
        let item = this.getNodeById(this.dataset, this.current_id);

        this.addElement(this.currentItemSubset);
      }
    },
    rowAdd(number) {
      // this.addDirection = "row";
      if (number == 0) {
        // this.currentItem.direction = this.addDirection;
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
          if (typeof item == "object") {
            item.id = uid2(10);
            this.resetUid(item.subset);
          }
        });
      }
    },
    addElement(item) {
      // console.log('add element', item)
      let addArray = new Array(this.addNumber);
      addArray.fill(1);

      if (this.appendPosition == "subChildAppend") {
        addArray.forEach(() => {
          item.push({
            tagName: this.tagName,
            id: uid2(10),
            options: {
              props: {},
              attrs: {
                class: [],
                style: [],
                property: []
              }
            },
            subset: []
            // direction: this.addDirection,
            // className: "",
            // levelClassName: "",
            // classObj: { grow: true },
            // subset: [],
            // style: [],
            // property: [],
            // props: []
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
            tagName: this.tagName,
            id: uid2(10),
            options: {
              props: {},
              attrs: {
                class: [],
                style: [],
                property: []
              }
            },
            subset: [nSubset]
            // tagName: this.tagName,
            // direction: this.addDirection,
            // id: uid2(10),
            // className: "",
            // levelClassName: "",
            // classObj: { grow: true },
            // subset: nSubset,
            // style: [],
            // property: [],
            // props: []
          });
        });
      }
      // });
      // this.setDatasetClassName(this.dataset, 1);
      this.updateElementSetElement();
    },
    // jsonToHtmlStyle1(array, tagName) {
    //   // 操作
    //   // let element = null
    //   // if(parentElement==null){
    //   if (tagName == undefined) {
    //     tagName = 'div'
    //   }
    //   let element = document.createElement(tagName)
    //   // 子级
    //   array.forEach(item => {
    //     console.log('item.tagName', item.tagName)
    //     let childElement = this.jsonToHtmlStyle1(item.subset, item.tagName)
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
            item.tagName +
            ".s" +
            parentLevel +
            "-" +
            index;
          sublevel = parentLevel + "-" + index;
        }

        result.push(nodeHeader + " {}");
        this.jsonToCssStyle1(item.subset, nodeHeader, sublevel, result);
      });
    }
    // jsonToCssStyle2(array, result, top) {
    //   // console.log('2222222222', array)
    //   let res = "";
    //   array.forEach((item, index) => {
    //     res = res + "." + item.className + "{";
    //     if (item.subset) {
    //       res += this.jsonToCssStyle2(item.subset, result, false);
    //     }
    //   });
    //   if (!top) {
    //     res += "}";
    //   }
    //   return res;
    // }
    // setDatasetClassName(array, parentLevel) {
    //   array.forEach((item, index) => {
    //     let sublevel = "";
    //     if (parentLevel == 1) {
    //       sublevel = "";
    //     } else {
    //       sublevel = parentLevel + "-" + index;
    //       item.className = classname({}, item.options.attrs.class);
    //       item.levelClassName = "s" + sublevel;
    //     }

    //     this.setDatasetClassName(item.subset, sublevel);
    //   });
    // }
  },
  watch: {
    elementHistory: {
      handler: function() {
        this.currentHistroyIndex = this.elementHistory.length - 1;
      },
      immediate: true
    },
    dataset: {
      handler: function() {
        this.SET_DATASET(this.dataset);
      },
      deep: true
    }
    // dset: {
    //   handler: function() {
    //     this.dataset = this.dset;
    //     let arr = this.getNode(this.dataset, this.current_id);
    //     this.currentItem = arr;
    //   },
    //   immediate: true
    // },
    // containerName(newValue) {
    // console.log(v,e)
    // this.dataset[0].className = newValue;
    // this.setElement(this.dataset);
    // }
  },
  mounted() {
    console.log("aaaa", this.$refs.iframeRef);
    // setInterval(() => {
    //   this.updateElementSetElement();
    // }, 500);
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
