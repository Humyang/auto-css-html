export default {
  tagName: "el-color-picker",
  desc: "el-color-picker",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "size",
      desc: "尺寸",
      type: "String",
      options: [],
      value: "medium / small / mini"
    },
    {
      name: "show-alpha",
      desc: "是否支持透明度选择",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "color-format",
      desc: "写入 v-model 的颜色的格式",
      type: "String",
      options: ["hsl", "hsv", "hex", "rgb"],
      value: "hex（show-alpha 为 false）/ rgb（show-alpha 为 true）"
    },
    {
      name: "popper-class",
      desc: "ColorPicker 下拉框的类名",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "predefine",
      desc: "预定义颜色",
      type: "array",
      options: [],
      value: ""
    }
  ]
};
