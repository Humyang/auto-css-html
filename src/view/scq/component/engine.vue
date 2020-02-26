<script>
import classname from "classname";
function formatStyle(arr) {
  let res = "";
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    res += `${element.property}:${element.value};`;
  }
  // for (const key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     const element = obj[key];
  //     res += `${key}:${element};`;
  //   }
  // }
  return res;
}
function formatProperty(arr) {
  let obj = {};
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.property != "" && element.value != "") {
      obj[element.property] = element.value;
    }
  }
  console.log("formatProperty", obj);
  return obj;
}
function getSelectedStatus(dataset, currentSelect) {
  let result =
    currentSelect &&
    currentSelect.find(item => {
      return item == dataset.id;
    });

  return result != undefined ? true : false;

  // return currentSelect == dataset.id ? true : false;
}
export default {
  name: "engine",
  props: [
    "instanceType",
    "isHide",
    "dataset",
    "currentSelect",
    "current_length",
    "direction",
    "controlView"
  ],
  data() {
    return {
      clength: 1
    };
  },
  render: function(createElement) {
    if (this.instanceType == "preView") {
      return this.renderForPreView(createElement, this.dataset);
    }
    if (this.instanceType == "realView") {
      return this.renderForRealView(createElement, this.dataset);
    }
  },
  methods: {
    renderForRealView(createElement, dataset) {
      let sub = [];
      if (this.controlView) {
        for (let index = 0; index < dataset.subset.length; index++) {
          const element = dataset.subset[index];
          if (typeof element == "object") {
            sub.push(this.renderForRealView(createElement, element));
          } else {
            sub.push(element);
          }
        }
      }
      let eee = createElement(
        dataset.tagType,
        {
          props: dataset.props,
          attrs: {
            class: classname({
              [dataset.className]: true,
              [dataset.levelClassName]: true
            }),
            style: formatStyle(dataset.style),
            ...formatProperty(dataset.property)
          }
        },
        sub
      );
      return eee;
    },
    renderForPreView(createElement, dataset) {
      let sub = [];
      if (!this.isHide) {
        sub.push(
          createElement(
            "span",
            { attrs: { class: "status-bar" } },
            dataset.tagType
          )
        );
      }
      if (this.controlView) {
        for (let index = 0; index < dataset.subset.length; index++) {
          const element = dataset.subset[index];
          if (typeof element == "object") {
            sub.push(this.renderForPreView(createElement, element));
          } else {
            sub.push(element);
          }
        }
      }
      let eee = createElement(
        dataset.tagType || "div",
        {
          on: {
            click: event => {
              this.actionClick(dataset);
              event.stopPropagation();
            }
          },
          props: dataset.props,
          attrs: {
            class: classname({
              selected:
                getSelectedStatus(dataset, this.currentSelect) && !this.isHide,
              [dataset.className]: true,
              [dataset.levelClassName]: true,

              preview: true
            }),
            style: formatStyle(dataset.style),
            ...formatProperty(dataset.property)
          }
        },
        sub
      );
      return eee;
    },
    actionClick(dataset) {
      this.$emit("actionClick", dataset);
    }
  },
  computed: {
    onSelected() {
      let result = this.currentSelect.find(item => {
        return item == this.dataset.id;
      });
      return result != undefined ? true : false;
    }
  },
  updated: function() {
    //   计算当前自己元素数量
    // console.log(this.dataset.subset.length)
    this.clength = this.dataset.subset && this.dataset.subset.length;

    // console.log(this.current_length)
  }
};
</script>
<style >
span.status-bar {
  position: absolute;
  left: 0;
  top: 0;
  /* display: inherit; */
  border: 1px solid #1000ff;
  margin: 2px;
  padding: 2px;
}
/* 
.preview {
  position: relative;
}
.mobile {
  width: 414px;
  height: 736px;
  background: #fff;
  margin: 0 auto;
  border: 2px solid #000;
  border-style: dotted;
  box-sizing: content-box;
}
.pc {
  width: 800px;
  height: 400px;
  background: #fff;
  margin: 0 auto;
  border: 2px solid #000;
  border-style: dotted;
  box-sizing: content-box;
  box-sizing: content-box;
} */
</style>