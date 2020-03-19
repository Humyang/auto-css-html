export default {
  tagName: "el-switch",
  desc: "el-switch",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "boolean / string / number",
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
      name: "width",
      desc: "switch 的宽度（像素）",
      type: "Number",
      options: [],
      value: "40"
    },
    {
      name: "active-icon-class",
      desc: "switch 打开时所显示图标的类名，设置此项会忽略 active-text",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "inactive-icon-class",
      desc: "switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "active-text",
      desc: "switch 打开时的文字描述",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "inactive-text",
      desc: "switch 关闭时的文字描述",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "active-value",
      desc: "switch 打开时的值",
      type: "boolean / string / number",
      options: [],
      value: "true"
    },
    {
      name: "inactive-value",
      desc: "switch 关闭时的值",
      type: "boolean / string / number",
      options: [],
      value: "false"
    },
    {
      name: "active-color",
      desc: "switch 打开时的背景色",
      type: "String",
      options: [],
      value: "#409EFF"
    },
    {
      name: "inactive-color",
      desc: "switch 关闭时的背景色",
      type: "String",
      options: [],
      value: "#C0CCDA"
    },
    {
      name: "name",
      desc: "switch 对应的 name 属性",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "validate-event",
      desc: "改变 switch 状态时是否触发表单的校验",
      type: "Boolean",
      options: ["-"],
      value: "true"
    }
  ]
};
