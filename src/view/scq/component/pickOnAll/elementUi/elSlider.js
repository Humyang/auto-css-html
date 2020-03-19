export default {
  tagName: "el-slider",
  desc: "el-slider",
  props: [
    {
      name: "value / v-model",
      desc: "绑定值",
      type: "Number",
      options: [],
      value: "0"
    },
    { name: "min", desc: "最小值", type: "Number", options: [], value: "0" },
    { name: "max", desc: "最大值", type: "Number", options: [], value: "100" },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    { name: "step", desc: "步长", type: "Number", options: [], value: "1" },
    {
      name: "show-input",
      desc: "是否显示输入框，仅在非范围选择时有效",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-input-controls",
      desc: "在显示输入框的情况下，是否显示输入框的控制按钮",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "input-size",
      desc: "输入框的尺寸",
      type: "String",
      options: ["large", "medium", "small", "mini"],
      value: "small"
    },
    {
      name: "show-stops",
      desc: "是否显示间断点",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-tooltip",
      desc: "是否显示 tooltip",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "format-tooltip",
      desc: "格式化 tooltip message",
      type: "function(value)",
      options: [],
      value: ""
    },
    {
      name: "range",
      desc: "是否为范围选择",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "vertical",
      desc: "是否竖向模式",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "height",
      desc: "Slider 高度，竖向模式时必填",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "label",
      desc: "屏幕阅读器标签",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "debounce",
      desc: "输入时的去抖延迟，毫秒，仅在show-input等于true时有效",
      type: "Number",
      options: [],
      value: "300"
    },
    {
      name: "tooltip-class",
      desc: "tooltip 的自定义类名",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "marks",
      desc:
        "标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式",
      type: "object",
      options: [],
      value: ""
    }
  ]
};
