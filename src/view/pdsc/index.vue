
<template>
  <div>
      <div><el-button @click="saveSni">片段保存本地</el-button>
      <el-button @click="loadSni">加载本地片段</el-button>
      <input v-model="sniname" type="text" placeholder="输入片段名称">
      </div>
      <div>
<el-button @click="addSni">添加片段</el-button>
    <el-button @click="generaInput">生成INPUT</el-button>
    <el-button @click="generaRes">生成结果</el-button>
      </div>

    
    <div v-for="item,index in rawList" class="flex row">
        <textarea v-model="item.value" name="" id="" cols="30" rows="10"></textarea>
        <div class="flex column">
            <span v-for="subItem in rawListInput[index]">
            <!-- <div v-for="input in subItem"> -->
                <a href="">{{subItem.name}}</a>
                <input type="text" v-model="subItem.value">
            <!-- </div> -->
        </span>
        </div>
        
    </div> 
    <div v-for="item in resArr">
        <textarea  name="" id="" cols="30" rows="10">{{item}}</textarea>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "index",
  data() {
    return {
        sniname:"",
        rawList:[{value:''}],
        rawListInput:[[
            {name:"[REPLACE_NAME]",value:"myName"}
            ]],
        resArr:[]
    };
  },
  methods:{
      addSni(){
          this.rawList.push({
              value:''
          })
      },
      generaInput(){
          this.rawListInput = []
          for(let i = 0;i<this.rawList.length;i++){
              let v = []
              let flag = this.rawList[i].value.match(/\[[A-Z]*\]/g)
              if(!flag){
                  flag = []
              }
              let removed = []
              let flagConver = flag.forEach((item)=>{
                  if(!removed.includes(item)){
                      removed.push(item)
                  }
              })
              for(let b=0;b<removed.length;b++){
                    v.push({name:removed[b],value:''})
              }
              
              this.rawListInput.push(v)
          }
      },
      generaRes(){
          this.resArr = []
          for(let i = 0;i<this.rawListInput.length;i++){
              let content = this.rawList[i].value
              for(let s=0;s<this.rawListInput[i].length;s++){
                  console.log(this.rawListInput[i][s].name)
                  let replace = this.rawListInput[i][s].name
                  replace = replace.replace('[','\\[')
                  replace = replace.replace(']','\\]')
                  content = content.replace(new RegExp(replace,'g'),this.rawListInput[i][s].value)
              }
              this.resArr.push(content)
          }
      },
      saveSni(){
          localStorage.setItem(this.sniname,JSON.stringify(this.rawList))

      },
      loadSni(){
          
          this.rawList = JSON.parse(localStorage.getItem(this.sniname))
      }
  }
};
</script>
<style>
textarea {
    width: 100%;
    font-size: 18px;
}
</style>


