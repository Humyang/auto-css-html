import uid2 from "uid2";
export default function resetUid(data) {
  if (!data.type) {
    data.id = uid2(10);
    for (let index = 0; index < data.subset.length; index++) {
      const element = data.subset[index];
      resetUid(element);
    }
  }
  return data;
}
