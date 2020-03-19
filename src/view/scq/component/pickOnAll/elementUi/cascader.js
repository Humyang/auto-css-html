export default {
  tagName: "el-cascader",
  desc: "el-cascader",
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
    },
    {
      name: "size",
      desc: "尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "placeholder",
      desc: "输入框占位文本",
      type: "String",
      options: [],
      value: "请选择"
    },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "clearable",
      desc: "是否支持清空选项",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-all-levels",
      desc: "输入框中是否显示选中值的完整路径",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "collapse-tags",
      desc: "多选模式下是否折叠Tag",
      type: "Boolean",
      options: ["-"],
      value: "false"
    },
    {
      name: "separator",
      desc: "选项分隔符",
      type: "String",
      options: [],
      value: "斜杠' / '"
    },
    {
      name: "filterable",
      desc: "是否可搜索选项",
      type: "Boolean",
      options: [],
      value: ""
    },
    {
      name: "filter-method",
      desc:
        "自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中",
      type: "function(node, keyword)",
      options: ["-"],
      value: ""
    },
    {
      name: "debounce",
      desc: "搜索关键词输入的去抖延迟，毫秒",
      type: "Number",
      options: [],
      value: "300"
    },
    {
      name: "before-filter",
      desc:
        "筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选",
      type: "function(value)",
      options: [],
      value: ""
    },
    {
      name: "popper-class",
      desc: "自定义浮层类名",
      type: "String",
      options: [],
      value: ""
    }
  ]
};
