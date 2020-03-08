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
        for (
          let index = 0;
          index < (dataset.subset && dataset.subset.length);
          index++
        ) {
          const element = dataset.subset[index];
          if (typeof element == "object") {
            sub.push(this.renderForRealView(createElement, element));
          } else {
            sub.push(element);
          }
        }
      }
      let eee = createElement(
        dataset.tagName,
        {
          props: formatProperty(dataset.options.props),
          attrs: {
            class: classname(dataset.options.attrs.class),
            style: formatStyle(dataset.options.attrs.style),
            ...formatProperty(dataset.options.attrs.property)
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
            dataset.tagName
          )
        );
      }
      if (this.controlView) {
        for (
          let index = 0;
          index < (dataset.subset && dataset.subset.length);
          index++
        ) {
          const element = dataset.subset[index];
          if (typeof element == "object") {
            sub.push(this.renderForPreView(createElement, element));
          } else {
            sub.push(element);
          }
        }
      }
      let eee = createElement(
        dataset.tagName || "div",
        {
          on: {
            click: event => {
              this.actionClick(dataset);
              event.stopPropagation();
            }
          },
          props: formatProperty(dataset.options.props),
          attrs: {
            class: classname({
              selected:
                getSelectedStatus(dataset, this.currentSelect) && !this.isHide,
              preview: true,
              ...dataset.options.attrs.class
            }),
            style: formatStyle(dataset.options.attrs.style),
            ...formatProperty(dataset.options.attrs.property)
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
    this.clength = this.dataset.subset && this.dataset.subset.length;
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