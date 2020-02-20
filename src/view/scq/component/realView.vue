<script>
import classname from "classname";
function formatStyle(obj) {
  let res = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      res += `${key}:${element};`;
    }
  }
}
function getSelectedStatus(dataset, currentSelect) {
  let result = currentSelect.find(item => {
    return item == dataset.id;
  });
  // console.log('getSelectedStatus', result)
  return result != undefined ? true : false;
}
export default {
  name: "realView",
  props: [
    "isHide",
    "dataset",
    "current_length",
    "direction",
    "currentSelect",
    "tagType",
    "deviceType",
    "controlRealView"
  ],
  data() {
    return {
      clength: 1
    };
  },
  render: function(createElement) {
    let r = this.getElement(createElement, this.dataset);

    return r;
  },
  methods: {
    getElement(createElement, dataset) {
      console.log("getElement realView 111");
      let sub = [];
      // if (!this.isHide) {
      //   sub.push(
      //     createElement(
      //       'span',
      //       { attrs: { class: 'status-bar' } },
      //       dataset.direction
      //     )
      //   )
      // }
      if (this.controlRealView) {
        for (let index = 0; index < dataset.subset.length; index++) {
          const element = dataset.subset[index];
          sub.push(this.getElement(createElement, element));
        }
      }
      let eee = createElement(
        dataset.tagType,
        {
          // on: {
          //   click: event => {
          //     this.actionClick(dataset)
          //     event.stopPropagation()
          //   }
          // },
          props: dataset.props,
          attrs: {
            class: classname({
              // row: dataset.direction == 'row',
              // column: dataset.direction == 'column',
              // selected:
              //   getSelectedStatus(dataset, this.currentSelect) && !this.isHide,
              [dataset.className]: true,
              [dataset.levelClassName]: true,
              realView: dataset.id == "1"
              // preview: true,
              // flex: true,
              // [this.deviceType]: dataset.id == '1'
            }),
            style: formatStyle(dataset.style),
            ...dataset.raw
          }
        },
        sub
      );
      if (eee.data && eee.data.class) {
        // eee.data.class.push({'grow':true})
        eee.data.class.push(dataset.classObj);
      }
      // console.log('getElement', eee)
      return eee;
    },
    actionClick(dataset) {
      // console.log(this.dataset.id)
      this.$emit("current", { id: dataset.id, tagType: dataset.tagType });
    },
    getCurrent(event) {
      this.$emit("current", event);
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
.realView {
  width: 414px;
  height: 736px;
  border: 1px solid #ddd;
}

/* .mobile {
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