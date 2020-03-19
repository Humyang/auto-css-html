export default {
  tagName: "el-select",
  desc: "el-select",
  props: [
    {
      name: "value",
      desc: "绑定值",
      type: "boolean / string / number",
      options: [],
      value: ""
    },
    {
      name: "multiple",
      desc: "是否多选",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "disabled",
      desc: "是否禁用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "value-key",
      desc: "作为 value 唯一标识的键名，绑定值为对象类型时必填",
      type: "String",
      options: [],
      value: "value"
    },
    {
      name: "size",
      desc: "输入框尺寸",
      type: "String",
      options: ["medium", "small", "mini"],
      value: ""
    },
    {
      name: "clearable",
      desc: "是否可以清空选项",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "collapse-tags",
      desc: "多选时是否将选中值按文字的形式展示",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "multiple-limit",
      desc: "多选时用户最多可以选择的项目数，为 0 则不限制",
      type: "Number",
      options: [],
      value: "0"
    },
    {
      name: "name",
      desc: "select input 的 name 属性",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "autocomplete",
      desc: "select input 的 autocomplete 属性",
      type: "String",
      options: [],
      value: "off"
    },
    {
      name: "auto-complete",
      desc: "下个主版本弃用",
      type: "String",
      options: [],
      value: "off"
    },
    {
      name: "placeholder",
      desc: "占位符",
      type: "String",
      options: [],
      value: "请选择"
    },
    {
      name: "filterable",
      desc: "是否可搜索",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "allow-create",
      desc: "是否允许用户创建新条目，需配合 filterable 使用",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "filter-method",
      desc: "自定义搜索方法",
      type: "function",
      options: [],
      value: ""
    },
    {
      name: "remote",
      desc: "是否为远程搜索",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "remote-method",
      desc: "远程搜索方法",
      type: "function",
      options: [],
      value: ""
    },
    {
      name: "loading",
      desc: "是否正在从远程获取数据",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "loading-text",
      desc: "远程加载时显示的文字",
      type: "String",
      options: [],
      value: "加载中"
    },
    {
      name: "no-match-text",
      desc: '搜索条件无匹配时显示的文字，也可以使用slot="empty"设置',
      type: "String",
      options: [],
      value: "无匹配数据"
    },
    {
      name: "no-data-text",
      desc: '选项为空时显示的文字，也可以使用slot="empty"设置',
      type: "String",
      options: [],
      value: "无数据"
    },
    {
      name: "popper-class",
      desc: "Select 下拉框的类名",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "reserve-keyword",
      desc: "多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "default-first-option",
      desc:
        "在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用",
      type: "Boolean",
      options: ["-"],
      value: "false"
    },
    {
      name: "popper-append-to-body",
      desc:
        "是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false",
      type: "Boolean",
      options: ["-"],
      value: "true"
    },
    {
      name: "automatic-dropdown",
      desc: "对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单",
      type: "Boolean",
      options: ["-"],
      value: "false"
    }
  ]
};
