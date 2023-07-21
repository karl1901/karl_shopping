import{r as e,E as t}from"./index-fa007f95.js";import{E as l}from"./index-f90f2b69.js";import{reactive as a,ref as r,computed as o}from"vue";import{a as u,b as n}from"./user-0d1ee578.js";import{E as i}from"./el-overlay-9d820482.js";import"./typescript-5028724d.js";function d(t){return e({url:"UserAdminister/BannedUser",method:"post",data:t})}const p={class:"app-container"},s={class:"flex-end"},c=Vue.defineComponent({name:"UserList"}),V=Vue.defineComponent({...c,setup(c){const V=a({queryStr:""}),m=r(),h=[{label:"昵称",prop:"nickname",width:200},{label:"用户名",prop:"uname",width:200},{label:"性别",prop:"sex",type:"tag"},{label:"邮箱",prop:"mail",width:200},{label:"微信",prop:"wx",width:200},{label:"QQ",prop:"qq",width:200},{label:"个性签名",prop:"signature",width:300},{label:"角色",prop:"role",type:"tag"},{label:"是否启用",prop:"enable",type:"bool"},{label:"启用/禁用原因",prop:"cause",width:300,type:"text"},{label:"密码",prop:"pwd",width:300},{label:"密码盐",prop:"salt"},{label:"注册时间",prop:"reg_time",type:"date",width:200},{label:"最后登录时间",prop:"lastdoing_time",type:"date",width:200}],f=()=>{var e;null==(e=m.value)||e.handleSearch()},y=o((()=>({queryStr:V.queryStr}))),b=({list:e})=>{e.forEach((e=>{var t;e.sex=u[null==(t=e.sex)?void 0:t.toUpperCase()]||"暂无性别",e.role=n[e.role.toUpperCase()]}))},v=e=>{i.prompt("请输入禁用原因","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^.{1,100}$/,inputErrorMessage:"禁用原因长度不能超过100个字符"}).then((({value:l})=>{d({user:{uid:e.uid,cause:l,enable:"n"}}).then((()=>{var e;t.closeAll(),t({title:"提示",message:"禁用成功",type:"success"}),null==(e=m.value)||e.handleSearch()})).catch((()=>{t.closeAll(),t({title:"提示",message:"禁用失败",type:"error"})}))})).catch((()=>{t.closeAll(),t({title:"提示",message:"取消禁用",type:"error"})}))},x=e=>{i.prompt("请输入启用原因","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^.{1,100}$/,inputErrorMessage:"启用原因长度不能超过100个字符"}).then((({value:l})=>{d({user:{uid:e.uid,cause:l,enable:"y"}}).then((()=>{var e;t({title:"提示",message:"启用成功",type:"success"}),null==(e=m.value)||e.handleSearch()})).catch((e=>{}))})).catch((()=>{t({title:"提示",message:"启用禁用",type:"error"})}))},C=e=>{g.value=!0,_.acceptid=e.uid},g=r(!1),w=r(),N=r(!1),_=a({acceptid:-1,info:"",title:""}),E=()=>{var e;g.value=!1,_.acceptid=-999,_.info="",_.title="",null==(e=w.value)||e.clearEditor()},U=()=>{var l;-999!==_.acceptid?""!==_.title?"<p><br></p>"!==_.info?(N.value=!0,(l={userMessage:{..._}},e({url:"UserAdminister/SendMessage",method:"post",data:l})).then((()=>{t({title:"提示",message:"发送成功",type:"success"}),E()})).catch((e=>{})).finally((()=>{N.value=!1}))):t({title:"提示",message:"请输入内容",type:"error"}):t({title:"提示",message:"请输入标题",type:"error"}):t({title:"提示",message:"你给谁发呢？小老弟",type:"error"})};return(e,t)=>{const a=Vue.resolveComponent("el-input"),r=Vue.resolveComponent("el-form-item"),o=Vue.resolveComponent("el-button"),u=Vue.resolveComponent("el-form"),n=Vue.resolveComponent("Table"),i=Vue.resolveComponent("el-dialog"),d=Vue.resolveDirective("loading");return Vue.openBlock(),Vue.createElementBlock("div",p,[Vue.createVNode(u,{ref:"form",inline:""},{default:Vue.withCtx((()=>[Vue.createVNode(r,null,{default:Vue.withCtx((()=>[Vue.createVNode(a,{modelValue:Vue.unref(V).queryStr,"onUpdate:modelValue":t[0]||(t[0]=e=>Vue.unref(V).queryStr=e),modelModifiers:{trim:!0},clearable:"",placeholder:"用户名/昵称/邮箱/qq/微信"},null,8,["modelValue"])])),_:1}),Vue.createVNode(r,null,{default:Vue.withCtx((()=>[Vue.createVNode(o,{type:"primary",onClick:f,plain:""},{default:Vue.withCtx((()=>[Vue.createTextVNode("搜索")])),_:1})])),_:1})])),_:1},512),Vue.createVNode(n,{ref_key:"table",ref:m,tableColumnList:h,dataModel:"UserAdminister",dataModelType:"User",queryWapper:Vue.unref(y),hasEdit:!1,hasDelete:!1,onGetData:b,hasEnableDisable:"",onHandleDisable:v,buttonList:[{label:"发送消息",type:"primary",click:C}],onHandleEnable:x,operateWidth:200},null,8,["queryWapper","buttonList"]),Vue.createVNode(i,{style:{height:"100%"},onClosed:E,title:"发送消息",modelValue:Vue.unref(g),"onUpdate:modelValue":t[3]||(t[3]=e=>Vue.isRef(g)?g.value=e:null),"append-to-body":"",top:"8vh"},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createVNode(u,{model:Vue.unref(_)},{default:Vue.withCtx((()=>[Vue.createVNode(r,null,{default:Vue.withCtx((()=>[Vue.createVNode(a,{modelValue:Vue.unref(_).title,"onUpdate:modelValue":t[1]||(t[1]=e=>Vue.unref(_).title=e),placeholder:"消息标题"},null,8,["modelValue"])])),_:1}),Vue.createVNode(r,null,{default:Vue.withCtx((()=>[Vue.createVNode(l,{ref_key:"editor",ref:w,config:{height:200},modelValue:Vue.unref(_).info,"onUpdate:modelValue":t[2]||(t[2]=e=>Vue.unref(_).info=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),Vue.createElementVNode("div",s,[Vue.createVNode(o,{onClick:E},{default:Vue.withCtx((()=>[Vue.createTextVNode("取 消")])),_:1}),Vue.createVNode(o,{type:"primary",onClick:U},{default:Vue.withCtx((()=>[Vue.createTextVNode("发 送")])),_:1})])])),[[d,Vue.unref(N)]])])),_:1},8,["modelValue"])])}}});export{V as default};
