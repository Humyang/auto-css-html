<template>
  <el-tree
    ref="elTree"
    :data="dataset"
    node-key="id"
    default-expand-all
    :props="defaultProps"
    :highlight-current="true"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    draggable
    @node-click="nodeClick"
  ></el-tree>
  <!-- :allow-drop="allowDrop"
  :allow-drag="allowDrag"-->
</template>

<script>
import uid2 from "uid2";
export default {
  name: "tree",
  // props: ["dataset"],
  data() {
    return {
      dataset: [],
      // cnk: "",
      defaultProps: {
        children: "subset",
        label: "tagName"
      }
    };
  },
  methods: {
    reFormat(data) {
      if (data.type == "innerText") {
        data.tagName = "";
      }
      for (let index = 0; index < data.subset.length; index++) {
        const element = data.subset[index];
        this.reFormat(element);
      }
    },
    format(data) {
      if (data.type == "innerText") {
        data.tagName = data.value;
      }
      for (let index = 0; index < data.subset.length; index++) {
        const element = data.subset[index];
        this.format(element);
      }
    },
    nodeClick(node) {
      console.log(node);
      parentDataset.dataset.update("1", {
        currentSelect: [node.id],
        modifyFlag: uid2(20)
      });
    },
    setChecked(id) {
      // this.defaultChecke = id[0];
      // console.log(id, "id");
      this.$nextTick(() => {
        this.$refs.elTree.setCurrentKey(id[0]);
      });
      // this.cnk = id[0];
    },
    setList(dataset) {
      let obj = JSON.parse(JSON.stringify(dataset));
      this.format(obj);
      this.dataset = [obj];
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      let obj = JSON.parse(JSON.stringify(this.dataset[0]));
      this.reFormat(obj);

      // console.log("tree drag end: ", dropNode && dropNode.label, dropType);
      // console.log(draggingNode, dropNode);
      parentDataset.dataset.update("1", {
        dataset: obj,
        modifyFlag: uid2(20)
      });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    }
    // allowDrop(draggingNode, dropNode, type) {
    //   if (dropNode.data.label === "二级 3-1") {
    //     return type !== "inner";
    //   } else {
    //     return true;
    //   }
    // },
    // allowDrag(draggingNode) {
    //   return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    // }
  }
};
</script>