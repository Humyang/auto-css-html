export default {
  tagName: "el-upload",
  desc: "el-upload",
  props: [
    {
      name: "action",
      desc: "必选参数，上传的地址",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "headers",
      desc: "设置上传的请求头部",
      type: "object",
      options: [],
      value: ""
    },
    {
      name: "multiple",
      desc: "是否支持多选文件",
      type: "Boolean",
      options: [],
      value: ""
    },
    {
      name: "data",
      desc: "上传时附带的额外参数",
      type: "object",
      options: [],
      value: ""
    },
    {
      name: "name",
      desc: "上传的文件字段名",
      type: "String",
      options: [],
      value: "file"
    },
    {
      name: "with-credentials",
      desc: "支持发送 cookie 凭证信息",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "show-file-list",
      desc: "是否显示已上传文件列表",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "drag",
      desc: "是否启用拖拽上传",
      type: "Boolean",
      options: [],
      value: "false"
    },
    {
      name: "accept",
      desc: "接受上传的文件类型（thumbnail-mode 模式下此参数无效）",
      type: "String",
      options: [],
      value: ""
    },
    {
      name: "on-preview",
      desc: "点击文件列表中已上传的文件时的钩子",
      type: "function(file)",
      options: [],
      value: ""
    },
    {
      name: "on-remove",
      desc: "文件列表移除文件时的钩子",
      type: "function(file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "on-success",
      desc: "文件上传成功时的钩子",
      type: "function(response, file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "on-error",
      desc: "文件上传失败时的钩子",
      type: "function(err, file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "on-progress",
      desc: "文件上传时的钩子",
      type: "function(event, file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "on-change",
      desc: "文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用",
      type: "function(file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "before-upload",
      desc:
        "上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。",
      type: "function(file)",
      options: [],
      value: ""
    },
    {
      name: "before-remove",
      desc:
        "删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。",
      type: "function(file, fileList)",
      options: [],
      value: ""
    },
    {
      name: "list-type",
      desc: "文件列表的类型",
      type: "String",
      options: ["text/picture/picture-card"],
      value: "text"
    },
    {
      name: "auto-upload",
      desc: "是否在选取文件后立即进行上传",
      type: "Boolean",
      options: [],
      value: "true"
    },
    {
      name: "file-list",
      desc:
        "上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]",
      type: "array",
      options: [],
      value: "[]"
    },
    {
      name: "http-request",
      desc: "覆盖默认的上传行为，可以自定义上传的实现",
      type: "function",
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
      name: "limit",
      desc: "最大允许上传个数",
      type: "Number",
      options: [],
      value: ""
    },
    {
      name: "on-exceed",
      desc: "文件超出个数限制时的钩子",
      type: "function(files, fileList)",
      options: [],
      value: ""
    }
  ]
};
