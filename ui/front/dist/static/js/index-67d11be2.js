import{g as e,s as t,u as o,_ as n,f as r,e as l,m as u,a,b as c,r as i,c as s,d,h as V,i as m,j as p,k as f}from"./index-fa007f95.js";import{U as h}from"./user-0d1ee578.js";import{E as v}from"./el-overlay-9d820482.js";import{g as k}from"./index-4a1aea19.js";import"vue";import"./typescript-5028724d.js";var w=(e=>(e[e.Mobile=0]="Mobile",e[e.Desktop=1]="Desktop",e))(w||{});const g=Pinia.defineStore("app",(()=>{const o=Vue.reactive({opened:"closed"!==e(),withoutAnimation:!1}),n=Vue.ref(1);return{device:n,sidebar:o,toggleSidebar:e=>{o.opened=!o.opened,o.withoutAnimation=e,o.opened?t("opened"):t("closed")},closeSidebar:e=>{o.opened=!1,o.withoutAnimation=e,t("closed")},toggleDevice:e=>{n.value=e}}})),C=!1,y=!0,b=!0,E=!0,x=!0,N=!0,B=!0,_=!1,S=!1,A=Pinia.defineStore("settings",(()=>({fixedHeader:Vue.ref(b),showSettings:Vue.ref(C),showTagsView:Vue.ref(y),showSidebarLogo:Vue.ref(E),showNotify:Vue.ref(x),showThemeSwitch:Vue.ref(N),showScreenfull:Vue.ref(B),showGreyMode:Vue.ref(_),showColorWeakness:Vue.ref(S)}))),T={class:"app-main"},I=n(Vue.defineComponent({__name:"AppMain",setup(e){const t=VueRouter.useRoute(),n=o(),r=Vue.computed((()=>t.path));return(e,t)=>{const o=Vue.resolveComponent("router-view");return Vue.openBlock(),Vue.createElementBlock("section",T,[Vue.createVNode(o,null,{default:Vue.withCtx((({Component:e})=>[Vue.createVNode(Vue.Transition,{name:"fade-transform",mode:"out-in"},{default:Vue.withCtx((()=>[(Vue.openBlock(),Vue.createBlock(Vue.KeepAlive,{include:Vue.unref(n).cachedViews},[(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(e),{key:Vue.unref(r)}))],1032,["include"]))])),_:2},1024)])),_:1})])}}}),[["__scopeId","data-v-742973e9"]]);function M(e,t){void 0===t&&(t={});for(var o=function(e){for(var t=[],o=0;o<e.length;){var n=e[o];if("*"!==n&&"+"!==n&&"?"!==n)if("\\"!==n)if("{"!==n)if("}"!==n)if(":"!==n)if("("!==n)t.push({type:"CHAR",index:o,value:e[o++]});else{var r=1,l="";if("?"===e[a=o+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<e.length;)if("\\"!==e[a]){if(")"===e[a]){if(0==--r){a++;break}}else if("("===e[a]&&(r++,"?"!==e[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));l+=e[a++]}else l+=e[a++]+e[a++];if(r)throw new TypeError("Unbalanced pattern at ".concat(o));if(!l)throw new TypeError("Missing pattern at ".concat(o));t.push({type:"PATTERN",index:o,value:l}),o=a}else{for(var u="",a=o+1;a<e.length;){var c=e.charCodeAt(a);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;u+=e[a++]}if(!u)throw new TypeError("Missing parameter name at ".concat(o));t.push({type:"NAME",index:o,value:u}),o=a}else t.push({type:"CLOSE",index:o,value:e[o++]});else t.push({type:"OPEN",index:o,value:e[o++]});else t.push({type:"ESCAPED_CHAR",index:o++,value:e[o++]});else t.push({type:"MODIFIER",index:o,value:e[o++]})}return t.push({type:"END",index:o,value:""}),t}(e),n=t.prefixes,r=void 0===n?"./":n,l="[^".concat(function(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}(t.delimiter||"/#?"),"]+?"),u=[],a=0,c=0,i="",s=function(e){if(c<o.length&&o[c].type===e)return o[c++].value},d=function(e){var t=s(e);if(void 0!==t)return t;var n=o[c],r=n.type,l=n.index;throw new TypeError("Unexpected ".concat(r," at ").concat(l,", expected ").concat(e))},V=function(){for(var e,t="";e=s("CHAR")||s("ESCAPED_CHAR");)t+=e;return t};c<o.length;){var m=s("CHAR"),p=s("NAME"),f=s("PATTERN");if(p||f){var h=m||"";-1===r.indexOf(h)&&(i+=h,h=""),i&&(u.push(i),i=""),u.push({name:p||a++,prefix:h,suffix:"",pattern:f||l,modifier:s("MODIFIER")||""})}else{var v=m||s("ESCAPED_CHAR");if(v)i+=v;else if(i&&(u.push(i),i=""),s("OPEN")){h=V();var k=s("NAME")||"",w=s("PATTERN")||"",g=V();d("CLOSE"),u.push({name:k||(w?a++:""),pattern:k&&!w?l:w,prefix:h,suffix:g,modifier:s("MODIFIER")||""})}else d("END")}}return u}function P(e,t){return function(e,t){void 0===t&&(t={});var o=function(e){return e&&e.sensitive?"":"i"}(t),n=t.encode,r=void 0===n?function(e){return e}:n,l=t.validate,u=void 0===l||l,a=e.map((function(e){if("object"==typeof e)return new RegExp("^(?:".concat(e.pattern,")$"),o)}));return function(t){for(var o="",n=0;n<e.length;n++){var l=e[n];if("string"!=typeof l){var c=t?t[l.name]:void 0,i="?"===l.modifier||"*"===l.modifier,s="*"===l.modifier||"+"===l.modifier;if(Array.isArray(c)){if(!s)throw new TypeError('Expected "'.concat(l.name,'" to not repeat, but got an array'));if(0===c.length){if(i)continue;throw new TypeError('Expected "'.concat(l.name,'" to not be empty'))}for(var d=0;d<c.length;d++){var V=r(c[d],l);if(u&&!a[n].test(V))throw new TypeError('Expected all "'.concat(l.name,'" to match "').concat(l.pattern,'", but got "').concat(V,'"'));o+=l.prefix+V+l.suffix}}else if("string"!=typeof c&&"number"!=typeof c){if(!i){var m=s?"an array":"a string";throw new TypeError('Expected "'.concat(l.name,'" to be ').concat(m))}}else{V=r(String(c),l);if(u&&!a[n].test(V))throw new TypeError('Expected "'.concat(l.name,'" to match "').concat(l.pattern,'", but got "').concat(V,'"'));o+=l.prefix+V+l.suffix}}else o+=l}return o}}(M(e,t),t)}const R={key:0,class:"no-redirect"},F=["onClick"],D=n(Vue.defineComponent({__name:"index",setup(e){const t=VueRouter.useRoute(),o=VueRouter.useRouter(),n=Vue.ref([]),r=()=>{n.value=t.matched.filter((e=>e.meta&&e.meta.title&&!1!==e.meta.breadcrumb))},l=e=>{const{redirect:n,path:r}=e;n?o.push(n):o.push((e=>{const{params:o}=t;return P(e)(o)})(r))};return Vue.watch((()=>t.path),(e=>{e.startsWith("/redirect/")||r()})),r(),(e,t)=>{const o=Vue.resolveComponent("el-breadcrumb-item"),r=Vue.resolveComponent("el-breadcrumb");return Vue.openBlock(),Vue.createBlock(r,{class:"app-breadcrumb"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(n.value,((e,t)=>(Vue.openBlock(),Vue.createBlock(o,{key:e.path},{default:Vue.withCtx((()=>["noRedirect"===e.redirect||t===n.value.length-1?(Vue.openBlock(),Vue.createElementBlock("span",R,Vue.toDisplayString(e.meta.title),1)):(Vue.openBlock(),Vue.createElementBlock("a",{key:1,onClick:Vue.withModifiers((t=>l(e)),["prevent"])},Vue.toDisplayString(e.meta.title),9,F))])),_:2},1024)))),128))])),_:1})}}}),[["__scopeId","data-v-c2dac653"]]),L=n(Vue.defineComponent({__name:"index",props:{isActive:{type:Boolean,default:!1}},emits:["toggle-click"],setup(e,{emit:t}){const o=e,n=()=>{t("toggle-click")};return(e,t)=>{const u=Vue.resolveComponent("el-icon");return Vue.openBlock(),Vue.createElementBlock("div",{onClick:n},[Vue.createVNode(u,{size:20,class:"icon"},{default:Vue.withCtx((()=>[o.isActive?(Vue.openBlock(),Vue.createBlock(Vue.unref(r),{key:0})):(Vue.openBlock(),Vue.createBlock(Vue.unref(l),{key:1}))])),_:1})])}}}),[["__scopeId","data-v-a246b407"]]),z=Vue.defineComponent({__name:"index",setup(e){const{themeList:t,activeThemeName:o,setTheme:n}=a(),r=e=>{n(e)};return(e,n)=>{const l=Vue.resolveComponent("el-icon"),a=Vue.resolveComponent("el-tooltip"),c=Vue.resolveComponent("el-dropdown-item"),i=Vue.resolveComponent("el-dropdown-menu"),s=Vue.resolveComponent("el-dropdown");return Vue.openBlock(),Vue.createBlock(s,{trigger:"click",onCommand:r},{dropdown:Vue.withCtx((()=>[Vue.createVNode(i,null,{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(t),((e,t)=>(Vue.openBlock(),Vue.createBlock(c,{key:t,disabled:Vue.unref(o)===e.name,command:e.name},{default:Vue.withCtx((()=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.title),1)])),_:2},1032,["disabled","command"])))),128))])),_:1})])),default:Vue.withCtx((()=>[Vue.createElementVNode("div",null,[Vue.createVNode(a,{effect:"dark",content:"主题模式",placement:"bottom"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{size:20},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(u))])),_:1})])),_:1})])])),_:1})}}}),O=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],q=(()=>{if("undefined"==typeof document)return!1;const e=O[0],t={};for(const o of O){if((null==o?void 0:o[1])in document){for(const[n,r]of o.entries())t[e[n]]=r;return t}}return!1})(),U={change:q.fullscreenchange,error:q.fullscreenerror};let j={request:(e=document.documentElement,t)=>new Promise(((o,n)=>{const r=()=>{j.off("change",r),o()};j.on("change",r);const l=e[q.requestFullscreen](t);l instanceof Promise&&l.then(r).catch(n)})),exit:()=>new Promise(((e,t)=>{if(!j.isFullscreen)return void e();const o=()=>{j.off("change",o),e()};j.on("change",o);const n=document[q.exitFullscreen]();n instanceof Promise&&n.then(o).catch(t)})),toggle:(e,t)=>j.isFullscreen?j.exit():j.request(e,t),onchange(e){j.on("change",e)},onerror(e){j.on("error",e)},on(e,t){const o=U[e];o&&document.addEventListener(o,t,!1)},off(e,t){const o=U[e];o&&document.removeEventListener(o,t,!1)},raw:q};Object.defineProperties(j,{isFullscreen:{get:()=>Boolean(document[q.fullscreenElement])},element:{enumerable:!0,get:()=>document[q.fullscreenElement]??void 0},isEnabled:{enumerable:!0,get:()=>Boolean(document[q.fullscreenEnabled])}}),q||(j={isEnabled:!1});const W=j,H=n(Vue.defineComponent({__name:"index",props:{element:{type:String,default:"html"},openTips:{type:String,default:"全屏"},exitTips:{type:String,default:"退出全屏"}},setup(e){const t=e,o=Vue.ref(t.openTips),n=Vue.ref(!1),r=()=>{const e=document.querySelector(t.element)||void 0;W.isEnabled?W.toggle(e):ElementPlus.ElMessage.warning("您的浏览器无法工作")},l=()=>{n.value=W.isFullscreen,o.value=W.isFullscreen?t.exitTips:t.openTips};return W.on("change",l),Vue.onUnmounted((()=>{W.isEnabled&&W.off("change",l)})),(e,t)=>{const l=Vue.resolveComponent("svg-icon"),u=Vue.resolveComponent("el-tooltip");return Vue.openBlock(),Vue.createElementBlock("div",{onClick:r},[Vue.createVNode(u,{effect:"dark",content:o.value,placement:"bottom"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{name:n.value?"fullscreen-exit":"fullscreen"},null,8,["name"])])),_:1},8,["content"])])}}}),[["__scopeId","data-v-a4827417"]]),X={class:"card-header"},$={class:"card-title"},G={class:"card-time"},Y={key:0,class:"card-avatar"},J=["src"],K={class:"card-body"},Z=n(Vue.defineComponent({__name:"NotifyList",props:{list:{type:Object,required:!0}},setup(e){const t=e;return(e,o)=>{const n=Vue.resolveComponent("el-empty"),r=Vue.resolveComponent("el-tag"),l=Vue.resolveComponent("el-card");return 0===t.list.length?(Vue.openBlock(),Vue.createBlock(n,{key:0})):(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,{key:1},Vue.renderList(t.list,((e,t)=>(Vue.openBlock(),Vue.createBlock(l,{key:t,shadow:"never",class:"card-container"},{header:Vue.withCtx((()=>[Vue.createElementVNode("div",X,[Vue.createElementVNode("div",null,[Vue.createElementVNode("span",null,[Vue.createElementVNode("span",$,Vue.toDisplayString(e.title),1),e.extra?(Vue.openBlock(),Vue.createBlock(r,{key:0,type:e.status,effect:"plain",size:"small"},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.extra),1)])),_:2},1032,["type"])):Vue.createCommentVNode("",!0)]),Vue.createElementVNode("div",G,Vue.toDisplayString(e.datetime),1)]),e.avatar?(Vue.openBlock(),Vue.createElementBlock("div",Y,[Vue.createElementVNode("img",{src:"https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=575",width:"34"},null,8,J)])):Vue.createCommentVNode("",!0)])])),default:Vue.withCtx((()=>[Vue.createElementVNode("div",K,Vue.toDisplayString(e.description??"No Data"),1)])),_:2},1024)))),128))}}}),[["__scopeId","data-v-22d83a0d"]]),Q=[{avatar:"https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",title:"V3 Admin Vite 上线啦",datetime:"半年前",description:"一个免费开源的中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等主流技术"},{avatar:"https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",title:"V3 Admin 上线啦",datetime:"一年前",description:"一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus 和 Pinia"}],ee=[{avatar:"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",title:"来自楚门的世界",description:"如果再也不能见到你，祝你早安、午安和晚安",datetime:"1998-06-05"},{avatar:"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",title:"来自大话西游",description:"如果非要在这份爱上加上一个期限，我希望是一万年",datetime:"1995-02-04"},{avatar:"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",title:"来自龙猫",description:"心存善意，定能途遇天使",datetime:"1988-04-16"}],te=[{title:"任务名称",description:"这家伙很懒，什么都没留下",extra:"未开始",status:"info"},{title:"任务名称",description:"这家伙很懒，什么都没留下",extra:"进行中",status:""},{title:"任务名称",description:"这家伙很懒，什么都没留下",extra:"已超时",status:"danger"}],oe={class:"notify"},ne={class:"notify-history"},re=n(Vue.defineComponent({__name:"index",setup(e){const t=Vue.computed((()=>{let e=0;for(let t=0;t<n.value.length;t++)e+=n.value[t].list.length;return e})),o=Vue.ref("通知"),n=Vue.ref([{name:"通知",type:"primary",list:Q},{name:"消息",type:"danger",list:ee},{name:"待办",type:"warning",list:te}]),r=()=>{ElementPlus.ElMessage.success(`跳转到${o.value}历史页面`)};return(e,l)=>{const u=Vue.resolveComponent("el-icon"),a=Vue.resolveComponent("el-tooltip"),i=Vue.resolveComponent("el-badge"),s=Vue.resolveComponent("el-scrollbar"),d=Vue.resolveComponent("el-tab-pane"),V=Vue.resolveComponent("el-tabs"),m=Vue.resolveComponent("el-button"),p=Vue.resolveComponent("el-popover");return Vue.openBlock(),Vue.createElementBlock("div",oe,[Vue.createVNode(p,{placement:"bottom",width:350,trigger:"click"},{reference:Vue.withCtx((()=>[Vue.createVNode(i,{value:Vue.unref(t),max:99,hidden:0===Vue.unref(t)},{default:Vue.withCtx((()=>[Vue.createVNode(a,{effect:"dark",content:"消息通知",placement:"bottom"},{default:Vue.withCtx((()=>[Vue.createVNode(u,{size:20},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(c))])),_:1})])),_:1})])),_:1},8,["value","hidden"])])),default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=e=>o.value=e),class:"demo-tabs",stretch:""},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(n.value,((e,t)=>(Vue.openBlock(),Vue.createBlock(d,{name:e.name,key:t},{label:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.name)+" ",1),Vue.createVNode(i,{value:e.list.length,max:99,type:e.type},null,8,["value","type"])])),default:Vue.withCtx((()=>[Vue.createVNode(s,{height:"400px"},{default:Vue.withCtx((()=>[Vue.createVNode(Z,{list:e.list},null,8,["list"])])),_:2},1024)])),_:2},1032,["name"])))),128))])),_:1},8,["modelValue"]),Vue.createElementVNode("div",ne,[Vue.createVNode(m,{link:"",onClick:r},{default:Vue.withCtx((()=>[Vue.createTextVNode("查看"+Vue.toDisplayString(o.value)+"历史",1)])),_:1})])])),_:1})])}}}),[["__scopeId","data-v-d6bd8243"]]),le={lock:!0,text:"加载中..."},ue=(e,t={})=>{let o;const n=()=>{o&&o.close()},r={...le,...t};return(...t)=>{try{l=r,o=ElementPlus.ElLoading.service(l);const u=e(...t);return u instanceof Promise?u.then((e=>e)).catch((e=>{throw e})).finally((()=>{n()})):(n(),Promise.resolve(u))}catch(u){throw n(),u}var l}};const ae=e=>(Vue.pushScopeId("data-v-d4892e4c"),e=e(),Vue.popScopeId(),e),ce={class:"navigation-bar"},ie={class:"right-menu"},se={class:"right-menu-avatar"},de=ae((()=>Vue.createElementVNode("span",{style:{display:"block"}},"修改密码",-1))),Ve=ae((()=>Vue.createElementVNode("span",{style:{display:"block"}},"修改资料",-1))),me=ae((()=>Vue.createElementVNode("span",{style:{display:"block"}},"修改邮箱信息",-1))),pe=ae((()=>Vue.createElementVNode("span",{style:{display:"block"}},"退出登录",-1))),fe=ae((()=>Vue.createElementVNode("span",{style:{display:"block"}},"注销",-1))),he=n(Vue.defineComponent({__name:"index",setup(e){const t=VueRouter.useRouter(),o=g(),n=A(),r=s(),l=Vue.ref(""),u=Vue.ref(!1),a=Vue.ref(h.PWD),c=Vue.computed((()=>o.sidebar)),d=Vue.computed((()=>n.showNotify)),V=Vue.computed((()=>n.showThemeSwitch)),m=Vue.computed((()=>n.showScreenfull)),p=()=>{o.toggleSidebar(!1)},f={text:"退出登录中..."},k=async(e=!0)=>{await ue(r.logout,f)(),t.push("/login"),e&&ElementPlus.ElMessage.success("退出登录成功")},w=()=>{l.value="修改密码",a.value=h.PWD,u.value=!0},C=()=>{l.value="修改用户附加信息",a.value=h.USER_INFO,u.value=!0},y=()=>{l.value="修改用户邮箱信息",a.value=h.EMAIL,u.value=!0},b=()=>{v.confirm("此操作将注销当前用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i({url:"/User/Logout",method:"post"}).then((({success:e,message:t})=>{e?(ElementPlus.ElMessage.success(t),k(!1)):ElementPlus.ElMessage.error(t)})).catch((()=>{ElementPlus.ElMessage.error("注销失败")}))})).catch((()=>{ElementPlus.ElMessage.info("已取消注销")}))};return(e,t)=>{const o=Vue.resolveComponent("el-avatar"),n=Vue.resolveComponent("el-dropdown-item"),i=Vue.resolveComponent("el-dropdown-menu"),s=Vue.resolveComponent("el-dropdown"),f=Vue.resolveComponent("Update");return Vue.openBlock(),Vue.createElementBlock("div",ce,[Vue.createVNode(L,{"is-active":Vue.unref(c).opened,class:"hamburger",onToggleClick:p},null,8,["is-active"]),Vue.createVNode(D,{class:"breadcrumb"}),Vue.createElementVNode("div",ie,[Vue.unref(m)?(Vue.openBlock(),Vue.createBlock(H,{key:0,class:"right-menu-item"})):Vue.createCommentVNode("",!0),Vue.unref(V)?(Vue.openBlock(),Vue.createBlock(z,{key:1,class:"right-menu-item"})):Vue.createCommentVNode("",!0),Vue.unref(d)?(Vue.openBlock(),Vue.createBlock(re,{key:2,class:"right-menu-item"})):Vue.createCommentVNode("",!0),Vue.createVNode(s,{class:"right-menu-item"},{dropdown:Vue.withCtx((()=>[Vue.createVNode(i,null,{default:Vue.withCtx((()=>[Vue.createVNode(n,{divided:"",onClick:w},{default:Vue.withCtx((()=>[de])),_:1}),Vue.createVNode(n,{divided:"",onClick:C},{default:Vue.withCtx((()=>[Ve])),_:1}),Vue.createVNode(n,{divided:"",onClick:y},{default:Vue.withCtx((()=>[me])),_:1}),Vue.createVNode(n,{divided:"",onClick:k},{default:Vue.withCtx((()=>[pe])),_:1}),Vue.createVNode(n,{divided:"",onClick:b},{default:Vue.withCtx((()=>[fe])),_:1})])),_:1})])),default:Vue.withCtx((()=>{var e,t,n;return[Vue.createElementVNode("div",se,[Vue.createVNode(o,{src:(null==(e=Vue.unref(r).userInfo)?void 0:e.avatar_url)?null==(t=Vue.unref(r).userInfo)?void 0:t.avatar_url:"https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=575",size:30},null,8,["src"]),Vue.createElementVNode("span",null,Vue.toDisplayString(null==(n=Vue.unref(r).userInfo)?void 0:n.nickname),1)])]})),_:1})]),Vue.createVNode(f,{title:l.value,modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=e=>u.value=e),updateType:a.value},null,8,["title","modelValue","updateType"])])}}}),[["__scopeId","data-v-d4892e4c"]]),ve=e=>(Vue.pushScopeId("data-v-21d0bc39"),e=e(),Vue.popScopeId(),e),ke={class:"drawer-container"},we=ve((()=>Vue.createElementVNode("h3",{class:"drawer-title"},"系统布局配置",-1))),ge={class:"drawer-item"},Ce=ve((()=>Vue.createElementVNode("span",null,"显示标签栏",-1))),ye={class:"drawer-item"},be=ve((()=>Vue.createElementVNode("span",null,"显示侧边栏 Logo",-1))),Ee={class:"drawer-item"},xe=ve((()=>Vue.createElementVNode("span",null,"固定 Header",-1))),Ne={class:"drawer-item"},Be=ve((()=>Vue.createElementVNode("span",null,"显示消息通知",-1))),_e={class:"drawer-item"},Se=ve((()=>Vue.createElementVNode("span",null,"显示切换主题按钮",-1))),Ae={class:"drawer-item"},Te=ve((()=>Vue.createElementVNode("span",null,"显示全屏按钮",-1))),Ie={class:"drawer-item"},Me=ve((()=>Vue.createElementVNode("span",null,"显示灰色模式",-1))),Pe={class:"drawer-item"},Re=ve((()=>Vue.createElementVNode("span",null,"显示色弱模式",-1))),Fe=n(Vue.defineComponent({__name:"index",setup(e){const t=A();return(e,o)=>{const n=Vue.resolveComponent("el-switch");return Vue.openBlock(),Vue.createElementBlock("div",ke,[Vue.createElementVNode("div",null,[we,Vue.createElementVNode("div",ge,[Ce,Vue.createVNode(n,{modelValue:Vue.unref(t).showTagsView,"onUpdate:modelValue":o[0]||(o[0]=e=>Vue.unref(t).showTagsView=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",ye,[be,Vue.createVNode(n,{modelValue:Vue.unref(t).showSidebarLogo,"onUpdate:modelValue":o[1]||(o[1]=e=>Vue.unref(t).showSidebarLogo=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",Ee,[xe,Vue.createVNode(n,{modelValue:Vue.unref(t).fixedHeader,"onUpdate:modelValue":o[2]||(o[2]=e=>Vue.unref(t).fixedHeader=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",Ne,[Be,Vue.createVNode(n,{modelValue:Vue.unref(t).showNotify,"onUpdate:modelValue":o[3]||(o[3]=e=>Vue.unref(t).showNotify=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",_e,[Se,Vue.createVNode(n,{modelValue:Vue.unref(t).showThemeSwitch,"onUpdate:modelValue":o[4]||(o[4]=e=>Vue.unref(t).showThemeSwitch=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",Ae,[Te,Vue.createVNode(n,{modelValue:Vue.unref(t).showScreenfull,"onUpdate:modelValue":o[5]||(o[5]=e=>Vue.unref(t).showScreenfull=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",Ie,[Me,Vue.createVNode(n,{modelValue:Vue.unref(t).showGreyMode,"onUpdate:modelValue":o[6]||(o[6]=e=>Vue.unref(t).showGreyMode=e),class:"drawer-switch"},null,8,["modelValue"])]),Vue.createElementVNode("div",Pe,[Re,Vue.createVNode(n,{modelValue:Vue.unref(t).showColorWeakness,"onUpdate:modelValue":o[7]||(o[7]=e=>Vue.unref(t).showColorWeakness=e),class:"drawer-switch"},null,8,["modelValue"])])])])}}}),[["__scopeId","data-v-21d0bc39"]]),De=e=>/^(https?:|mailto:|tel:)/.test(e),Le=["href"],ze=Vue.defineComponent({__name:"SidebarItemLink",props:{to:{type:String,required:!0}},setup(e){const t=e;return(e,o)=>{const n=Vue.resolveComponent("router-link");return Vue.unref(De)(t.to)?(Vue.openBlock(),Vue.createElementBlock("a",{key:0,href:t.to,target:"_blank",rel:"noopener"},[Vue.renderSlot(e.$slots,"default")],8,Le)):(Vue.openBlock(),Vue.createBlock(n,{key:1,to:t.to},{default:Vue.withCtx((()=>[Vue.renderSlot(e.$slots,"default")])),_:3},8,["to"]))}}});function Oe(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function qe(e,t){for(var o,n="",r=0,l=-1,u=0,a=0;a<=e.length;++a){if(a<e.length)o=e.charCodeAt(a);else{if(47===o)break;o=47}if(47===o){if(l===a-1||1===u);else if(l!==a-1&&2===u){if(n.length<2||2!==r||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var c=n.lastIndexOf("/");if(c!==n.length-1){-1===c?(n="",r=0):r=(n=n.slice(0,c)).length-1-n.lastIndexOf("/"),l=a,u=0;continue}}else if(2===n.length||1===n.length){n="",r=0,l=a,u=0;continue}t&&(n.length>0?n+="/..":n="..",r=2)}else n.length>0?n+="/"+e.slice(l+1,a):n=e.slice(l+1,a),r=a-l-1;l=a,u=0}else 46===o&&-1!==u?++u:u=-1}return n}var Ue={resolve:function(){for(var e,t="",o=!1,n=arguments.length-1;n>=-1&&!o;n--){var r;n>=0?r=arguments[n]:(void 0===e&&(e=process.cwd()),r=e),Oe(r),0!==r.length&&(t=r+"/"+t,o=47===r.charCodeAt(0))}return t=qe(t,!o),o?t.length>0?"/"+t:"/":t.length>0?t:"."},normalize:function(e){if(Oe(e),0===e.length)return".";var t=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=qe(e,!t)).length||t||(e="."),e.length>0&&o&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return Oe(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,t=0;t<arguments.length;++t){var o=arguments[t];Oe(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":Ue.normalize(e)},relative:function(e,t){if(Oe(e),Oe(t),e===t)return"";if((e=Ue.resolve(e))===(t=Ue.resolve(t)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var n=e.length,r=n-o,l=1;l<t.length&&47===t.charCodeAt(l);++l);for(var u=t.length-l,a=r<u?r:u,c=-1,i=0;i<=a;++i){if(i===a){if(u>a){if(47===t.charCodeAt(l+i))return t.slice(l+i+1);if(0===i)return t.slice(l+i)}else r>a&&(47===e.charCodeAt(o+i)?c=i:0===i&&(c=0));break}var s=e.charCodeAt(o+i);if(s!==t.charCodeAt(l+i))break;47===s&&(c=i)}var d="";for(i=o+c+1;i<=n;++i)i!==n&&47!==e.charCodeAt(i)||(0===d.length?d+="..":d+="/..");return d.length>0?d+t.slice(l+c):(l+=c,47===t.charCodeAt(l)&&++l,t.slice(l))},_makeLong:function(e){return e},dirname:function(e){if(Oe(e),0===e.length)return".";for(var t=e.charCodeAt(0),o=47===t,n=-1,r=!0,l=e.length-1;l>=1;--l)if(47===(t=e.charCodeAt(l))){if(!r){n=l;break}}else r=!1;return-1===n?o?"/":".":o&&1===n?"//":e.slice(0,n)},basename:function(e,t){if(void 0!==t&&"string"!=typeof t)throw new TypeError('"ext" argument must be a string');Oe(e);var o,n=0,r=-1,l=!0;if(void 0!==t&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var u=t.length-1,a=-1;for(o=e.length-1;o>=0;--o){var c=e.charCodeAt(o);if(47===c){if(!l){n=o+1;break}}else-1===a&&(l=!1,a=o+1),u>=0&&(c===t.charCodeAt(u)?-1==--u&&(r=o):(u=-1,r=a))}return n===r?r=a:-1===r&&(r=e.length),e.slice(n,r)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!l){n=o+1;break}}else-1===r&&(l=!1,r=o+1);return-1===r?"":e.slice(n,r)},extname:function(e){Oe(e);for(var t=-1,o=0,n=-1,r=!0,l=0,u=e.length-1;u>=0;--u){var a=e.charCodeAt(u);if(47!==a)-1===n&&(r=!1,n=u+1),46===a?-1===t?t=u:1!==l&&(l=1):-1!==t&&(l=-1);else if(!r){o=u+1;break}}return-1===t||-1===n||0===l||1===l&&t===n-1&&t===o+1?"":e.slice(t,n)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,t){var o=t.dir||t.root,n=t.base||(t.name||"")+(t.ext||"");return o?o===t.root?o+n:o+e+n:n}("/",e)},parse:function(e){Oe(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;var o,n=e.charCodeAt(0),r=47===n;r?(t.root="/",o=1):o=0;for(var l=-1,u=0,a=-1,c=!0,i=e.length-1,s=0;i>=o;--i)if(47!==(n=e.charCodeAt(i)))-1===a&&(c=!1,a=i+1),46===n?-1===l?l=i:1!==s&&(s=1):-1!==l&&(s=-1);else if(!c){u=i+1;break}return-1===l||-1===a||0===s||1===s&&l===a-1&&l===u+1?-1!==a&&(t.base=t.name=0===u&&r?e.slice(1,a):e.slice(u,a)):(0===u&&r?(t.name=e.slice(1,l),t.base=e.slice(1,a)):(t.name=e.slice(u,l),t.base=e.slice(u,a)),t.ext=e.slice(l,a)),u>0?t.dir=e.slice(0,u-1):r&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};Ue.posix=Ue;const je=Ue,We={key:2},He=n(Vue.defineComponent({__name:"SidebarItem",props:{item:{type:Object,required:!0},isCollapse:{type:Boolean,default:!1},isFirstLevel:{type:Boolean,default:!0},basePath:{type:String,default:""}},setup(e){const t=e,o=Vue.computed((()=>t.item.meta&&t.item.meta.alwaysShow)),n=Vue.computed((()=>{if(t.item.children){return t.item.children.filter((e=>!(e.meta&&e.meta.hidden))).length}return 0})),r=Vue.computed((()=>{if(n.value>1)return null;if(t.item.children)for(const e of t.item.children)if(!e.meta||!e.meta.hidden)return e;return{...t.item,path:""}})),l=e=>De(e)?e:De(t.basePath)?t.basePath:je.resolve(t.basePath,e);return(e,n)=>{var u;const a=Vue.resolveComponent("svg-icon"),c=Vue.resolveComponent("el-menu-item"),i=Vue.resolveComponent("sidebar-item",!0),s=Vue.resolveComponent("el-sub-menu");return(null==(u=t.item.meta)?void 0:u.hidden)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createElementBlock("div",{key:0,class:Vue.normalizeClass({"simple-mode":t.isCollapse,"first-level":t.isFirstLevel})},[Vue.unref(o)||!Vue.unref(r)||Vue.unref(r).children?(Vue.openBlock(),Vue.createBlock(s,{key:1,index:l(t.item.path),"popper-append-to-body":""},{title:Vue.withCtx((()=>[t.item.meta&&t.item.meta.svgIcon?(Vue.openBlock(),Vue.createBlock(a,{key:0,name:t.item.meta.svgIcon},null,8,["name"])):t.item.meta&&t.item.meta.elIcon?(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(t.item.meta.elIcon),{key:1,class:"el-icon"})):Vue.createCommentVNode("",!0),t.item.meta&&t.item.meta.title?(Vue.openBlock(),Vue.createElementBlock("span",We,Vue.toDisplayString(t.item.meta.title),1)):Vue.createCommentVNode("",!0)])),default:Vue.withCtx((()=>[t.item.children?(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,{key:0},Vue.renderList(t.item.children,(e=>(Vue.openBlock(),Vue.createBlock(i,{key:e.path,item:e,"is-collapse":t.isCollapse,"is-first-level":!1,"base-path":l(e.path)},null,8,["item","is-collapse","base-path"])))),128)):Vue.createCommentVNode("",!0)])),_:1},8,["index"])):(Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,{key:0},[Vue.unref(r).meta?(Vue.openBlock(),Vue.createBlock(ze,{key:0,to:l(Vue.unref(r).path)},{default:Vue.withCtx((()=>[Vue.createVNode(c,{index:l(Vue.unref(r).path)},Vue.createSlots({default:Vue.withCtx((()=>[Vue.unref(r).meta.svgIcon?(Vue.openBlock(),Vue.createBlock(a,{key:0,name:Vue.unref(r).meta.svgIcon},null,8,["name"])):Vue.unref(r).meta.elIcon?(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(Vue.unref(r).meta.elIcon),{key:1,class:"el-icon"})):Vue.createCommentVNode("",!0)])),_:2},[Vue.unref(r).meta.title?{name:"title",fn:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(Vue.unref(r).meta.title),1)])),key:"0"}:void 0]),1032,["index"])])),_:1},8,["to"])):Vue.createCommentVNode("",!0)],64))],2))}}}),[["__scopeId","data-v-b4c92fc0"]]),Xe=["src"],$e=["src"],Ge=n(Vue.defineComponent({__name:"SidebarLogo",props:{collapse:{type:Boolean,default:!0}},setup(e){const t=e;return(e,o)=>{const n=Vue.resolveComponent("router-link");return Vue.openBlock(),Vue.createElementBlock("div",{class:Vue.normalizeClass(["sidebar-logo-container",{collapse:t.collapse}])},[Vue.createVNode(Vue.Transition,{name:"sidebar-logo-fade"},{default:Vue.withCtx((()=>[t.collapse?(Vue.openBlock(),Vue.createBlock(n,{key:"collapse",to:"/"},{default:Vue.withCtx((()=>[Vue.createElementVNode("img",{src:"https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=575",class:"sidebar-logo"},null,8,Xe)])),_:1})):(Vue.openBlock(),Vue.createBlock(n,{key:"expand",to:"/"},{default:Vue.withCtx((()=>[Vue.createElementVNode("img",{src:"https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=575",class:"sidebar-logo-text"},null,8,$e)])),_:1}))])),_:1})],2)}}}),[["__scopeId","data-v-93358d7a"]]),Ye=n(Vue.defineComponent({__name:"index",setup(e){const t=k("--v3-sidebar-menu-bg-color"),o=k("--v3-sidebar-menu-text-color"),n=k("--v3-sidebar-menu-active-text-color"),r=VueRouter.useRoute(),l=g(),u=d(),a=A(),{showSidebarLogo:c}=Pinia.storeToRefs(a),i=Vue.computed((()=>{const{meta:e,path:t}=r;return(null==e?void 0:e.activeMenu)?e.activeMenu:t})),s=Vue.computed((()=>!l.sidebar.opened));return(e,r)=>{const l=Vue.resolveComponent("el-menu"),a=Vue.resolveComponent("el-scrollbar");return Vue.openBlock(),Vue.createElementBlock("div",{class:Vue.normalizeClass({"has-logo":Vue.unref(c)})},[Vue.unref(c)?(Vue.openBlock(),Vue.createBlock(Ge,{key:0,collapse:Vue.unref(s)},null,8,["collapse"])):Vue.createCommentVNode("",!0),Vue.createVNode(a,{"wrap-class":"scrollbar-wrapper"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{"default-active":Vue.unref(i),collapse:Vue.unref(s),"background-color":Vue.unref(t),"text-color":Vue.unref(o),"active-text-color":Vue.unref(n),"unique-opened":!0,"collapse-transition":!1,mode:"vertical"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(u).routes,(e=>(Vue.openBlock(),Vue.createBlock(He,{key:e.path,item:e,"base-path":e.path,"is-collapse":Vue.unref(s)},null,8,["item","base-path","is-collapse"])))),128))])),_:1},8,["default-active","collapse","background-color","text-color","active-text-color"])])),_:1})],2)}}}),[["__scopeId","data-v-fce96b3e"]]),Je={class:"scroll-container"},Ke=n(Vue.defineComponent({__name:"ScrollPane",setup(e){const t=A(),o=Vue.ref(),n=Vue.ref();let r=0;const l=({scrollLeft:e})=>{r=e},u=({deltaY:e})=>{/^-/.test(e.toString())?a("left"):a("right")},a=e=>{let t=0;const l=n.value.clientWidth,u=o.value.wrapRef.clientWidth,a=l-u-r;u>l||(t="left"===e?Math.max(0,r-200):Math.min(r+200,r+a),o.value.setScrollLeft(t))},c=Vue.computed((()=>t.showScreenfull));return(e,t)=>{const r=Vue.resolveComponent("el-icon");return Vue.openBlock(),Vue.createElementBlock("div",Je,[Vue.createVNode(r,{class:"arrow left",onClick:t[0]||(t[0]=e=>a("left"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(V))])),_:1}),Vue.createVNode(Vue.unref(ElementPlus.ElScrollbar),{ref_key:"scrollbarRef",ref:o,onWheel:Vue.withModifiers(u,["prevent"]),onScroll:l},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",{ref_key:"scrollbarContentRef",ref:n,class:"scrollbar-content"},[Vue.renderSlot(e.$slots,"default",{},void 0,!0)],512)])),_:3},8,["onWheel"]),Vue.createVNode(r,{class:"arrow right",onClick:t[1]||(t[1]=e=>a("right"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(m))])),_:1}),Vue.unref(c)?(Vue.openBlock(),Vue.createBlock(H,{key:0,element:".app-main",openTips:"内容区全屏",class:"screenfull"})):Vue.createCommentVNode("",!0)])}}}),[["__scopeId","data-v-e04d1925"]]),Ze={class:"tags-view-container"},Qe=n(Vue.defineComponent({__name:"index",setup(e){const t=Vue.getCurrentInstance(),n=VueRouter.useRouter(),r=VueRouter.useRoute(),l=o(),u=d(),a=Vue.ref(!1),c=Vue.ref(0),i=Vue.ref(0),s=Vue.ref({});let V=[];const m=e=>e.path===r.path,f=e=>{var t;return null==(t=e.meta)?void 0:t.affix},h=(e,t="/")=>{let o=[];return e.forEach((e=>{var n;if(null==(n=e.meta)?void 0:n.affix){const n=je.resolve(t,e.path);o.push({fullPath:n,path:n,name:e.name,meta:{...e.meta}})}if(e.children){const t=h(e.children,e.path);t.length>=1&&(o=o.concat(t))}})),o},v=()=>{r.name&&(l.addVisitedView(r),l.addCachedView(r))},k=e=>{l.delVisitedView(e),l.delCachedView(e),m(e)&&g(l.visitedViews,e)},w=()=>{s.value.fullPath!==r.path&&void 0!==s.value.fullPath&&n.push(s.value.fullPath),l.delOthersVisitedViews(s.value),l.delOthersCachedViews(s.value)},g=(e,t)=>{const o=e.slice(-1)[0];void 0!==o&&void 0!==o.fullPath?n.push(o.fullPath):"Dashboard"===t.name?n.push({path:"/redirect"+t.path,query:t.query}):n.push("/")},C=()=>{a.value=!1};return Vue.watch(r,(()=>{v()}),{deep:!0}),Vue.watch(a,(e=>{e?document.body.addEventListener("click",C):document.body.removeEventListener("click",C)})),Vue.onMounted((()=>{(()=>{V=h(u.routes);for(const e of V)e.name&&l.addVisitedView(e)})(),v()})),(e,o)=>{const u=Vue.resolveComponent("el-icon"),d=Vue.resolveComponent("router-link");return Vue.openBlock(),Vue.createElementBlock("div",Ze,[Vue.createVNode(Ke,{class:"tags-view-wrapper"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(l).visitedViews,(e=>(Vue.openBlock(),Vue.createBlock(d,{key:e.path,class:Vue.normalizeClass([m(e)?"active":"","tags-view-item"]),to:{path:e.path,query:e.query},onMouseup:Vue.withModifiers((t=>f(e)?"":k(e)),["middle"]),onContextmenu:Vue.withModifiers((o=>((e,o)=>{const n=t.proxy.$el.getBoundingClientRect().left,r=t.proxy.$el.offsetWidth-105,l=o.clientX-n+15;i.value=l>r?r:l,c.value=o.clientY,a.value=!0,s.value=e})(e,o)),["prevent"])},{default:Vue.withCtx((()=>{var t;return[Vue.createTextVNode(Vue.toDisplayString(null==(t=e.meta)?void 0:t.title)+" ",1),f(e)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createBlock(u,{key:0,size:12,onClick:Vue.withModifiers((t=>k(e)),["prevent","stop"])},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(p))])),_:2},1032,["onClick"]))]})),_:2},1032,["class","to","onMouseup","onContextmenu"])))),128))])),_:1}),Vue.withDirectives(Vue.createElementVNode("ul",{style:Vue.normalizeStyle({left:i.value+"px",top:c.value+"px"}),class:"contextmenu"},[Vue.createElementVNode("li",{onClick:o[0]||(o[0]=e=>{return t=s.value,l.delCachedView(t),void n.replace({path:"/redirect"+t.path,query:t.query});var t})},"刷新"),f(s.value)?Vue.createCommentVNode("",!0):(Vue.openBlock(),Vue.createElementBlock("li",{key:0,onClick:o[1]||(o[1]=e=>k(s.value))},"关闭")),Vue.createElementVNode("li",{onClick:w},"关闭其它"),Vue.createElementVNode("li",{onClick:o[2]||(o[2]=e=>{return t=s.value,l.delAllVisitedViews(),l.delAllCachedViews(),void(V.some((e=>e.path===r.path))||g(l.visitedViews,t));var t})},"关闭所有")],4),[[Vue.vShow,a.value]])])}}}),[["__scopeId","data-v-3554ee3e"]]),et=n(Vue.defineComponent({__name:"index",props:{buttonTop:{type:Number,default:350}},setup(e){const t=e;Vue.useCssVars((e=>({"745b2616":o})));const o=t.buttonTop+"px",n=Vue.ref(!1);return(e,t)=>{const o=Vue.resolveComponent("el-icon"),r=Vue.resolveComponent("el-drawer");return Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[Vue.createElementVNode("div",{class:"handle-button",onClick:t[0]||(t[0]=e=>n.value=!0)},[Vue.createVNode(o,{size:24},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(f))])),_:1})]),Vue.createVNode(r,{modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=e=>n.value=e),size:"300px","with-header":!1},{default:Vue.withCtx((()=>[Vue.renderSlot(e.$slots,"default",{},void 0,!0)])),_:3},8,["modelValue"])],64)}}}),[["__scopeId","data-v-ec07ff71"]]),tt=n(Vue.defineComponent({__name:"index",setup(e){const t=g(),o=A();(()=>{const e=VueRouter.useRoute(),t=g(),o=()=>document.body.getBoundingClientRect().width-1<992,n=()=>{if(!document.hidden){const e=o();t.toggleDevice(e?w.Mobile:w.Desktop),e&&t.closeSidebar(!0)}};Vue.watch((()=>e.name),(()=>{t.device===w.Mobile&&t.sidebar.opened&&t.closeSidebar(!1)})),Vue.onBeforeMount((()=>{window.addEventListener("resize",n)})),Vue.onMounted((()=>{o()&&(t.toggleDevice(w.Mobile),t.closeSidebar(!0))})),Vue.onBeforeUnmount((()=>{window.removeEventListener("resize",n)}))})();const n=Vue.computed((()=>({hideSidebar:!t.sidebar.opened,openSidebar:t.sidebar.opened,withoutAnimation:t.sidebar.withoutAnimation,mobile:t.device===w.Mobile,showGreyMode:a.value,showColorWeakness:c.value}))),r=Vue.computed((()=>o.showSettings)),l=Vue.computed((()=>o.showTagsView)),u=Vue.computed((()=>o.fixedHeader)),a=Vue.computed((()=>o.showGreyMode)),c=Vue.computed((()=>o.showColorWeakness)),i=()=>{t.closeSidebar(!1)};return(e,t)=>(Vue.openBlock(),Vue.createElementBlock("div",{class:Vue.normalizeClass([Vue.unref(n),"app-wrapper"])},[Vue.unref(n).mobile&&Vue.unref(n).openSidebar?(Vue.openBlock(),Vue.createElementBlock("div",{key:0,class:"drawer-bg",onClick:i})):Vue.createCommentVNode("",!0),Vue.createVNode(Vue.unref(Ye),{class:"sidebar-container"}),Vue.createElementVNode("div",{class:Vue.normalizeClass([{hasTagsView:Vue.unref(l)},"main-container"])},[Vue.createElementVNode("div",{class:Vue.normalizeClass({"fixed-header":Vue.unref(u)})},[Vue.createVNode(Vue.unref(he)),Vue.unref(l)?(Vue.openBlock(),Vue.createBlock(Vue.unref(Qe),{key:0})):Vue.createCommentVNode("",!0)],2),Vue.createVNode(Vue.unref(I)),Vue.unref(r)?(Vue.openBlock(),Vue.createBlock(Vue.unref(et),{key:0},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(Fe))])),_:1})):Vue.createCommentVNode("",!0)],2)],2))}}),[["__scopeId","data-v-e0925bb6"]]);export{tt as default};
