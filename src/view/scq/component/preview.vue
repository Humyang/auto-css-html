<template>
    <div class="preview" >
        <preview v-if="dataset.subset" v-for="item,index in dataset.subset" :dataset="item" :key="index"></preview>
    </div>
</template>
<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "preview",
  props:['dataset'],
  data(){
      return {
          
      }
  }
};
</script>
