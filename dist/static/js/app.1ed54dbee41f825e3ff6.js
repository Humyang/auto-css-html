webpackJsonp([7],{NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={};e.d(o,"plan",function(){return g});var a=e("/5sW"),i={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var r=e("VU/8")({name:"App",components:{}},i,!1,function(t){e("NNOZ")},null,null).exports,u=e("/ocq");a.default.use(u.a);var c=new u.a({mode:"history",routes:[{path:"/login",name:"login",meta:{title:"登陆"},component:function(t){return e.e(1).then(function(){var n=[e("q8bm")];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/",component:function(t){return e.e(2).then(function(){var n=[e("eX+t")];t.apply(null,n)}.bind(this)).catch(e.oe)},children:[{path:"/index",name:"index",meta:{title:"首页"},component:function(t){return e.e(4).then(function(){var n=[e("YPWR")];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/plan",name:"plan",meta:{title:"计划"},component:function(t){return e.e(3).then(function(){var n=[e("R4qy")];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/scq",name:"scq",meta:{title:"生成器"},component:function(t){return e.e(0).then(function(){var n=[e("09yR")];t.apply(null,n)}.bind(this)).catch(e.oe)}}]},{path:"*",meta:{title:"404"},component:function(t){return e.e(5).then(function(){var n=[e("Cy/J")];t.apply(null,n)}.bind(this)).catch(e.oe)}}]}),s=e("NYxO");a.default.use(s.a);var d=new s.a.Store({state:{token:""},mutations:{updateToken:function(t,n){localStorage.token=n,t.token=n}},getters:{getPermissionByCode:function(t){return function(t){}}}});localStorage.token&&d.commit("updateToken",localStorage.token);var l=d,p=e("zL8q"),f=e.n(p),m=e("//Fk"),h=e.n(m),v=e("mtWM"),k=e.n(v),T=e("mjRP");function y(t,n,e){return new h.a(function(o,a){k()({method:t,url:T.a+":"+T.b+n,data:e,headers:{"Content-Type":"application/json"}}).then(function(t){o(t)}).catch(function(t,n){a(t)})})}k.a.interceptors.request.use(function(t){return l.state.token&&(t.noToken||(t.headers._token=l.state.token)),t});var g={getPlanList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.date_start,e=void 0===n?123:n,o=t.date_end,a=void 0===o?123:o,i=t.query_options;return y("post","/plan_list",{date_start:e,date_end:a,query_options:void 0===i?0:i})},addPlanList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.time,e=void 0===n?"":n,o=t.task;return y("post","/add_plan",{time:e,task:void 0===o?"":o})},startTask:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return y("post","/startTask",{id:t.id,remainTime:t.remainTime})},stopTask:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return y("post","/stopTask",{id:t.id,remainTime:t.remainTime})},resumeTask:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return y("post","/resumeTask",{id:t.id,remainTime:t.remainTime})},delTask:function(){return y("post","/delTask",{id:(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).id})}};e("tvR6");a.default.config.productionTip=!1,a.default.use(f.a),a.default.prototype.api=o,new a.default({router:c,store:l,render:function(t){return t(r)},el:"#app"})},NNOZ:function(t,n){},mjRP:function(t,n,e){"use strict";e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a}),e.d(n,"c",function(){return i});var o="http://118.89.19.201",a=8602,i=8600},tvR6:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.1ed54dbee41f825e3ff6.js.map