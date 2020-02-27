import uid2 from "uid2";
function getFormatedData(data) {
  let props = {};
  data.props.forEach(item => {
    props[item.name] = item.value;
  });
  let obj = {
    tagName: data.tagName,
    id: uid2(10),
    options: {
      props: props,
      attrs: {
        class: [],
        style: [],
        property: []
      }
    },
    subset: []
  };
  let parent = {
    tagName: "div",
    id: uid2(10),
    options: {
      props: props,
      attrs: {
        class: [],
        style: [],
        property: []
      }
    },
    subset: [obj]
  };
  return parent;
}
export { getFormatedData };
