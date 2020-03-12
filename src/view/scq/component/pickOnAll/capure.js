function getObj(elementName) {
  let resArr = [];
  let arr = document.querySelectorAll("table tbody tr");
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let sa = element.querySelectorAll("td");
    let obj = {};
    obj["name"] = sa[0].innerText;
    obj["desc"] = sa[1].innerText;
    obj["type"] = sa[2].innerText;
    let options = sa[3].innerText;
    obj["options"] = options.split(" / ");
    obj["value"] = sa[4].innerText;
    resArr.push(obj);
  }

  return {
    tagName: elementName,
    desc: "NarBar导航栏",
    props: resArr
  };
}
let res = getObj("button");
console.log(res);
copy(res);
