(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228931"],{da86:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.groupsInPlan,"item-key":"group","items-per-page":500,expanded:e.expanded,"hide-default-footer":"",light:""},on:{"update:expanded":function(t){e.expanded=t}},scopedSlots:e._u([{key:"item",fn:function(t){var a=t.item,r=t.headers,o=t.expand,i=t.isExpanded;return[n("tr",e._l(r,(function(t,r){return n("td",{key:r,on:{click:function(e){return o(!i)}}},[0===r?n("div",[n("v-icon",{attrs:{color:"primary"}},[e._v(" mdi-chevron-double-down ")]),n("span",[e._v(" "+e._s(a.group)+" ")])],1):n("v-layout",{attrs:{"justify-center":""}},[n("v-icon",{attrs:{small:"",color:"mdi-checkbox-blank-circle"==a["plan"+t.value]?"green":"primary"}},[e._v(" "+e._s(a["plan"+t.value])+" ")])],1)],1)})),0)]}},{key:"expanded-item",fn:function(t){var a=t.headers,r=t.item;return e._l(a,(function(t,a){return n("td",{key:"header-"+a+"-"+r.group.trim()},[n("div",a>0?e._l(r.groupModules,(function(a,o){return n("v-list-item",{key:"icons-"+o+"-plan"+t.value},[n("v-list-item-content",[n("v-layout",{attrs:{"justify-center":""}},[n("v-icon",{attrs:{small:"",color:"mdi-checkbox-blank-circle"==r["plan"+t.value]?"green":"primary"}},[e._v(" "+e._s("mdi-checkbox-blank-circle"==r["plan"+t.value]?"mdi-check-outline":"mdi-close-outline")+" ")])],1)],1)],1)})):e._l(r.groupModules,(function(t,a){return n("v-list-item",{key:"list-"+a+"-"+r.group.trim()},[n("v-list-item-content",[e._v(" "+e._s(t.name)+" ")])],1)})),1)])}))}}])})],1)},r=[],o=n("2909"),i=(n("d81d"),n("159b"),n("b0c0"),{props:{plans:{type:[Array,Object]},modules:{type:[Array,Object]},groupModules:{type:[Array,Object]}},data:function(){return{expanded:[]}},computed:{groupsInPlan:{cache:!1,get:function(){var e=this;if(this.plans&&this.groupModules){var t=Object(o["a"])(Array(this.groupModules.length)).map((function(){return{}}));return t.forEach((function(t,n){t.group=e.groupModules[n].name,t.groupModules=e.groupModules[n].modules})),this.plans.forEach((function(n){var a=n.modulesGroup;t.forEach((function(t,r){var o=e.groupModules[r].id;a.forEach((function(e){var a=e.id===o;t["plan".concat(n.id)]=a||"mdi-checkbox-blank-circle"===t["plan".concat(n.id)]?"mdi-checkbox-blank-circle":"mdi-circle-off-outline"}))}))})),t}return[]}},headers:function(){var e=[{text:"Grupo",value:"group"}];return this.plans&&this.plans.forEach((function(t){e.push({text:t.name,value:t.id,sortable:!1,align:"center",class:"font-weight-black"})})),e}},watch:{groupsInPlan:function(e){this.expanded=e}},mounted:function(){var e=this;setTimeout((function(){e.expanded=e.groupsInPlan}),500)}}),u=i,c=n("0c7c"),l=n("6544"),s=n.n(l),d=n("8fea"),p=n("132d"),f=(n("20f6"),n("e8f2")),m=Object(f["a"])("layout"),v=n("da13"),h=n("5d23"),g=Object(c["a"])(u,a,r,!1,null,null,null);t["default"]=g.exports;s()(g,{VDataTable:d["a"],VIcon:p["a"],VLayout:m,VListItem:v["a"],VListItemContent:h["a"]})}}]);
//# sourceMappingURL=chunk-2d228931.c654f784.js.map