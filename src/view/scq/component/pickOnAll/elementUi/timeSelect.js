export default {
  tagName: "el-time-select",
  desc: "el-time-select",
  props: [
    {
      name: "start",
      desc: "开始时间",
      type: "String",
      options: [],
      value: "09:00"
    },
    {
      name: "end",
      desc: "结束时间",
      type: "String",
      options: [],
      value: "18:00"
    },
    {
      name: "step",
      desc: "间隔时间",
      type: "String",
      options: [],
      value: "00:30"
    },
    {
      name: "minTime",
      desc: "最小时间，小于该时间的时间段将被禁用",
      type: "String",
      options: [],
      value: "00:00"
    },
    {
      name: "maxTime",
      desc: "最大时间，大于该时间的时间段将被禁用",
      type: "String",
      options: [],
      value: ""
    }
  ]
};
