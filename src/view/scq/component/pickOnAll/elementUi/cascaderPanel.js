export default {
  tagName: "el-cascader-panel",
  desc: "el-cascader-panel",
  props: [
    {
      name: "value",
      desc: "选中项绑定值",
      type: "-",
      options: [],
      value: ""
    },
    {
      name: "options",
      desc: "可选项数据源，键名可通过 Props 属性配置",
      type: "array",
      options: [],
      value: ""
    },
    {
      name: "props",
      desc: "配置选项，具体见下表",
      type: "object",
      options: [],
      value: ""
    }
  ]
};
