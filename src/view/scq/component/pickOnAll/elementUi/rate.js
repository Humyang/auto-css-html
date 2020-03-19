export default {
  tagName: "el-rate",
  desc: "el-rate",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "Number",
      options: [],
      value: "0"
    },
    { name: "max", desc: "最大分值", type: "Number", options: [], value: "5" },
    {
      name: "disabled",
      desc: "是否为只读",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "allow-half",
      desc: "是否允许半选",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "low-threshold",
      desc: "低分和中等分数的界限值，值本身被划分在低分中",
      type: "Number",
      options: [],
      value: "2"
    },
    {
      name: "high-threshold",
      desc: "高分和中等分数的界限值，值本身被划分在高分中",
      type: "Number",
      options: [],
      value: "4"
    },
    {
      name: "colors",
      desc:
        "icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色",
      type: "array/object",
      options: [],
      value: "['#F7BA2A', '#F7BA2A', '#F7BA2A']"
    },
    {
      name: "void-color",
      desc: "未选中 icon 的颜色",
      type: "String",
      options: [],
      value: "#C6D1DE"
    },
    {
      name: "disabled-void-color",
      desc: "只读时未选中 icon 的颜色",
      type: "String",
      options: [],
      value: "#EFF2F7"
    },
    {
      name: "icon-classes",
      desc:
        "icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名",
      type: "array/object",
      options: [],
      value: "['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']"
    },
    {
      name: "void-icon-class",
      desc: "未选中 icon 的类名",
      type: "String",
      options: [],
      value: "el-icon-star-off"
    },
    {
      name: "disabled-void-icon-class",
      desc: "只读时未选中 icon 的类名",
      type: "String",
      options: [],
      value: "el-icon-star-on"
    },
    {
      name: "show-text",
      desc:
        "是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-score",
      desc: "是否显示当前分数，show-score 和 show-text 不能同时为真",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "text-color",
      desc: "辅助文字的颜色",
      type: "String",
      options: [],
      value: "#1F2D3D"
    },
    {
      name: "texts",
      desc: "辅助文字数组",
      type: "array",
      options: [],
      value: "['极差', '失望', '一般', '满意', '惊喜']"
    },
    {
      name: "score-template",
      desc: "分数显示模板",
      type: "String",
      options: [],
      value: "{value}"
    }
  ]
};
