function getNode(dataset, id) {
  if (dataset.id == id) {
    return dataset;
  }
  let res = "";
  for (let index = 0; index < dataset.subset.length; index++) {
    const element = dataset.subset[index];
    if (!element.type) {
      let findresult = id.find(subitem => {
        return subitem == element.id;
      });
      if (findresult) {
        res = element;
        break;
      } else {
        res = getNode(element, id);
        if (res != "") {
          break;
        }
      }
    }
  }
  return res;
}
//   遍历树结构，找到指定值
function getNodeById(dataset, id) {
  if (dataset.id == id) {
    return dataset;
  } else {
    let res = false;
    for (let index = 0; index < dataset.subset.length; index++) {
      const element = dataset.subset[index];
      if (!element.type) {
        res = getNodeById(element, id);
        if (res) {
          break;
        }
      }
    }
    if (res) {
      return res;
    } else {
      return false;
    }
  }
}
function getNodeParentById(sets, id) {
  for (let index = 0; index < sets.length; index++) {
    const element = sets[index];
    if (element.id == id) {
      return sets;
    } else {
      let res = this.getNodeParentById(element.subset, id);
      if (res) {
        return element;
      }
    }
  }
  return false;
}
export { getNode, getNodeById, getNodeParentById };
