(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56363c19"],{"04d1":function(t,e,a){var n=a("342f"),r=n.match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},"0a97":function(t,e,a){"use strict";a.d(e,"a",(function(){return c})),a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return u}));var n,r,i,o=a("8785"),s=a("5184"),c=Object(s["a"])(n||(n=Object(o["a"])(["\n  mutation createTag($customTagInput: customTagCreateInput!) {\n    createCustomTag(customTagInput: $customTagInput) {\n      id\n      name\n      color\n      order\n    }\n  }\n"]))),l=Object(s["a"])(r||(r=Object(o["a"])(["\n  mutation updateTag($customTagInput: customTagUpdateInput!) {\n    updateCustomTag(customTagInput: $customTagInput) {\n      id\n      name\n      color\n      order\n    }\n  }\n"]))),u=Object(s["a"])(i||(i=Object(o["a"])(["\n  mutation deleteTag($customTagId: ID!) {\n    deleteCustomTag(customTagId: $customTagId) {\n      id\n    }\n  }\n"])))},"0cb2":function(t,e,a){var n=a("7b0b"),r=Math.floor,i="".replace,o=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,s=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,a,c,l,u){var d=a+t.length,f=c.length,m=s;return void 0!==l&&(l=n(l),m=o),i.call(u,m,(function(n,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,a);case"'":return e.slice(d);case"<":o=l[i.slice(1,-1)];break;default:var s=+i;if(0===s)return n;if(s>f){var u=r(s/10);return 0===u?n:u<=f?void 0===c[u-1]?i.charAt(1):c[u-1]+i.charAt(1):n}o=c[s-1]}return void 0===o?"":o}))}},2532:function(t,e,a){"use strict";var n=a("23e7"),r=a("5a34"),i=a("1d80"),o=a("ab13");n({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(i(this)).indexOf(r(t),arguments.length>1?arguments[1]:void 0)}})},3398:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var n=a("3835"),r=(a("caad"),a("2532"),a("d81d"),a("ac1f"),a("466d"),a("5319"),{methods:{getBestColor:function(t){if(t&&t.includes("#")){var e=t.replace("#","").match(/.{1,2}/g).map((function(t){return parseInt(t,16)})),a=Object(n["a"])(e,3),r=a[0],i=a[1],o=a[2],s=Math.sqrt(r*r*.299+i*i*.587+o*o*.114);return s>135?"dark":"white"}return""}}})},"466d":function(t,e,a){"use strict";var n=a("d784"),r=a("825a"),i=a("50c4"),o=a("1d80"),s=a("8aa5"),c=a("14c3");n("match",(function(t,e,a){return[function(e){var a=o(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,this,t);if(n.done)return n.value;var o=r(this),l=String(t);if(!o.global)return c(o,l);var u=o.unicode;o.lastIndex=0;var d,f=[],m=0;while(null!==(d=c(o,l))){var v=String(d[0]);f[m]=v,""===v&&(o.lastIndex=s(l,i(o.lastIndex),u)),m++}return 0===m?null:f}]}))},"4e62":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var n,r=a("8785"),i=a("5184"),o=Object(i["a"])(n||(n=Object(r["a"])(["\n  query getTags($filters: FilterCustomTags) {\n    customTags(filters: $filters) {\n      id\n      name\n      color\n      order\n    }\n  }\n"])))},"4e827":function(t,e,a){"use strict";var n=a("23e7"),r=a("1c0b"),i=a("7b0b"),o=a("50c4"),s=a("d039"),c=a("addb"),l=a("a640"),u=a("04d1"),d=a("d998"),f=a("2d00"),m=a("512c"),v=[],g=v.sort,p=s((function(){v.sort(void 0)})),h=s((function(){v.sort(null)})),b=l("sort"),T=!s((function(){if(f)return f<70;if(!(u&&u>3)){if(d)return!0;if(m)return m<603;var t,e,a,n,r="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:a=3;break;case 68:case 71:a=4;break;default:a=2}for(n=0;n<47;n++)v.push({k:e+n,v:a})}for(v.sort((function(t,e){return e.v-t.v})),n=0;n<v.length;n++)e=v[n].k.charAt(0),r.charAt(r.length-1)!==e&&(r+=e);return"DGBEFHACIJK"!==r}})),y=p||!h||!b||!T,x=function(t){return function(e,a){return void 0===a?-1:void 0===e?1:void 0!==t?+t(e,a)||0:String(e)>String(a)?1:-1}};n({target:"Array",proto:!0,forced:y},{sort:function(t){void 0!==t&&r(t);var e=i(this);if(T)return void 0===t?g.call(e):g.call(e,t);var a,n,s=[],l=o(e.length);for(n=0;n<l;n++)n in e&&s.push(e[n]);s=c(s,x(t)),a=s.length,n=0;while(n<a)e[n]=s[n++];while(n<l)delete e[n++];return e}})},"512c":function(t,e,a){var n=a("342f"),r=n.match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},"51ab":function(t,e,a){"use strict";a("e23d")},5319:function(t,e,a){"use strict";var n=a("d784"),r=a("d039"),i=a("825a"),o=a("50c4"),s=a("a691"),c=a("1d80"),l=a("8aa5"),u=a("0cb2"),d=a("14c3"),f=a("b622"),m=f("replace"),v=Math.max,g=Math.min,p=function(t){return void 0===t?t:String(t)},h=function(){return"$0"==="a".replace(/./,"$0")}(),b=function(){return!!/./[m]&&""===/./[m]("a","$0")}(),T=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));n("replace",(function(t,e,a){var n=b?"$":"$0";return[function(t,a){var n=c(this),r=void 0==t?void 0:t[m];return void 0!==r?r.call(t,n,a):e.call(String(n),t,a)},function(t,r){if("string"===typeof r&&-1===r.indexOf(n)&&-1===r.indexOf("$<")){var c=a(e,this,t,r);if(c.done)return c.value}var f=i(this),m=String(t),h="function"===typeof r;h||(r=String(r));var b=f.global;if(b){var T=f.unicode;f.lastIndex=0}var y=[];while(1){var x=d(f,m);if(null===x)break;if(y.push(x),!b)break;var C=String(x[0]);""===C&&(f.lastIndex=l(m,o(f.lastIndex),T))}for(var O="",E=0,k=0;k<y.length;k++){x=y[k];for(var I=String(x[0]),S=v(g(s(x.index),m.length),0),$=[],_=1;_<x.length;_++)$.push(p(x[_]));var w=x.groups;if(h){var L=[I].concat($,S,m);void 0!==w&&L.push(w);var H=String(r.apply(void 0,L))}else H=u(I,m,S,$,w,r);S>=E&&(O+=m.slice(E,S)+H,E=S+I.length)}return O+m.slice(E)}]}),!T||!h||b)},"5a34":function(t,e,a){var n=a("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},a2b6:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("3835"),a("4e827"),a("ac1f"),a("1276");var n=function(t){var e=t.listItems,a=void 0===e?[]:e,n=t.orderBy,r=void 0===n?"ASC":n,i=t.nextElement,o=void 0===i?"none":i;return a.sort((function(t,e){var a="none"===o?t-e:t[o]-e[o],n="none"===o?e-t:e[o]-t[o];return"ASC"===r?a:n}))}},ab13:function(t,e,a){var n=a("b622"),r=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[r]=!1,"/./"[t](e)}catch(n){}}return!1}},addb:function(t,e){var a=Math.floor,n=function(t,e){var o=t.length,s=a(o/2);return o<8?r(t,e):i(n(t.slice(0,s),e),n(t.slice(s),e),e)},r=function(t,e){var a,n,r=t.length,i=1;while(i<r){n=i,a=t[i];while(n&&e(t[n-1],a)>0)t[n]=t[--n];n!==i++&&(t[n]=a)}return t},i=function(t,e,a){var n=t.length,r=e.length,i=0,o=0,s=[];while(i<n||o<r)i<n&&o<r?s.push(a(t[i],e[o])<=0?t[i++]:e[o++]):s.push(i<n?t[i++]:e[o++]);return s};t.exports=n},be21:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{staticClass:"mt-1 mb-2 d-flex align-center justify-space-between primary",attrs:{height:"4em"}},[a("span",{staticClass:"white--text pl-8 title-tags"},[t._v(" Configuración de etiquetas ")]),a("v-menu",{attrs:{"offset-y":"",ransition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-btn",t._g({staticClass:"mr-10",attrs:{disabled:t.customTags.length>=10,small:"",color:"secondary",fab:"",depressed:""}},n),[a("v-icon",{attrs:{dark:""}},[t._v("mdi-plus")])],1)]}}])},[a("v-list",[a("v-list-item",{on:{click:function(e){return t.modalHandlerTag({isOpen:!0,isEdit:!1,isLoading:!1,info:{}})}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-tag-outline")]),t._v(" Añadir etiqueta ")],1)],1)],1)],1),a("div",{staticClass:"d-flex"},[a("v-card",{staticClass:"mr-1",attrs:{tile:"",width:"11.5em",outlined:""}},[a("div",{staticClass:"d-flex justify-center header-tags-box py-1"},[a("span",[t._v("Etiquetas")])]),a("v-divider"),a("v-list",{attrs:{flat:""}},[a("v-list-item-group",{attrs:{color:"secondary"}},[a("v-list-item",{attrs:{exact:"",to:"/settings/enterprise/tags/contacts"}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-account-tie")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Contactos")])],1)],1),a("v-list-item",{attrs:{exact:"",to:"/settings/enterprise/tags/companies"}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-domain")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Empresas")])],1)],1),a("v-list-item",{attrs:{exact:"",to:"/settings/enterprise/tags/deals"}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-handshake-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Tratos")])],1)],1)],1)],1)],1),a("v-card",{attrs:{tile:"",width:"23em",outlined:"",height:"25em"}},[a("div",{staticClass:"d-flex justify-center py-1 header-tags-box"},[a("span",{staticClass:"mr-12"},[t._v("Etiquetas de "+t._s(t.sectionSelected.name))]),a("span",[t._v(t._s(t.customTags.length)+"/10")])]),a("v-divider"),a("v-progress-linear",{attrs:{active:t.$apollo.queries.customTags.loading,indeterminate:t.$apollo.queries.customTags.loading,height:"6",absolute:"",color:"primary"}}),t.isErrorGetTags?a("BaseErrorComponent",{attrs:{info:t.infoError}}):t._e(),a("v-card",{staticClass:"scroll",attrs:{flat:"",height:"90%",disabled:t.$apollo.queries.customTags.loading}},[a("v-list",t._l(t.customTags,(function(e,n){return a("div",{key:n,staticClass:"d-flex justify-space-between pa-4"},[a("div",[a("v-chip",{attrs:{small:"",color:e.color,"text-color":t.getBestColor(e.color)}},[a("v-avatar",{attrs:{left:""}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-tag")])],1),t._v(" "+t._s(e.name)+" ")],1)],1),a("div",{staticClass:"d-flex mt-1"},[a("v-btn",{staticClass:"mr-1",attrs:{"x-small":"",color:"secondary"},on:{click:function(a){return a.stopPropagation(),t.modalHandlerTag({isOpen:!0,isLoading:!1,isEdit:!0,info:e})}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-pencil")])],1),a("v-btn",{staticClass:"align-right",attrs:{"x-small":"",outlined:""},on:{click:function(a){return a.stopPropagation(),t.deleteTagConfirmation(e.id)}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)])})),0)],1)],1)],1),a("ModalTag",{attrs:{modalHandler:t.modalTag},on:{close:t.modalHandlerTag,outData:t.createOrEditTag}}),a("BaseModalDelete",{attrs:{modalHandler:t.modalDelete},on:{cancel:t.modalHandlerDelete,confirm:t.deleteTag}}),a("BaseModalError",{attrs:{modalHandler:t.modalError},on:{close:t.modalHandlerError}}),a("v-snackbar",{attrs:{color:t.snackbar.color,timeout:5e3},scopedSlots:t._u([{key:"action",fn:function(){return[a("v-btn",{attrs:{text:""},on:{click:function(e){return t.snackbarHandler({isOpen:!1,color:"",text:""})}}},[t._v(" Cerrar ")])]},proxy:!0}]),model:{value:t.snackbar.isOpen,callback:function(e){t.$set(t.snackbar,"isOpen",e)},expression:"snackbar.isOpen"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},r=[],i=(a("d3b7"),a("3ca3"),a("ddb0"),a("4de4"),a("b0c0"),a("3398")),o=a("1e6d"),s=a("4e62"),c=a("0a97"),l=a("a2b6"),u=a("4420"),d={mixins:[i["a"],o["a"],u["a"]],components:{ModalTag:function(){return Promise.all([a.e("chunk-5b13cade"),a.e("chunk-2d0e51c0")]).then(a.bind(null,"92a2"))}},data:function(){return{customTags:[],modalTag:{isOpen:!1,isEdit:!1,isLoading:!1,info:{}},sectionSelected:{name:"Contacto",type:"CONTACT"},isErrorGetTags:!1,infoError:{icon:"",title:"",message:""}}},computed:{isResponsive:function(){return this.$vuetify.breakpoint.md}},watch:{$route:{handler:function(t){"contacts"===t.params.section&&(this.sectionSelected={type:"CONTACT",name:"contactos"}),"companies"===t.params.section&&(this.sectionSelected={type:"COMPANY",name:"empresas"}),"deals"===t.params.section&&(this.sectionSelected={type:"DEAL",name:"tratos"})},immediate:!0}},methods:{deleteTagConfirmation:function(t){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"La etiqueta",text:"será eliminada de forma permanente"},infoDelete:{id:t}})},modalHandlerTag:function(t){var e=t.isOpen,a=t.isEdit,n=t.isLoading,r=t.info;this.modalTag={isOpen:e,isEdit:a,isLoading:n,info:r}},formatTags:function(t){var e=Object(l["a"])({listItems:t,orderBy:"ASC",nextElement:"order"});return e},deleteTag:function(t){var e=this,a=t.isOpen,n=t.isLoading,r=t.message,i=t.infoDelete;this.modalHandlerDelete({isOpen:a,isLoading:n,message:r,infoDelete:i}),this.$apollo.mutate({mutation:c["b"],variables:{customTagId:i.id},update:function(t,a){var n=a.data.deleteCustomTag,r=t.readQuery({query:s["a"],variables:{filters:{type:e.sectionSelected.type}}});r.customTags=r.customTags.filter((function(t){var e=t.id;return e!==n.id})),t.writeQuery({query:s["a"],variables:{filters:{type:e.sectionSelected.type}},data:r})}}).then((function(){e.modalHandlerDelete({isOpen:!1,isLoading:n,message:r,infoDelete:i}),e.snackbarHandler({isOpen:!0,color:"success",text:"La etiqueta se eliminó correctamente"})})).catch((function(){var t="No se pudo eliminar la etiqueta, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:t})}))},countTags:function(){return this.customTags.length},createOrEditTag:function(t){var e=this,a=t.isOpen,n=t.isLoading,r=t.isEdit,i=t.info;this.modalHandlerTag({isOpen:a,isLoading:n,isEdit:r,info:i}),r?this.$apollo.mutate({mutation:c["c"],variables:{customTagInput:{id:i.id,name:i.name,color:i.color,order:i.order,type:this.sectionSelected.type}}}).then((function(){e.modalHandlerTag({isOpen:!1,isLoading:!1,isEdit:!1,info:{}}),e.snackbarHandler({isOpen:!0,color:"success",text:"La etiqueta se actualizó correctamente"})})).catch((function(){var t="No se pudo actualizar la etiqueta, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:t})})):this.$apollo.mutate({mutation:c["a"],variables:{customTagInput:{name:i.name,color:i.color,order:this.countTags()+1,type:this.sectionSelected.type}},update:function(t,a){var n=a.data.createCustomTag,r=t.readQuery({query:s["a"],variables:{filters:{type:e.sectionSelected.type}}});r.customTags.push(n),t.writeQuery({query:s["a"],variables:{filters:{type:e.sectionSelected.type}},data:r})}}).then((function(){e.modalHandlerTag({isOpen:!1,isLoading:!1,isEdit:!1,info:{}}),e.snackbarHandler({isOpen:!0,color:"success",text:"La etiqueta se creó correctamente"})})).catch((function(){var t="No se pudo crear la etiqueta, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:t})}))}},apollo:{customTags:{query:s["a"],variables:function(){return{filters:{type:this.sectionSelected.type}}},error:function(t){var e,a=t.graphQLErrors;this.isErrorGetTags=!0,this.infoError={icon:"mdi-alert-outline",title:"Error ".concat(null===(e=a[0])||void 0===e?void 0:e.statusCode),message:"No se logró cargar las etiquetas, contacte con soporte"}}}}},f=d,m=(a("51ab"),a("0c7c")),v=a("6544"),g=a.n(v),p=a("8212"),h=a("8336"),b=a("b0af"),T=a("cc20"),y=a("ce7e"),x=a("132d"),C=a("8860"),O=a("da13"),E=a("5d23"),k=a("1baa"),I=a("34c3"),S=a("e449"),$=a("8e36"),_=a("2db4"),w=Object(m["a"])(f,n,r,!1,null,"a4df0d20",null);e["default"]=w.exports;g()(w,{VAvatar:p["a"],VBtn:h["a"],VCard:b["a"],VChip:T["a"],VDivider:y["a"],VIcon:x["a"],VList:C["a"],VListItem:O["a"],VListItemContent:E["a"],VListItemGroup:k["a"],VListItemIcon:I["a"],VListItemTitle:E["c"],VMenu:S["a"],VProgressLinear:$["a"],VSnackbar:_["a"]})},caad:function(t,e,a){"use strict";var n=a("23e7"),r=a("4d64").includes,i=a("44d2");n({target:"Array",proto:!0},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},d998:function(t,e,a){var n=a("342f");t.exports=/MSIE|Trident/.test(n)},e23d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-56363c19.7c962827.js.map