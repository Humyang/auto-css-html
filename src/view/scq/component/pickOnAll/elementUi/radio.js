export default {
  tagName: "el-radio",
  desc: "Radio 单选框",
  props: [
    { name: "value", desc: "绑定值", options: [], value: "" },
    { name: "label", desc: "Radio 的 value", options: [], value: "" },
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
      desc: "Radio 的尺寸，仅在 border 为真时有效",
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
    }
  ]
};
