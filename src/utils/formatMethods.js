import uid2 from "uid2";
function objToPropsArray(obj) {
  let props = [];
  obj.forEach(item => {
    let obj = {};
    obj.property = item.name;
    obj.value = item.value;
    props.push(obj);
  });
  return props;
}
function getFormatedData(data) {
  let props = objToPropsArray(data.props);
  // data.props.forEach(item => {
  //   let obj = {};
  //   obj.property = item.name;
  //   obj.value = item.value;
  //   props.push(obj);
  // });
  let obj = {
    tagName: data.tagName,
    id: uid2(10),
    options: {
      props: props,
      attrs: {
        class: {},
        style: [],
        property: []
      }
    },
    subset: []
  };
  let parent = {
    tagName: "div",
    isWrap: true,
    id: uid2(10),
    options: {
      props: [],
      attrs: {
        class: {},
        style: [],
        property: []
      }
    },
    subset: [obj]
  };
  return parent;
}
function propertyToString(obj) {
  let res = "";
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    res += `${element.property}="${element.value}" `;
  }
  return res;
}
function styleToString(obj) {
  let res = "";
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    res += `${element.property}:${element.value}; `;
  }
  return res;
}

export { objToPropsArray, getFormatedData, propertyToString, styleToString };
