// function a(el) {
function getObj(elementName, el) {
  let resArr = [];
  let arr = el.querySelectorAll("tbody tr");
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
      case "number":
        obj["type"] = "Number";
        break;
      default:
        obj["type"] = type;
        break;
    }
    let options = sa[3].innerText;
    if (options == "—") {
      obj["options"] = [];
    } else {
      obj["options"] = options.split(" / ");
    }
    let value = sa[4].innerText;
    if (value == "-" || value == "—") {
      obj["value"] = "";
    } else {
      obj["value"] = value;
    }
    resArr.push(obj);
  }

  let res = {
    tagName: elementName,
    desc: elementName,
    props: resArr
  };
  res = `export default ${JSON.stringify(res)}`;
  copy(res);
}
//   }
//   let res = getObj("button", el);
//   res = `export default ${JSON.stringify(res)}`;
//   copy(res);
// }
// a();

let icon = document.querySelectorAll(".icon-name");
let res = [];
for (let index = 0; index < icon.length; index++) {
  const element = icon[index];
  res.push(element.innerText);
}
