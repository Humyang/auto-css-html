
<template>
  <div class="scq-view">
      <preview :dataset="dataset"></preview>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import preview from './component/preview'
export default {
  name: "index",
  data(){
      return {
          dataset:{
              value:"1",
              subset:[
                  {
                      value:"2.1"
                  },
                  {
                      value:"2.2"
                  }
              ]
          }
      }
  },
  components:{
      preview
  }
};
</script>

