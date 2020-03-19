export default {
  tagName: "el-checkbox-group",
  desc: "el-checkbox-group",
  props: [
    { name: "value", desc: "绑定值", options: [], value: "" },
    {
      name: "size",
      desc: "多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效",
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
      name: "min",
      desc: "可被勾选的 checkbox 的最小数量",
      options: [],
      type: "Number",
      value: ""
    },
    {
      name: "max",
      desc: "可被勾选的 checkbox 的最大数量",
      options: [],
      type: "Number",
      value: ""
    },
    {
      name: "text-color",
      desc: "按钮形式的 Checkbox 激活时的文本颜色",
      type: "String",
      options: [],
      value: "#ffffff"
    },
    {
      name: "fill",
      desc: "按钮形式的 Checkbox 激活时的填充色和边框色",
      type: "String",
      options: [],
      value: "#409EFF"
    }
  ]
};
