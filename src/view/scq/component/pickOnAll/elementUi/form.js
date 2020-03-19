export default {
  tagName: "el-form",
  desc: "el-form",
  props: [
    {
      name: "model",
      desc: "表单数据对象",
      type: "object",
      options: [],
      value: ""
    },
    {
      name: "rules",
      desc: "表单验证规则",
      type: "object",
      options: [],
      value: ""
    },
    {
      name: "inline",
      desc: "行内表单模式",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "label-position",
      desc:
        "表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width",
      type: "String",
      options: ["right", "left", "top"],
      value: "right"
    },
    {
      name: "label-width",
      desc:
        "表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "label-suffix",
      desc: "表单域标签的后缀",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "hide-required-asterisk",
      desc: "是否显示必填字段的标签旁边的红色星号",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-message",
      desc: "是否显示校验错误信息",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "inline-message",
      desc: "是否以行内形式展示校验信息",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "status-icon",
      desc: "是否在输入框中显示校验结果反馈图标",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "validate-on-rule-change",
      desc: "是否在 rules 属性改变后立即触发一次验证",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "size",
      desc: "用于控制该表单内组件的尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "disabled",
      desc:
        "是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效",
      type: "Boolean",
      options: [],
      value: "false"
    }
  ]
};
