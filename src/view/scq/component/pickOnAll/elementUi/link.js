export default {
  tagName: "el-link",
  desc: "Link 文字链接",
  props: [
    {
      name: "type",
      desc: "类型",
      type: "String",
      options: ["primary", "success", "warning", "danger", "info"],
      value: "default"
    },
    {
      name: "underline",
      desc: "是否下划线",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "disabled",
      desc: "是否禁用状态",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "href",
      desc: "原生 href 属性",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "icon",
      desc: "图标类名",
      type: "String",
      options: [],
      value: "",
      isIconNamePick: true
    }
  ]
};
