export default {
  tagName: "el-input-number",
  desc: "el-input-number",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "Number",
      options: [],
      value: "0"
    },
    {
      name: "min",
      desc: "设置计数器允许的最小值",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "max",
      desc: "设置计数器允许的最大值",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "step",
      desc: "计数器步长",
      type: "Number",
      options: [],
      value: "1"
    },
    {
      name: "step-strictly",
      desc: "是否只能输入 step 的倍数",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "precision",
      desc: "数值精度",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "size",
      desc: "计数器尺寸",
      type: "String",
      options: ["large", "small"],
      value: ""
    },
    {
      name: "disabled",
      desc: "是否禁用计数器",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "controls",
      desc: "是否使用控制按钮",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "controls-position",
      desc: "控制按钮位置",
      type: "String",
      options: ["right"],
      value: ""
    },
    { name: "name", desc: "原生属性", type: "String", options: [], value: "" },
    {
      name: "label",
      desc: "输入框关联的label文字",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "placeholder",
      desc: "输入框默认 placeholder",
      type: "String",
      options: [],
      value: ""
    }
  ]
};
