import{l as e,n as u,o,c as r,p as a,_ as d}from"./index-fa007f95.js";import{a as l}from"./index-4a1aea19.js";import{useRouter as n}from"vue-router";import{ref as s,reactive as t}from"vue";import{E as i}from"./el-message-c349120f.js";import"./typescript-5028724d.js";const V={class:"login-container"},m={class:"login-card"},c=(e=>(Vue.pushScopeId("data-v-49444af0"),e=e(),Vue.popScopeId(),e))((()=>Vue.createElementVNode("div",{class:"title"},[Vue.createElementVNode("img",{src:"https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=575"})],-1))),p={class:"content"},f={style:{display:"flex","justify-content":"center","margin-top":"16px"}},C={key:0,class:"footer"},w=d(Vue.defineComponent({__name:"index",setup(d){const w=n(),g=s(!1),k=s(!0),v=s(!0),h=t({user:{uname:"",pwd:""},imageCode:"",address:"",mailCode:""}),y=t({user:{uname:"",pwd:""},address:"",imageCode:"",mailCode:""}),x=s(),N=s(),B=()=>{if(v.value){if(""===h.user.uname)return i.warning("请输入用户名！");if(""===h.user.pwd)return i.warning("请输入密码！");if(""===h.imageCode)return i.warning("请输入图片验证码！");g.value=!0,r().login({imageCode:h.imageCode,user:{uname:h.user.uname,pwd:l(h.user.pwd)}}).then((async({success:e,message:u})=>{w.push({path:"/"}),i.success(u)})).catch((e=>{var u;e.includes("密码")&&(h.user.pwd=""),e.includes("登录名")&&(h.user.uname=""),e.includes("验证码")&&(h.imageCode="",null==(u=x.value)||u.sendImageCode())})).finally((()=>{g.value=!1}))}else{if(h.address,/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(h.address),""===h.address||!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(h.address))return i.warning("请输入正确的邮箱！");if(""===h.mailCode)return i.warning("请输入邮箱验证码！");g.value=!0,r().loginByEmail({address:h.address,mailCode:h.mailCode}).then((({success:e,message:u})=>{w.push({path:"/"}),i.success(u)})).catch((e=>{e.includes("邮箱")&&(h.address=""),e.includes("验证码")&&(h.mailCode="")})).finally((()=>{g.value=!1}))}},_=()=>""===y.user.uname?i.warning("请输入用户名！"):""===y.user.pwd?i.warning("请输入密码！"):""!==y.address&&/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(y.address)?""===y.mailCode?i.warning("请输入邮箱验证码！"):""===y.imageCode?i.warning("请输入图片验证码！"):(g.value=!0,void a({...y,user:{...y.user,pwd:l(y.user.pwd)}}).then((e=>{i.success("注册成功"),k.value=!k.value,y.user.uname="",y.user.pwd="",y.address="",y.imageCode="",y.mailCode=""})).catch((e=>{var u;e.includes("密码")&&(y.user.pwd=""),e.includes("登录名")&&(y.user.uname=""),e.includes("图片")&&(y.imageCode="",null==(u=N.value)||u.sendImageCode()),e.includes("邮箱")&&(y.mailCode="")})).finally((()=>{g.value=!1}))):i.warning("请输入正确的邮箱！"),M=()=>{k.value=!k.value},U=()=>{k.value?B():_()},E=()=>{i.error("密码都能忘记，你还是换个账号吧！"),setTimeout((()=>{i.error("别惊讶，只是懒得做这个功能！")}),4e3)};return(r,a)=>{const d=Vue.resolveComponent("el-input"),l=Vue.resolveComponent("el-form-item"),n=Vue.resolveComponent("ImageCode"),s=Vue.resolveComponent("CodeSend"),t=Vue.resolveComponent("el-form"),i=Vue.resolveComponent("el-button"),w=Vue.resolveComponent("el-link"),b=Vue.resolveComponent("el-icon");return Vue.openBlock(),Vue.createElementBlock("div",V,[Vue.createElementVNode("div",m,[c,Vue.createElementVNode("div",p,[Vue.unref(k)?(Vue.openBlock(),Vue.createBlock(t,{key:0,size:"large",ref:"loginFormRef","show-message":!1,model:Vue.unref(h),onKeyup:Vue.withKeys(B,["enter"])},{default:Vue.withCtx((()=>[Vue.unref(v)?(Vue.openBlock(),Vue.createBlock(l,{key:0,prop:"user.uname"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(h).user.uname,"onUpdate:modelValue":a[0]||(a[0]=e=>Vue.unref(h).user.uname=e),modelModifiers:{trim:!0},clearable:"",placeholder:"用户名","prefix-icon":Vue.unref(e)},null,8,["modelValue","prefix-icon"])])),_:1})):Vue.createCommentVNode("",!0),Vue.unref(v)?(Vue.openBlock(),Vue.createBlock(l,{key:1,prop:"user.pwd"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(h).user.pwd,"onUpdate:modelValue":a[1]||(a[1]=e=>Vue.unref(h).user.pwd=e),modelModifiers:{trim:!0},clearable:"",placeholder:"密码",type:"password","prefix-icon":Vue.unref(u),"show-password":""},null,8,["modelValue","prefix-icon"])])),_:1})):Vue.createCommentVNode("",!0),Vue.unref(v)?(Vue.openBlock(),Vue.createBlock(n,{key:2,ref_key:"imageCodeRefLogin",ref:x,modelValue:Vue.unref(h).imageCode,"onUpdate:modelValue":a[2]||(a[2]=e=>Vue.unref(h).imageCode=e),modelModifiers:{trim:!0}},null,8,["modelValue"])):Vue.createCommentVNode("",!0),Vue.unref(v)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createBlock(l,{key:3,prop:"address"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(h).address,"onUpdate:modelValue":a[3]||(a[3]=e=>Vue.unref(h).address=e),modelModifiers:{trim:!0},clearable:"",placeholder:"邮箱","prefix-icon":Vue.unref(e)},null,8,["modelValue","prefix-icon"])])),_:1})),Vue.unref(v)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createBlock(s,{key:4,type:2,mailCode:Vue.unref(h).mailCode,"onUpdate:mailCode":a[4]||(a[4]=e=>Vue.unref(h).mailCode=e),mailCodeModifiers:{trim:!0},address:Vue.unref(h).address,"onUpdate:address":a[5]||(a[5]=e=>Vue.unref(h).address=e),addressModifiers:{trim:!0}},null,8,["mailCode","address"]))])),_:1},8,["model","onKeyup"])):(Vue.openBlock(),Vue.createBlock(t,{key:1,size:"large",ref:"regFormRef",model:Vue.unref(y),onKeyup:Vue.withKeys(_,["enter"])},{default:Vue.withCtx((()=>[Vue.createVNode(l,{prop:"user.uname"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(y).user.uname,"onUpdate:modelValue":a[6]||(a[6]=e=>Vue.unref(y).user.uname=e),modelModifiers:{trim:!0},clearable:"",placeholder:"用户名","prefix-icon":Vue.unref(e)},null,8,["modelValue","prefix-icon"])])),_:1}),Vue.createVNode(l,{prop:"user.pwd"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(y).user.pwd,"onUpdate:modelValue":a[7]||(a[7]=e=>Vue.unref(y).user.pwd=e),modelModifiers:{trim:!0},clearable:"",placeholder:"密码",type:"password","prefix-icon":Vue.unref(u),"show-password":""},null,8,["modelValue","prefix-icon"])])),_:1}),Vue.createVNode(l,{prop:"address"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{modelValue:Vue.unref(y).address,"onUpdate:modelValue":a[8]||(a[8]=e=>Vue.unref(y).address=e),modelModifiers:{trim:!0},clearable:"",placeholder:"邮箱","prefix-icon":Vue.unref(o)},null,8,["modelValue","prefix-icon"])])),_:1}),Vue.createVNode(s,{type:1,mailCode:Vue.unref(y).mailCode,"onUpdate:mailCode":a[9]||(a[9]=e=>Vue.unref(y).mailCode=e),mailCodeModifiers:{trim:!0},address:Vue.unref(y).address,"onUpdate:address":a[10]||(a[10]=e=>Vue.unref(y).address=e),addressModifiers:{trim:!0}},null,8,["mailCode","address"]),Vue.createVNode(n,{ref_key:"imageCodeRefReg",ref:N,modelValue:Vue.unref(y).imageCode,"onUpdate:modelValue":a[11]||(a[11]=e=>Vue.unref(y).imageCode=e),modelModifiers:{trim:!0}},null,8,["modelValue"])])),_:1},8,["model","onKeyup"])),Vue.createVNode(i,{loading:Vue.unref(g),size:"large",type:"primary",onClick:U},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(Vue.unref(k)?"登 录":"注 册"),1)])),_:1},8,["loading"]),Vue.createElementVNode("div",f,[Vue.createVNode(w,{onClick:Vue.withModifiers(M,["prevent"])},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(Vue.unref(k)?"还没有账号？立即前往注册":"已有账号？立即前往登录"),1)])),_:1},8,["onClick"]),Vue.unref(k)&&Vue.unref(v)?(Vue.openBlock(),Vue.createBlock(w,{key:0,class:"ml-20",onClick:Vue.withModifiers(E,["prevent"])},{default:Vue.withCtx((()=>[Vue.createTextVNode("忘记密码？")])),_:1},8,["onClick"])):Vue.createCommentVNode("",!0)])]),Vue.unref(k)?(Vue.openBlock(),Vue.createElementBlock("div",C,[Vue.unref(v)?(Vue.openBlock(),Vue.createBlock(b,{key:0,onClick:a[12]||(a[12]=e=>v.value=!1)},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(o))])),_:1})):Vue.createCommentVNode("",!0),Vue.unref(v)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createBlock(b,{key:1,onClick:a[13]||(a[13]=e=>v.value=!0)},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(e))])),_:1}))])):Vue.createCommentVNode("",!0)])])}}}),[["__scopeId","data-v-49444af0"]]);export{w as default};
