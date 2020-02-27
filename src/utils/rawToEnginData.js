import uid2 from "uid2";
function rawToEnginData(data) {
  // tagType
  // props
  // attrs
  //      class
  //      style
  //      property
  // subset
  let props = {};
  data.props.forEach(item => {
    props[item.name] = item.value;
  });
  let obj = {
    tagType: data.tagName,
    direction: this.addDirection,
    id: uid2(10),
    props: props,
    levelClassName: "",
    classObj: { grow: true },
    subset: [],
    style: [],
    property: []
  };
  let parent = {
    tagType: "div",
    id: uid2(10),
    className: "",
    subset: [obj],
    style: [],
    property: []
  };
}
// {
//     tagType: this.tagType,
//     direction: this.addDirection,
//     id: uid2(10),
//     className: "",
//     levelClassName: "",
//     classObj: { grow: true },
//     subset: nSubset,
//     style: [],
//     property: [],
//     props: []
// }
