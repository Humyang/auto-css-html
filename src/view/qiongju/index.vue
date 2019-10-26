
<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      res: []
    };
  },
  methods: {
    render() {
      let types = ["固定", "占满"];
      let items = ["元素A", "元素B", "元素C"];
      let ggg = [];
      let ini = [];
      for (let A = 0; A < items.length; A++) {
        ini.push(0);
      }
      this.res = [];
      this.digui(items.length, types.length, [], 0);

      let render = [];
      for (let A = 0; A < this.res.length; A++) {
        const element = this.res[A];
        let row = [];
        for (let B = 0; B < element.length; B++) {
          row.push(items[B] + types[this.res[A][B]]);
        }

        render.push(row);
      }

      console.log("render", render);
    },
    digui(itemNumber, maxValue, parentIndexList, level) {
      if (level == itemNumber) {
        this.res.push(JSON.parse(JSON.stringify(parentIndexList)));
        return;
      }
      for (let A = 0; A < maxValue; A++) {
        // for (let B = 0; B < maxValue; B++) {
        parentIndexList[level] = A;
        if (level < itemNumber) {
          let c = level;
          this.digui(itemNumber, maxValue, parentIndexList, ++c);
        }
      }
    }
  },
  mounted() {
    this.render();
  }
};
</script>
