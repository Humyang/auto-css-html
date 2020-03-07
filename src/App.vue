<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {
    // HelloWorld
  },
  methods: {
    ...mapMutations(["SET_LOAD_PRESET", "SET_LOAD_PREVIEW"])
  },
  mounted() {
    // this.$store

    this.SET_LOAD_PRESET(localStorage.getItem("SINGLE"));

    this.SET_LOAD_PREVIEW(localStorage.getItem("COMPOSE"));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
