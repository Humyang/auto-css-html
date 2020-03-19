export default {
  tagName: "el-option-group",
  desc: "el-option-group",
  props: [
    {
      name: "label",
      desc: "分组的组名",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "disabled",
      desc: "是否将该分组下所有选项置为禁用",
      type: "Boolean",
      options: [],
      value: "false"
    }
  ]
};
