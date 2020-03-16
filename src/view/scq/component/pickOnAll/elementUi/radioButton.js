export default {
  tagName: "el-radio-button",
  desc: "radio-button",
  props: [
    { name: "label", desc: "Radio 的 value", options: [], value: "" },
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
    }
  ]
};
