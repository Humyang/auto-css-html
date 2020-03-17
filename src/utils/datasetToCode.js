import {
  getFormatedData,
  propertyToString,
  styleToString
} from "@/utils/formatMethods";

import classname from "classname";
function getCssTree(dataset, prefix) {
  if (!dataset.type) {
    let r = [];
    for (let index = 0; index < dataset.subset.length; index++) {
      let sub = "";
      const element = dataset.subset[index];
      let nodeFlagClass = "";
      if (prefix == "") {
        nodeFlagClass = ".node-" + index;
      } else {
        nodeFlagClass = prefix + "-" + index;
      }
      // element.options.attrs.class[nodeFlagClass] = true;
      sub = getCssTree(element, nodeFlagClass);
      let res = `${nodeFlagClass}{ ${sub} } `;
      r.push(res);
    }
    if (prefix == "") {
      let res = `.${dataset.id}{${r.join("")}}`;
      return res;
    } else {
      return r.join("");
    }
  } else {
    return "";
  }
  // return r.join("");
}
function getCssList(dataset, parentHeader, parentLevel, result) {
  if (!dataset.type) {
    for (let index = 0; index < dataset.subset.length; index++) {
      const element = dataset.subset[index];

      let nodeHeader = "";
      let sublevel = "";
      if (parentHeader == "") {
        nodeHeader = "." + dataset.id + " .node-" + index;
        sublevel = index;
      } else {
        nodeHeader = parentHeader + " " + ".node-" + parentLevel + "-" + index;
        sublevel = parentLevel + "-" + index;
      }
      result.push(nodeHeader + " {}");
      getCssList(element, nodeHeader, sublevel, result);
    }
  }
}
function getHTML(dataset, level, prefix) {
  let r = [];
  for (let index = 0; index < dataset.subset.length; index++) {
    let sub = "";
    const element = dataset.subset[index];
    let nodeFlagClass = "";
    if (prefix == "") {
      nodeFlagClass = "node-" + level;
    } else {
      nodeFlagClass = prefix + "-" + index;
    }
    if (!element.type) {
      element.options.attrs.class[nodeFlagClass] = true;
      sub = getHTML(element, level++, nodeFlagClass);
      r.push(sub);
    } else {
      r.push(element.value);
    }
  }
  let rootName = "";
  if (prefix == "") {
    rootName = dataset.id;
  }
  let res = `<${dataset.tagName} ${propertyToString(
    dataset.options.attrs.property
  )} ${propertyToString(dataset.options.props)} style="${styleToString(
    dataset.options.attrs.style
  )}" class="${classname(dataset.options.attrs.class, rootName)}">
      ${r.join("")}</${dataset.tagName}>`;

  return res;
}
export { getHTML, getCssList, getCssTree };
