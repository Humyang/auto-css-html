export default {
  tagName: "el-checkbox",
  desc: "el-checkbox",
  props: [
    { name: "value", desc: "绑定值", options: [], value: "" },
    {
      name: "label",
      desc: "选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）",
      options: [],
      value: ""
    },
    { name: "true-label", desc: "选中时的值", options: [], value: "" },
    { name: "false-label", desc: "没有选中时的值", options: [], value: "" },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "border",
      desc: "是否显示边框",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "size",
      desc: "Checkbox 的尺寸，仅在 border 为真时有效",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "name",
      desc: "原生 name 属性",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "checked",
      desc: "当前是否勾选",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "indeterminate",
      desc: "设置 indeterminate 状态，只负责样式控制",
      type: "Boolean",
      options: [],
      value: "false"
    }
  ]
};
