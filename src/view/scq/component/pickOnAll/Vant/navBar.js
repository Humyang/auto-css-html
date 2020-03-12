export default {
  tagName: "van-nav-bar",
  desc: "NarBar导航栏",
  props: [
    {
      name: "title",
      desc: "标题",
      type: String,
      value: "",
      default: ""
    },
    {
      name: "left-text",
      desc: "左侧文案",
      type: String,
      value: "",
      default: ""
    },
    {
      name: "right-text",
      desc: "右侧文案",
      type: String,
      value: "",
      default: ""
    },
    {
      name: "left-arrow",
      desc: "是否显示左侧箭头",
      value: false,
      type: Boolean,
      default: false
    },
    {
      name: "fixed",
      desc: "是否固定在顶部",
      value: false,
      type: Boolean,
      default: false
    },
    {
      name: "border",
      desc: "是否显示下边框",
      value: true,
      type: Boolean,
      default: true
    }
  ]
};
// export default obj;
