export default {
  tagName: "el-radio-group",
  desc: "el-radio-group",
  props: [
    { name: "value", desc: "绑定值", options: [], value: "" },
    {
      name: "size",
      desc: "单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "text-color",
      desc: "按钮形式的 Radio 激活时的文本颜色",
      type: "String",
      options: [],
      value: "#ffffff"
    },
    {
      name: "fill",
      desc: "按钮形式的 Radio 激活时的填充色和边框色",
      type: "String",
      options: [],
      value: "#409EFF"
    }
  ]
};
