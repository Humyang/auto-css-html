export default {
  tagName: "el-option",
  desc: "el-option",
  props: [
    {
      name: "value",
      desc: "选项的值",
      type: "string/number/object",
      options: [],
      value: ""
    },
    {
      name: "label",
      desc: "选项的标签，若不设置则默认与 value 相同",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "disabled",
      desc: "是否禁用该选项",
      type: "Boolean",
      options: [],
      value: "false"
    }
  ]
};
