export default {
  tagName: "el-checkbox-button",
  desc: "el-checkbox-button",
  props: [
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
    }
  ]
};
