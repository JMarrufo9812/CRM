(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38ea9f6c","chunk-7859f8ee","chunk-7859f8ee"],{"0cb2":function(t,e,a){var n=a("7b0b"),i=Math.floor,r="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,o=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,a,c,l,u){var d=a+t.length,p=c.length,m=o;return void 0!==l&&(l=n(l),m=s),r.call(u,m,(function(n,r){var s;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,a);case"'":return e.slice(d);case"<":s=l[r.slice(1,-1)];break;default:var o=+r;if(0===o)return n;if(o>p){var u=i(o/10);return 0===u?n:u<=p?void 0===c[u-1]?r.charAt(1):c[u-1]+r.charAt(1):n}s=c[o-1]}return void 0===s?"":s}))}},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},2532:function(t,e,a){"use strict";var n=a("23e7"),i=a("5a34"),r=a("1d80"),s=a("ab13");n({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(r(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},3398:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var n=a("3835"),i=(a("caad"),a("2532"),a("d81d"),a("ac1f"),a("466d"),a("5319"),{methods:{getBestColor:function(t){if(t&&t.includes("#")){var e=t.replace("#","").match(/.{1,2}/g).map((function(t){return parseInt(t,16)})),a=Object(n["a"])(e,3),i=a[0],r=a[1],s=a[2],o=Math.sqrt(i*i*.299+r*r*.587+s*s*.114);return o>135?"dark":"white"}return""}}})},"466d":function(t,e,a){"use strict";var n=a("d784"),i=a("825a"),r=a("50c4"),s=a("1d80"),o=a("8aa5"),c=a("14c3");n("match",(function(t,e,a){return[function(e){var a=s(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,this,t);if(n.done)return n.value;var s=i(this),l=String(t);if(!s.global)return c(s,l);var u=s.unicode;s.lastIndex=0;var d,p=[],m=0;while(null!==(d=c(s,l))){var f=String(d[0]);p[m]=f,""===f&&(s.lastIndex=o(l,r(s.lastIndex),u)),m++}return 0===m?null:p}]}))},"4db2":function(t,e,a){"use strict";a("7a76")},5319:function(t,e,a){"use strict";var n=a("d784"),i=a("d039"),r=a("825a"),s=a("50c4"),o=a("a691"),c=a("1d80"),l=a("8aa5"),u=a("0cb2"),d=a("14c3"),p=a("b622"),m=p("replace"),f=Math.max,v=Math.min,h=function(t){return void 0===t?t:String(t)},g=function(){return"$0"==="a".replace(/./,"$0")}(),_=function(){return!!/./[m]&&""===/./[m]("a","$0")}(),y=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));n("replace",(function(t,e,a){var n=_?"$":"$0";return[function(t,a){var n=c(this),i=void 0==t?void 0:t[m];return void 0!==i?i.call(t,n,a):e.call(String(n),t,a)},function(t,i){if("string"===typeof i&&-1===i.indexOf(n)&&-1===i.indexOf("$<")){var c=a(e,this,t,i);if(c.done)return c.value}var p=r(this),m=String(t),g="function"===typeof i;g||(i=String(i));var _=p.global;if(_){var y=p.unicode;p.lastIndex=0}var b=[];while(1){var C=d(p,m);if(null===C)break;if(b.push(C),!_)break;var x=String(C[0]);""===x&&(p.lastIndex=l(m,s(p.lastIndex),y))}for(var k="",w=0,S=0;S<b.length;S++){C=b[S];for(var $=String(C[0]),P=f(v(o(C.index),m.length),0),I=[],B=1;B<C.length;B++)I.push(h(C[B]));var D=C.groups;if(g){var E=[$].concat(I,P,m);void 0!==D&&E.push(D);var O=String(i.apply(void 0,E))}else O=u($,m,P,I,D,i);P>=w&&(k+=m.slice(w,P)+O,w=P+$.length)}return k+m.slice(w)}]}),!y||!g||_)},"5a34":function(t,e,a){var n=a("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},"7a76":function(t,e,a){},"841c":function(t,e,a){"use strict";var n=a("d784"),i=a("825a"),r=a("1d80"),s=a("129f"),o=a("14c3");n("search",(function(t,e,a){return[function(e){var a=r(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,this,t);if(n.done)return n.value;var r=i(this),c=String(t),l=r.lastIndex;s(l,0)||(r.lastIndex=0);var u=o(r,c);return s(r.lastIndex,l)||(r.lastIndex=l),null===u?-1:u.index}]}))},8821:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"d-flex flex-row pb-10"},[t._t("top")],2),a("div",{staticClass:"data-table-container"},[a("v-card",{staticClass:"mx-12",attrs:{outlined:""}},[a("v-data-table",{staticClass:"companies-data-table",attrs:{headers:0!==t.totalCompanies?t.headers:[],items:t.listCompanies,"item-key":"id",options:t.options,"server-items-length":t.totalCompanies,loading:t.loading,"loading-text":"Cargando empresas...","show-select":"","hide-default-header":"","hide-default-footer":""},on:{"update:options":function(e){t.options=e},"click:row":t.clickRow},scopedSlots:t._u([{key:"no-data",fn:function(){return[a("BaseErrorComponent",{attrs:{info:t.infoError}})]},proxy:!0},{key:"header",fn:function(e){var n=e.props,i=e.on;return[0!==t.totalCompanies?a("thead",[a("draggable",{attrs:{group:{name:"headers",put:!0},animation:200,tag:"tr",draggable:".item"},on:{change:function(e){return t.ChangeHeaderOrder(n.headers)}},model:{value:n.headers,callback:function(e){t.$set(n,"headers",e)},expression:"props.headers"}},t._l(n.headers,(function(e,r){return a("th",{key:e.value,staticClass:"table-headers-interactive",class:0===r?"first":"item",style:0!==r?"min-width: 150px;":"min-width: 40px;"},[0===r?a("v-simple-checkbox",{staticClass:"my-4",attrs:{indeterminate:n.someItems&&!n.everyItem,dark:"","hide-details":"auto",color:"secondary"},on:{input:i["toggle-select-all"]},model:{value:n.everyItem,callback:function(e){t.$set(n,"everyItem",e)},expression:"props.everyItem"}}):t._e(),a("div",{staticClass:"d-flex justify-center"},[a("div",[t._v(" "+t._s(e.text)+" ")]),a("div",{staticClass:"ml-2"},[0!==r&&t.validateSort(e.value)?a("v-icon",{staticClass:"white--text",attrs:{"x-small":""},on:{click:function(t){return i["sort"](e.value)}}},[t._v(" "+t._s(n.options.sortBy[0]===e.value&&"boolean"===typeof n.options.sortDesc[0]?n.options.sortDesc[0]?"mdi-sort-ascending":"mdi-sort-descending":"mdi-sort")+" ")]):t._e()],1)])],1)})),0)],1):t._e()]}},{key:"item.name",fn:function(e){var n=e.item;return[a("span",{staticClass:"select-text-underline",on:{click:function(e){return e.stopPropagation(),t.goToProfile("company",n.id)}}},[t._v(" "+t._s(n.name)+" ")])]}},{key:"item.phones",fn:function(e){var n=e.item.phones,i=n[0],r=n.slice(1);return[a("span",[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v(" "+t._s(i?"mdi-phone":"")+" ")]),t._v(" "+t._s(i?i.number:"")+" "),a("v-tooltip",{attrs:{right:"",color:"white"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-chip",t._g(t._b({directives:[{name:"show",rawName:"v-show",value:r.length>0,expression:"phones.length > 0"}],staticClass:"ml-1 pa-1",attrs:{outlined:"","x-small":""}},"v-chip",i,!1),n),[a("v-icon",{attrs:{"x-small":""}},[t._v(" mdi-phone ")]),t._v(" + "+t._s(r.length)+" ")],1)]}}],null,!0)},[a("ul",{staticClass:"pl-2"},t._l(r,(function(e){return a("li",{key:e.number,staticClass:"black--text"},[a("v-icon",{attrs:{"x-small":""}},[t._v(" mdi-phone ")]),t._v(" "+t._s(e.number)+" ")],1)})),0)])],1)]}},{key:"item.owner",fn:function(e){var n=e.item;return[a("span",{class:n.owner?"":"red--text"},[a("v-icon",{class:n.owner?"":"red--text",attrs:{small:""}},[t._v(" "+t._s(n.owner?"mdi-account":"mdi-alert")+" ")]),t._v(" "+t._s(n.owner?n.owner.user.name:"Sin Propietario")+" ")],1)]}},{key:"item.contacts",fn:function(e){var n=e.item.contacts,i=n[0],r=n.slice(1);return[a("span",{staticClass:"select-text-underline",on:{click:function(e){return e.stopPropagation(),t.goToProfile("contact",i.id)}}},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v(" "+t._s(i?"mdi-account-tie":"")+" ")]),t._v(" "+t._s(i?i.name:"")+" ")],1),a("v-menu",{attrs:{"allow-overflow":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-tooltip",{attrs:{top:"",color:"white"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[a("v-chip",t._g(t._b({directives:[{name:"show",rawName:"v-show",value:r.length>0,expression:"contacts.length > 0"}],staticClass:"ml-1 pa-1",attrs:{outlined:"","x-small":""}},"v-chip",i,!1),Object.assign({},s,n)),[a("v-icon",{staticClass:"mr-1",attrs:{"x-small":""}},[t._v(" mdi-account-tie ")]),t._v(" + "+t._s(r.length)+" ")],1)]}}],null,!0)},[a("span",{staticClass:"black--text"},[t._v(" Esta empresa cuenta con más de un contacto has click para ver ")])])]}}],null,!0)},[a("v-list",t._l(r,(function(e,n){return a("v-list-item",{key:n,attrs:{dense:""},on:{click:function(a){return a.stopPropagation(),t.goToProfile("contact",e.id)}}},[a("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("mdi-account-tie")]),a("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1)]}},{key:"item.tags",fn:function(e){var n=e.item.tags,i=n[0],r=n.slice(1);return[a("v-chip",{attrs:{outlined:!i,small:"",color:i?i.color:"grey","text-color":i?t.getBestColor(i.color):""}},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v(" "+t._s(i?"mdi-tag":"mdi-tag-off")+" ")]),t._v(" "+t._s(i?i.name:"Sin etiqueta")+" ")],1),a("v-tooltip",{attrs:{color:"white",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-chip",t._g(t._b({directives:[{name:"show",rawName:"v-show",value:r.length>0,expression:"tags.length > 0"}],staticClass:"ml-1 pa-1",attrs:{outlined:"","x-small":""}},"v-chip",i,!1),n),[a("v-icon",{attrs:{small:""}},[t._v("mdi-tag-multiple")]),t._v(" + "+t._s(r.length)+" ")],1)]}}],null,!0)},[a("ul",{staticClass:"pa-0"},t._l(r,(function(e){return a("li",{key:e.id},[a("v-chip",{staticClass:"mb-2",attrs:{"text-color":t.getBestColor(e.color),color:e.color,small:""}},[a("v-icon",{staticClass:"mr-1",attrs:{"x-small":""}},[t._v(" mdi-tag ")]),t._v(" "+t._s(e.name)+" ")],1)],1)})),0)])]}},{key:"item.socialMedias",fn:function(e){var n=e.item.socialMedias;return t._l(n,(function(t,e){return a("FieldsValueSocialMedias",{key:e,attrs:{social:t}})}))}},{key:"item.createdAt",fn:function(e){var n=e.item;return[a("span",[t._v(t._s(t._f("timeZone")(n.createdAt,"lll")))])]}},{key:"item.updatedAt",fn:function(e){var n=e.item;return[a("span",[t._v(t._s(t._f("timeZone")(n.updatedAt,"lll")))])]}},{key:"item.createdBy",fn:function(e){var n=e.item;return[n.createdBy?a("span",[a("v-icon",{attrs:{small:""}},[t._v("mdi-account")]),t._v(" "+t._s(n.createdBy.user.name+n.createdBy.user.lastName)+" ")],1):t._e()]}}],null,!0),model:{value:t.companiesSelected,callback:function(e){t.companiesSelected=e},expression:"companiesSelected"}}),t.totalCompanies>10?a("v-data-footer",{attrs:{options:t.options,pagination:{page:t.options.page,pageStart:t.options.page*t.options.itemsPerPage-t.options.itemsPerPage,pageStop:t.options.itemsPerPage*t.options.page,itemsPerPage:t.options.itemsPerPage,itemsLength:t.totalCompanies},"items-per-page-options":[10,20,30,40,50]},on:{"update:options":function(e){t.options=e}}}):t._e()],1)],1)])},i=[],r=(a("d3b7"),a("3ca3"),a("ddb0"),a("b64b"),a("ac1f"),a("841c"),a("99af"),a("d81d"),a("159b"),a("a434"),a("b76a")),s=a.n(r),o=a("8b3e"),c=a("3398"),l={name:"CompaniesDataTable",mixins:[c["a"]],components:{BaseErrorComponent:function(){return a.e("chunk-2d0abe3b").then(a.bind(null,"16cc"))},FieldsValueSocialMedias:function(){return a.e("chunk-108cb691").then(a.bind(null,"807c"))},draggable:s.a},data:function(){return{infoError:{icon:"mdi-briefcase-search-outline",title:"",message:"No se encontraron compañias"},loading:!1,options:{},listCompanies:[],totalCompanies:0,filters:{search:"",orderBy:"desc",take:0,skip:0,sortBy:[],sortDesc:[],isDelete:!1},companiesSelected:[]}},props:{updateData:{type:Boolean,default:!1},headers:{type:[Object,Array]},searchCompany:{type:String}},watch:{options:{handler:function(t){this.filters.sortBy=t.sortBy,this.filters.sortDesc=t.sortDesc,-1===t.itemsPerPage?this.filters.take=this.totalCompanies:this.filters.take=t.itemsPerPage,this.filters.skip=(t.page-1)*t.itemsPerPage,this.getCompanies()},deep:!0},searchCompany:function(){Object.keys(this.searchCompany).length>=2&&(this.filters.search=this.searchCompany,this.getCompanies()),0===Object.keys(this.searchCompany).length&&(this.filters.search=this.searchCompany,this.getCompanies())},companiesSelected:function(){this.$emit("selectCompanies",this.companiesSelected)},updateData:function(t){t?this.getCompanies():this.companiesSelected=[]},$route:{handler:function(t){this.companiesSelected=[],t.query.filterId&&this.getCompanies(),t.query.recyclebin?(this.filters.isDelete=!0,this.getCompanies()):(this.filters.isDelete=!1,this.getCompanies())},immediate:!0}},methods:{validateSort:function(t){return"name"===t||"adress"===t||"website"===t||"createdAt"===t||"updatedAt"===t},clickRow:function(t){var e=t.id;this.$router.push("company/".concat(e),(function(){}))},goToProfile:function(t,e){this.$router.push("".concat(t,"/").concat(e),(function(){}))},getCompanies:function(){var t=this;this.loading=!0,this.$apollo.query({query:o["a"],fetchPolicy:"no-cache",variables:{filters:this.filters,importId:this.$route.query.filterId}}).then((function(e){var a=e.data.companies;t.$emit("companies",a.list),t.$emit("informationBar",a.informationBar),t.listCompanies=a.list.map((function(t){return t.customForms&&t.customForms.forEach((function(e){var a=e.id,n=e.value;t[a]=n})),t})),t.totalCompanies=a.count,t.loading=!1,t.$emit("endUpdateData")})).catch((function(e){var a,n=e.graphQLErrors;t.loading=!1,t.$emit("endUpdateData"),t.listCompanies=[],t.totalCompanies=0,t.infoError={icon:"mdi-alert-outline",title:"Error ".concat(null===(a=n[0])||void 0===a?void 0:a.statusCode),message:"No se ha podido cargar ninguna empresa"}}))},ChangeHeaderOrder:function(t){t.splice(0,1);var e=t.map((function(t){return{key:t.value,label:t.text,type:t.type}}));this.$emit("changeHeaderOrder",e)}}},u=l,d=(a("4db2"),a("0c7c")),p=a("6544"),m=a.n(p),f=a("b0af"),v=a("cc20"),h=a("f41f"),g=a("8fea"),_=a("132d"),y=a("8860"),b=a("da13"),C=a("5d23"),x=a("e449"),k=a("9e88"),w=a("3a2f"),S=Object(d["a"])(u,n,i,!1,null,"8fcbfbb8",null);e["default"]=S.exports;m()(S,{VCard:f["a"],VChip:v["a"],VDataFooter:h["a"],VDataTable:g["a"],VIcon:_["a"],VList:y["a"],VListItem:b["a"],VListItemTitle:C["c"],VMenu:x["a"],VSimpleCheckbox:k["a"],VTooltip:w["a"]})},ab13:function(t,e,a){var n=a("b622"),i=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[i]=!1,"/./"[t](e)}catch(n){}}return!1}},caad:function(t,e,a){"use strict";var n=a("23e7"),i=a("4d64").includes,r=a("44d2");n({target:"Array",proto:!0},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("includes")}}]);
//# sourceMappingURL=chunk-38ea9f6c.7200dc93.js.map