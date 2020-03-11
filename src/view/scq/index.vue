<template>
  <div class="scq-view flex column" style="height: 100%;">
    <div class="flex row">
      <div style="height:100%;overflow:auto;margin-right:10px;flex-grow: 1;" class="flex column">
        <el-tabs type="border-card" @tab-click="resultClick">
          <el-tab-pane label="视图">
            <div class="flex row">
              <div>
                <iframe ref="iframeRef" :src="'/realview'" class="realviewIframe"></iframe>
              </div>
              <div class="grow flex row" style="padding-left: 20px;">
                <!-- @rootClick="rootClick" -->
                <preview
                  @currentSelect="actionPreviewClick"
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
            <!-- <code class="css-code">{{htmlCode}}</code> -->
            <!-- <textarea name id cols="30" rows="10">{{htmlCode}}</textarea> -->
            <pre id="editorHTML" style="height:600px">{{htmlCode}}</pre>
          </el-tab-pane>
          <el-tab-pane label="CSS">
            <div class="css-box">
              <!-- <button @click="cssNormal">normal</button>
              <button @click="cssTree">tree</button>-->

              <el-tabs type="border-card">
                <el-tab-pane label="RAW">
                  <!-- <code class="css-code" v-html="csscodeList"></code> -->
                  <pre id="editorCSS_LIST" style="height:600px">{{csscodeList}}</pre>
                </el-tab-pane>
                <el-tab-pane label="SCSS、LESS">
                  <!-- <code class="css-code" v-html="csscodeTree"></code> -->
                  <pre id="editorCSS_TREE" style="height:600px">{{csscodeTree}}</pre>
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
            <el-button type="danger" plain @click="actionSaveSelected">存入预设</el-button>

            <!-- <pickOnAll @actionInsert="actionInsert" @rawToPreView="rawToPreView" /> -->
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
// https://ace.c9.io/
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
import {
  getFormatedData,
  propertyToString,
  styleToString
} from "@/utils/formatMethods";

import resetUid from "@/utils/resetUid.js";

// import pickOnAll from "./component/pickOnAll";
export default {
  name: "SCQ",
  components: {
    cssDeclaration,
    preview,
    preClass,
    collection,
    realView,
    htmlProperty
    // pickOnAll
  },
  data() {
    return {
      editorHTML: "",
      editorCSS_LIST: "",
      csscodeList: "",
      editorCSS_TREE: "",
      csscodeTree: "",
      realViewCount: 0,
      controlView: true,
      deviceType: "mobile",
      htmlCode: "",
      currentHistroyIndex: 0,
      current_id: [],
      appendPosition: "subChildAppend",
      containerName: "container",
      addNumber: 1,
      currentItem: {},
      currentItemSubset: [],
      tagName: "div",
      isMulitle: false,
      dataset: {
        tagName: "div",
        id: "root",
        options: {
          props: {},
          attrs: {
            class: {},
            style: [],
            property: []
          }
        },
        subset: []
      }
    };
  },

  computed: {
    ...mapState({
      elementHistory: state => state.elementHistory,
      datasetStore: state => {
        this.dataset = JSON.parse(JSON.stringify(state.dataset));
      }
    })
  },
  methods: {
    ...mapActions(["pushPreSave", "setElement", "timeTravel"]),
    ...mapMutations(["SET_DATASET"]),
    // jsonToCssStyle2(array, result, top) {
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
    // },
    getCssTree(dataset, prefix) {
      let r = [];
      for (let index = 0; index < dataset.subset.length; index++) {
        let sub = "";
        const element = dataset.subset[index];
        let nodeFlagClass = "";
        if (prefix == "") {
          nodeFlagClass = ".node-" + index;
        } else {
          nodeFlagClass = prefix + "-" + index;
        }
        // element.options.attrs.class[nodeFlagClass] = true;
        sub = this.getCssTree(element, nodeFlagClass);
        let res = `${nodeFlagClass}{ ${sub} } `;
        r.push(res);
      }
      if (prefix == "") {
        let res = `.${dataset.id}{${r.join("")}}`;

        return res;
      } else {
        return r.join("");
      }
      // return r.join("");
    },
    getCssList(dataset, parentHeader, parentLevel, result) {
      for (let index = 0; index < dataset.subset.length; index++) {
        const element = dataset.subset[index];
        let nodeHeader = "";
        let sublevel = "";
        if (parentHeader == "") {
          nodeHeader = "." + dataset.id + " .node-" + index;
          sublevel = index;
        } else {
          nodeHeader =
            parentHeader + " " + ".node-" + parentLevel + "-" + index;
          sublevel = parentLevel + "-" + index;
        }
        result.push(nodeHeader + " {}");
        this.getCssList(element, nodeHeader, sublevel, result);
      }
    },
    getHTML(dataset, level, prefix) {
      let r = [];
      for (let index = 0; index < dataset.subset.length; index++) {
        let sub = "";
        const element = dataset.subset[index];
        let nodeFlagClass = "";
        if (prefix == "") {
          nodeFlagClass = "node-" + level;
        } else {
          nodeFlagClass = prefix + "-" + index;
        }
        element.options.attrs.class[nodeFlagClass] = true;
        sub = this.getHTML(element, level++, nodeFlagClass);
        r.push(sub);
      }
      let rootName = "";
      if (prefix == "") {
        rootName = dataset.id;
      }
      let res = `<${dataset.tagName} ${propertyToString(
        dataset.options.attrs.property
      )} ${propertyToString(dataset.options.props)} style="${styleToString(
        dataset.options.attrs.style
      )}" class="${classname(dataset.options.attrs.class, rootName)}">
        ${r.join("")}</${dataset.tagName}>`;

      return res;
    },
    actionSaveSelected(selected) {
      let item = this.getNodeById(this.dataset, this.current_id);
      this.pushPreSave(item);
    },
    rootClick() {
      this.currentItem = this.dataset;
      this.currentItemSubset = this.dataset.subset;
    },
    rawToPreView(data) {
      let item = this.getNodeById(this.dataset, this.current_id);
      this.currentItemSubset.push(data);

      this.updateElementSetElement();
    },
    actionRemoveSelected() {
      // item.subset = [];
      if (this.current_id == "root") {
        this.dataset.subset = [];
      } else {
        this.dataset.subset = this.removeSelected(
          this.dataset.subset,
          this.current_id
        );
      }

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
      let item = this.getNodeById(this.dataset, this.current_id);
      this.currentItemSubset.push(getFormatedData(data));
      this.updateElementSetElement();
    },
    collectionInsert(data) {
      let item = this.getNode(this.dataset.subset, this.current_id);
      item.subset.push(data);
      this.updateElementSetElement();
    },
    updateElementSetElement() {
      this.setElement(JSON.parse(JSON.stringify(this.dataset.subset)));
      this.refreshRealView();
    },
    onChangePosition(value) {
      this.appendPosition = value;
    },
    resultClick(r) {
      var beautify = ace.require("ace/ext/beautify");
      if (r.label == "HTML") {
        this.editorHTML.setValue(
          // this.process(
          this.getHTML(JSON.parse(JSON.stringify(this.dataset)), 0, "")
          // )
        );
        beautify.beautify(this.editorHTML.session);
      }
      if (r.label == "CSS") {
        let result = [];
        this.getCssList(
          JSON.parse(JSON.stringify(this.dataset)),
          "",
          0,
          result
        );
        let result2 = this.getCssTree(
          JSON.parse(JSON.stringify(this.dataset)),
          ""
        );
        this.editorCSS_LIST.setValue(result.join("\n"));
        this.editorCSS_TREE.setValue(result2);

        beautify.beautify(this.editorCSS_LIST.session);

        beautify.beautify(this.editorCSS_TREE.session);
        console.log("beautify", beautify);
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
    actionPreviewClick(dataset) {
      this.current_id = JSON.parse(JSON.stringify([dataset.id]));
      this.currentItemSubset = dataset.subset;
      this.currentItem = dataset;
      this.$refs.CssDec.setList(this.currentItem.options.attrs.style);
      this.$refs.HtmlDec.setList(this.currentItem);
    },
    getNode(dataset, id) {
      if (dataset.id == id) {
        return dataset;
      }
      let res = "";
      for (let index = 0; index < dataset.subset.length; index++) {
        const element = dataset.subset[index];
        if (typeof element == "object") {
          let findresult = id.find(subitem => {
            return subitem == element.id;
          });
          if (findresult) {
            res = element;
            break;
          } else {
            res = this.getNode(element, id);
            if (res != "") {
              break;
            }
          }
        }
      }
      return res;
    },
    //   遍历树结构，找到指定值
    getNodeById(dataset, id) {
      // let item = subset.filter(item => {
      //   let findresult = id.find(subitem => {
      //     return subitem == item.id;
      //   });
      //   return !!findresult;
      // });
      if (dataset.id == id) {
        return dataset;
      }
      // if (item.length > 0) {
      //   return item;
      // }
      else {
        let res = false;
        for (let index = 0; index < dataset.subset.length; index++) {
          const element = dataset.subset[index];
          if (typeof element == "object") {
            res = this.getNodeById(element, id);
            if (res) {
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
    getNodeParentById(sets, id) {
      for (let index = 0; index < sets.length; index++) {
        const element = sets[index];
        if (element.id == id) {
          return sets;
        } else {
          let res = this.getNodeParentById(element.subset, id);
          if (res) {
            return element;
            // return res;
          }
        }
      }
      return false;
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
    addElement(item) {
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
                class: {},
                style: [],
                property: []
              }
            },
            subset: []
          });
        });
      }
      if (this.appendPosition == "subChildInsert") {
        for (let index = 0; index < item.length; index++) {
          const element = item[index];
          addArray.forEach(() => {
            element.subset.push({
              tagName: this.tagName,
              id: uid2(10),
              options: {
                props: {},
                attrs: {
                  class: {},
                  style: [],
                  property: []
                }
              },
              subset: []
            });
          });
        }
      }
      if (this.appendPosition == "parentAppend") {
        // console.log(1);
        var node = this.getNodeParentById(
          this.dataset.subset,
          this.current_id[0]
        );
        let obj = JSON.parse(JSON.stringify(node));
        // node = [];
        let data = JSON.parse(
          JSON.stringify({
            tagName: this.tagName,
            id: uid2(10),
            options: {
              props: {},
              attrs: {
                class: {},
                style: [],
                property: []
              }
            },
            subset: obj
          })
        );
        node = data;
      }
      this.updateElementSetElement();
    }
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
      deep: true,
      immediate: true
    }
  },
  mounted() {
    var editorHTML = ace.edit("editorHTML");
    editorHTML.setTheme("ace/theme/twilight");
    editorHTML.session.setMode("ace/mode/html");
    // window.editorHTML = editorHTML;

    this.editorHTML = editorHTML;

    var editorCSS_LIST = ace.edit("editorCSS_LIST");
    editorCSS_LIST.setTheme("ace/theme/twilight");
    editorCSS_LIST.session.setMode("ace/mode/css");
    // window.editorCSS_LIST = editorCSS_LIST;
    this.editorCSS_LIST = editorCSS_LIST;

    var editorCSS_TREE = ace.edit("editorCSS_TREE");
    editorCSS_TREE.setTheme("ace/theme/twilight");
    editorCSS_TREE.session.setMode("ace/mode/less");
    // window.editorCSS_TREE = editorCSS_TREE;
    this.editorCSS_TREE = editorCSS_TREE;
  },
  created() {
    //   let body = document.getElementsByTagName('body')
    // this.dataset.subset[0].className = this.containerName;
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
    this.currentItemSubset = this.dataset.subset;
  }
};
</script>

<style>
.realviewIframe {
  width: 414px;
  height: 736px;
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
