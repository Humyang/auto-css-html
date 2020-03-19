export default {
  tagName: "el-time-picker",
  desc: "el-time-picker",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "date(TimePicker) / string(TimeSelect)",
      options: [],
      value: ""
    },
    {
      name: "readonly",
      desc: "完全只读",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "disabled",
      desc: "禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "editable",
      desc: "文本框可输入",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "clearable",
      desc: "是否显示清除按钮",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "size",
      desc: "输入框尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "placeholder",
      desc: "非范围选择时的占位内容",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "start-placeholder",
      desc: "范围选择时开始日期的占位内容",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "end-placeholder",
      desc: "范围选择时开始日期的占位内容",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "is-range",
      desc: "是否为时间范围选择，仅对<el-time-picker>有效",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "arrow-control",
      desc: "是否使用箭头进行时间选择，仅对<el-time-picker>有效",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "align",
      desc: "对齐方式",
      type: "String",
      options: ["left", "center", "right"],
      value: "left"
    },
    {
      name: "popper-class",
      desc: "TimePicker 下拉框的类名",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "picker-options",
      desc: "当前时间日期选择器特有的选项参考下表",
      type: "object",
      options: [],
      value: "{}"
    },
    {
      name: "range-separator",
      desc: "选择范围时的分隔符",
      type: "String",
      options: ["-"],
      value: "'-'"
    },
    {
      name: "value-format",
      desc:
        "可选，仅TimePicker时可用，绑定值的格式。不指定则绑定值为 Date 对象",
      type: "String",
      options: ["见日期格式"],
      value: ""
    },
    {
      name: "default-value",
      desc: "可选，选择器打开时默认显示的时间",
      type: "Date(TimePicker) / string(TimeSelect)",
      options: ["可被new Date()解析(TimePicker)", "可选值(TimeSelect)"],
      value: ""
    },
    { name: "name", desc: "原生属性", type: "String", options: [], value: "" },
    {
      name: "prefix-icon",
      desc: "自定义头部图标的类名",
      type: "String",
      options: [],
      value: "el-icon-time"
    },
    {
      name: "clear-icon",
      desc: "自定义清空图标的类名",
      type: "String",
      options: [],
      value: "el-icon-circle-close"
    }
  ]
};
