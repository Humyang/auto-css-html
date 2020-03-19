export default {
  tagName: "el-transfer",
  desc: "el-transfer",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "array",
      options: [],
      value: ""
    },
    {
      name: "data",
      desc: "Transfer 的数据源",
      type: "array[{ key, label, disabled }]",
      options: [],
      value: "[ ]"
    },
    {
      name: "filterable",
      desc: "是否可搜索",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "filter-placeholder",
      desc: "搜索框占位符",
      type: "String",
      options: [],
      value: "请输入搜索内容"
    },
    {
      name: "filter-method",
      desc: "自定义搜索方法",
      type: "function",
      options: [],
      value: ""
    },
    {
      name: "target-order",
      desc:
        "右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前",
      type: "String",
      options: ["original", "push", "unshift"],
      value: "original"
    },
    {
      name: "titles",
      desc: "自定义列表标题",
      type: "array",
      options: [],
      value: "['列表 1', '列表 2']"
    },
    {
      name: "button-texts",
      desc: "自定义按钮文案",
      type: "array",
      options: [],
      value: "[ ]"
    },
    {
      name: "render-content",
      desc: "自定义数据项渲染函数",
      type: "function(h, option)",
      options: [],
      value: ""
    },
    {
      name: "format",
      desc: "列表顶部勾选状态文案",
      type: "object{noChecked, hasChecked}",
      options: [],
      value:
        "{ noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }"
    },
    {
      name: "props",
      desc: "数据源的字段别名",
      type: "object{key, label, disabled}",
      options: [],
      value: ""
    },
    {
      name: "left-default-checked",
      desc: "初始状态下左侧列表的已勾选项的 key 数组",
      type: "array",
      options: [],
      value: "[ ]"
    },
    {
      name: "right-default-checked",
      desc: "初始状态下右侧列表的已勾选项的 key 数组",
      type: "array",
      options: [],
      value: "[ ]"
    }
  ]
};
