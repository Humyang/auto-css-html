<template>
	<div id="login">
	    <p>登陆中</p>
	</div>
</template>

<script>

import url from 'url'
import {
  IP,
  StaticPort as PORT
} from '@/api/env.js' 
export default {
  mounted:function(){
      let uUrl = url.parse(location.href,true)
      if(uUrl.query.t){
        //   alert('有token')
          this.$store
          this.$store.commit('updateToken', uUrl.query.t)
          location.href="/"
      }else{
          location.href = IP +":8000"+ "/oauth_login?r=" + IP+":" + PORT +"/login"
      }
  }
}
</script>
<style scoped>

	
#login {
    background-color: #36474f;
    height: 100%;
    color: #fff;
    font-size: 28px;
    padding-top: 70px;
    text-align: center
}

#login input {
    font-size: 28px;
    padding: 10px;
    border-radius: 10px;
    border: 0;
    margin-bottom: 10px;
    width: 80%
}

#login a {
    color: #fff
}

a.btn_ {
    display: block;
    margin-bottom: 20px;
    margin-top: 10px
}
</style>

