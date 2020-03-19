export default {
  tagName: "el-date-picker",
  desc: "el-date-picker",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "date(DatePicker) / array(DateRangePicker)",
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
      options: ["large, small, mini"],
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
      desc: "范围选择时结束日期的占位内容",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "type",
      desc: "显示类型",
      type: "String",
      options: [
        "year",
        "month",
        "date",
        "dates",
        " week",
        "datetime",
        "datetimerange",
        " daterange",
        "monthrange"
      ],
      value: "date"
    },
    {
      name: "format",
      desc: "显示在输入框中的格式",
      type: "String",
      options: ["见日期格式"],
      value: "yyyy-MM-dd"
    },
    {
      name: "align",
      desc: "对齐方式",
      type: "String",
      options: ["left, center, right"],
      value: "left"
    },
    {
      name: "popper-class",
      desc: "DatePicker 下拉框的类名",
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
      options: [],
      value: "'-'"
    },
    {
      name: "default-value",
      desc: "可选，选择器打开时默认显示的时间",
      type: "Date",
      options: ["可被new Date()解析"],
      value: ""
    },
    {
      name: "default-time",
      desc: "范围选择时选中日期所使用的当日内具体时刻",
      type: "string[]",
      options: [
        "数组，长度为 2，每项值为字符串，形如12:00:00，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 00:00:00"
      ],
      value: ""
    },
    {
      name: "value-format",
      desc: "可选，绑定值的格式。不指定则绑定值为 Date 对象",
      type: "String",
      options: ["见日期格式"],
      value: ""
    },
    { name: "name", desc: "原生属性", type: "String", options: [], value: "" },
    {
      name: "unlink-panels",
      desc: "在范围选择器里取消两个日期面板之间的联动",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "prefix-icon",
      desc: "自定义头部图标的类名",
      type: "String",
      options: [],
      value: "el-icon-date"
    },
    {
      name: "clear-icon",
      desc: "自定义清空图标的类名",
      type: "String",
      options: [],
      value: "el-icon-circle-close"
    },
    {
      name: "validate-event",
      desc: "输入时是否触发表单的校验",
      type: "Boolean",
      options: ["-"],
      value: "true"
    }
  ]
};
