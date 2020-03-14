function getObj(elementName) {
  let resArr = [];
  let arr = document.querySelectorAll("table tbody tr");
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let sa = element.querySelectorAll("td");
    let obj = {};
    obj["name"] = sa[0].innerText;
    obj["desc"] = sa[1].innerText;
    let type = sa[2].innerText;
    switch (type) {
      case "string":
        obj["type"] = "String";
        break;
      case "boolean":
        obj["type"] = "Boolean";
        break;
    }
    let options = sa[3].innerText;
    if (options == "—") {
      obj["options"] = [];
    } else {
      obj["options"] = options.split(" / ");
    }
    let value = sa[4].innerText;
    if (value == "-") {
      obj["value"] = "";
    } else {
      obj["value"] = value;
    }
    resArr.push(obj);
  }

  return {
    tagName: elementName,
    desc: "NarBar导航栏",
    props: resArr
  };
}
let res = getObj("button");
res = `export default ${JSON.stringify(res)}`;
copy(res);

let icon = document.querySelectorAll(".icon-name");
let res = [];
for (let index = 0; index < icon.length; index++) {
  const element = icon[index];
  res.push(element.innerText);
}
