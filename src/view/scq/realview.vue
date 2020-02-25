<template>
  <div class="fix-full">
    <realView :dataset="dataset" :controlView="true"></realView>
  </div>
</template>

<script>
import realView from "./component/realView";

import { mapMutations, mapActions, mapState } from "vuex";
export default {
  components: { realView },

  data() {
    return {
      dataset: []
    };
  },
  mounted() {
    // console.log("mounted", parent);
    setInterval(() => {
      this.dataset = parent.INS.$store.state.dataset;
    }, 500);
  }
  //   watch: {
  //     $route(to, from) {
  //       // react to route changes...
  //       console.log("route change");
  //     }
  //   }
};
</script>

<style>
.fix-full {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>