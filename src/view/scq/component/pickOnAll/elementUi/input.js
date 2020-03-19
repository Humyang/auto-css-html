export default {
  tagName: "el-input",
  desc: "el-input",
  props: [
    {
      name: "type",
      desc: "类型",
      type: "String",
      options: ["text，textarea 和其他 原生 input 的 type 值"],
      value: "text"
    },
    {
      name: "value",
      desc: "绑定值",
      type: "string / number",
      options: [],
      value: ""
    },
    {
      name: "maxlength",
      desc: "原生属性，最大输入长度",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "minlength",
      desc: "原生属性，最小输入长度",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "show-word-limit",
      desc:
        '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "placeholder",
      desc: "输入框占位文本",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "clearable",
      desc: "是否可清空",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-password",
      desc: "是否显示切换密码图标",
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
      name: "size",
      desc: '输入框尺寸，只在 type!="textarea" 时有效',
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "prefix-icon",
      desc: "输入框头部图标",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "suffix-icon",
      desc: "输入框尾部图标",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "rows",
      desc: '输入框行数，只对 type="textarea" 有效',
      type: "Number",
      options: [],
      value: "2"
    },
    {
      name: "autosize",
      desc:
        '自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }',
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "autocomplete",
      desc: "原生属性，自动补全",
      type: "String",
      options: ["on", "off"],
      value: "off"
    },
    {
      name: "auto-complete",
      desc: "下个主版本弃用",
      type: "String",
      options: ["on", "off"],
      value: "off"
    },
    { name: "name", desc: "原生属性", type: "String", options: [], value: "" },
    {
      name: "readonly",
      desc: "原生属性，是否只读",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "max",
      desc: "原生属性，设置最大值",
      type: "—",
      options: [],
      value: ""
    },
    {
      name: "min",
      desc: "原生属性，设置最小值",
      type: "—",
      options: [],
      value: ""
    },
    {
      name: "step",
      desc: "原生属性，设置输入字段的合法数字间隔",
      type: "—",
      options: [],
      value: ""
    },
    {
      name: "resize",
      desc: "控制是否能被用户缩放",
      type: "String",
      options: ["none, both, horizontal, vertical"],
      value: ""
    },
    {
      name: "autofocus",
      desc: "原生属性，自动获取焦点",
      type: "Boolean",
      options: ["true, false"],
      value: "false"
    },
    { name: "form", desc: "原生属性", type: "String", options: [], value: "" },
    {
      name: "label",
      desc: "输入框关联的label文字",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "tabindex",
      desc: "输入框的tabindex",
      type: "String",
      options: ["-"],
      value: ""
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
