export default {
  tagName: "el-button",
  desc: "button",
  props: [
    {
      name: "size",
      desc: "尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "type",
      desc: "类型",
      type: "String",
      options: ["primary", "success", "warning", "danger", "info", "text"],
      value: ""
    },
    {
      name: "plain",
      desc: "是否朴素按钮",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "round",
      desc: "是否圆角按钮",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "circle",
      desc: "是否圆形按钮",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "loading",
      desc: "是否加载中状态",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "disabled",
      desc: "是否禁用状态",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "icon",
      desc: "图标类名",
      type: "String",
      options: [],
      isIconNamePick: true,
      value: ""
    },
    {
      name: "autofocus",
      desc: "是否默认聚焦",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "native-type",
      desc: "原生 type 属性",
      type: "String",
      options: ["button", "submit", "reset"],
      value: "button"
    }
  ]
};
