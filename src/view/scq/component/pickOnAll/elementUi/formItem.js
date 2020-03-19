export default {
  tagName: "el-form-item",
  desc: "el-form-item",
  props: [
    {
      name: "prop",
      desc:
        "表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的",
      type: "String",
      options: ["传入 Form 组件的 model 中的字段"],
      value: ""
    },
    { name: "label", desc: "标签文本", type: "String", options: [], value: "" },
    {
      name: "label-width",
      desc: "表单域标签的的宽度，例如 '50px'。支持 auto。",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "required",
      desc: "是否必填，如不设置，则会根据校验规则自动生成",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "rules",
      desc: "表单验证规则",
      type: "object",
      options: [],
      value: ""
    },
    {
      name: "error",
      desc:
        "表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息",
      type: "String",
      options: [],
      value: ""
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
      desc: "以行内形式展示校验信息",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "size",
      desc: "用于控制该表单域下组件的尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    }
  ]
};
