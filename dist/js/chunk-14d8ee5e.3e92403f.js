(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14d8ee5e"],{"0cb2":function(e,t,r){var n=r("7b0b"),i=Math.floor,a="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,u=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,c,o,l){var d=r+e.length,f=c.length,v=u;return void 0!==o&&(o=n(o),v=s),a.call(l,v,(function(n,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,r);case"'":return t.slice(d);case"<":s=o[a.slice(1,-1)];break;default:var u=+a;if(0===u)return n;if(u>f){var l=i(u/10);return 0===l?n:l<=f?void 0===c[l-1]?a.charAt(1):c[l-1]+a.charAt(1):n}s=c[u-1]}return void 0===s?"":s}))}},2532:function(e,t,r){"use strict";var n=r("23e7"),i=r("5a34"),a=r("1d80"),s=r("ab13");n({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~String(a(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},3398:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("3835"),i=(r("caad"),r("2532"),r("d81d"),r("ac1f"),r("466d"),r("5319"),{methods:{getBestColor:function(e){if(e&&e.includes("#")){var t=e.replace("#","").match(/.{1,2}/g).map((function(e){return parseInt(e,16)})),r=Object(n["a"])(t,3),i=r[0],a=r[1],s=r[2],u=Math.sqrt(i*i*.299+a*a*.587+s*s*.114);return u>135?"dark":"white"}return""}}})},3527:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-select",{class:[e.inputProps?e.inputProps.class:"",e.field.isRequired?"required":""],attrs:{"prepend-icon":e.field.icon,items:e.customTags,"item-value":function(e){return e.id},"item-text":function(e){return e.name},rules:e.field.isRequired?e.rules.isRequiredObject:[],label:e.field.label||"Etiquetas",dense:!!e.inputProps&&e.inputProps.isDense,"hide-details":"auto","hide-selected":"",outlined:""},scopedSlots:e._u([{key:"selection",fn:function(t){var n=t.item;return[r("v-chip",{attrs:{color:n.color,"text-color":e.getBestColor(n.color),small:!!e.inputProps&&e.inputProps.isDense}},[r("v-avatar",{attrs:{left:""}},[r("v-icon",{attrs:{"x-small":""}},[e._v("mdi-tag")])],1),r("span",[e._v(e._s(n.name))])],1)]}},{key:"item",fn:function(t){var n=t.item;return[r("v-chip",{attrs:{"text-color":e.getBestColor(n.color),color:n.color,small:!!e.inputProps&&e.inputProps.isDense}},[r("v-avatar",{attrs:{left:""}},[r("v-icon",{attrs:{small:""}},[e._v("mdi-tag")])],1),e._v(" "+e._s(n.name)+" ")],1)]}}]),model:{value:e.field.value,callback:function(t){e.$set(e.field,"value",t)},expression:"field.value"}})},i=[],a=r("4e62"),s=r("3398"),u=r("f82a"),c={name:"FieldSelectTag",mixins:[s["a"],u["a"]],props:{field:{type:Object,required:!0},inputProps:{type:Object,required:!1},resetHandler:{type:Boolean,default:!1},isScrolled:{type:Boolean,default:!1}},data:function(){return{tagsMenu:!1,filters:{type:""}}},created:function(){this.filters.type=this.field.typeTable},watch:{resetValues:function(e){e||this.resetValues()}},methods:{resetValues:function(){delete this.field.value,this.tagsMenu=!1,this.filters.type=""}},apollo:{customTags:{query:a["a"],variables:function(){return{filters:this.filters}}}}},o=c,l=r("0c7c"),d=r("6544"),f=r.n(d),v=r("8212"),p=r("cc20"),h=r("132d"),g=r("b974"),m=Object(l["a"])(o,n,i,!1,null,null,null);t["default"]=m.exports;f()(m,{VAvatar:v["a"],VChip:p["a"],VIcon:h["a"],VSelect:g["a"]})},"466d":function(e,t,r){"use strict";var n=r("d784"),i=r("825a"),a=r("50c4"),s=r("1d80"),u=r("8aa5"),c=r("14c3");n("match",(function(e,t,r){return[function(t){var r=s(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,this,e);if(n.done)return n.value;var s=i(this),o=String(e);if(!s.global)return c(s,o);var l=s.unicode;s.lastIndex=0;var d,f=[],v=0;while(null!==(d=c(s,o))){var p=String(d[0]);f[v]=p,""===p&&(s.lastIndex=u(o,a(s.lastIndex),l)),v++}return 0===v?null:f}]}))},"4e62":function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n,i=r("8785"),a=r("5184"),s=Object(a["a"])(n||(n=Object(i["a"])(["\n  query getTags($filters: FilterCustomTags) {\n    customTags(filters: $filters) {\n      id\n      name\n      color\n      order\n    }\n  }\n"])))},5319:function(e,t,r){"use strict";var n=r("d784"),i=r("d039"),a=r("825a"),s=r("50c4"),u=r("a691"),c=r("1d80"),o=r("8aa5"),l=r("0cb2"),d=r("14c3"),f=r("b622"),v=f("replace"),p=Math.max,h=Math.min,g=function(e){return void 0===e?e:String(e)},m=function(){return"$0"==="a".replace(/./,"$0")}(),b=function(){return!!/./[v]&&""===/./[v]("a","$0")}(),x=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));n("replace",(function(e,t,r){var n=b?"$":"$0";return[function(e,r){var n=c(this),i=void 0==e?void 0:e[v];return void 0!==i?i.call(e,n,r):t.call(String(n),e,r)},function(e,i){if("string"===typeof i&&-1===i.indexOf(n)&&-1===i.indexOf("$<")){var c=r(t,this,e,i);if(c.done)return c.value}var f=a(this),v=String(e),m="function"===typeof i;m||(i=String(i));var b=f.global;if(b){var x=f.unicode;f.lastIndex=0}var y=[];while(1){var $=d(f,v);if(null===$)break;if(y.push($),!b)break;var S=String($[0]);""===S&&(f.lastIndex=o(v,s(f.lastIndex),x))}for(var w="",k=0,q=0;q<y.length;q++){$=y[q];for(var O=String($[0]),P=p(h(u($.index),v.length),0),T=[],_=1;_<$.length;_++)T.push(g($[_]));var I=$.groups;if(m){var j=[O].concat(T,P,v);void 0!==I&&j.push(I);var V=String(i.apply(void 0,j))}else V=l(O,v,P,T,I,i);P>=k&&(w+=v.slice(k,P)+V,k=P+O.length)}return w+v.slice(k)}]}),!x||!m||b)},"5a34":function(e,t,r){var n=r("44e7");e.exports=function(e){if(n(e))throw TypeError("The method doesn't accept regular expressions");return e}},ab13:function(e,t,r){var n=r("b622"),i=n("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[i]=!1,"/./"[e](t)}catch(n){}}return!1}},caad:function(e,t,r){"use strict";var n=r("23e7"),i=r("4d64").includes,a=r("44d2");n({target:"Array",proto:!0},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a("includes")}}]);
//# sourceMappingURL=chunk-14d8ee5e.3e92403f.js.map