(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4c50"],{9245:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",[r("v-card",{staticClass:"my-4",attrs:{outlined:"",width:"95%"}},[r("v-card-title",[e._v("Re: "+e._s(e.item.subject))]),r("v-card-subtitle",[e._v(" enviado "+e._s(e._f("timeZoneFromNow")(e.item.createdAt))+" por "+e._s(e.getUser(e.item.createdBy.id))+" a "+e._s(e.item.sendTo)+" ")])],1)],1)},a=[],i=(r("7db0"),r("99af"),r("b0c0"),{name:"Email",props:{item:{type:Object,required:!0},users:{type:Array,required:!1,default:function(){return[]}}},methods:{getUser:function(e){var t=this.users.some((function(t){return t.id===e}));if(t){var r=this.users.find((function(t){return t.id===e})),n=r.user;return"".concat(n.name," ").concat(n.lastName)}return"Usuario eliminado"}}}),s=i,u=r("0c7c"),c=r("6544"),d=r.n(c),o=r("b0af"),l=r("99d9"),m=r("0fd9"),f=Object(u["a"])(s,n,a,!1,null,null,null);t["default"]=f.exports;d()(f,{VCard:o["a"],VCardSubtitle:l["b"],VCardTitle:l["d"],VRow:m["a"]})}}]);
//# sourceMappingURL=chunk-2d0e4c50.c6cb9b48.js.map