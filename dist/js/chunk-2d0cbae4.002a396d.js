(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cbae4"],{"4b66":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{persistent:"","max-width":"480px",scrollable:""},model:{value:e.modalHandler.isOpen,callback:function(t){e.$set(e.modalHandler,"isOpen",t)},expression:"modalHandler.isOpen"}},[a("v-card",[a("v-card-title",{staticClass:"d-flex justify-space-between primary white--text "},[a("span",[e._v(" selecciona el grupo al que deseas mover ")]),a("v-icon",{attrs:{color:"white"},on:{click:e.close}},[e._v(" mdi-close ")])],1),a("v-card-text",{staticClass:"pt-10"},[a("v-select",{attrs:{outlined:"",label:"Nuevo grupo",items:e.groupsToSelect,"item-text":function(e){var t=e.name;return t},"item-value":function(e){var t=e.id;return t}},model:{value:e.groupSelected,callback:function(t){e.groupSelected=t},expression:"groupSelected"}})],1),a("v-card-actions",[a("v-col",{attrs:{align:"end"}},[a("v-btn",{staticClass:"mr-8",attrs:{large:"",tile:"",outlined:"",color:"primary"},on:{click:e.close}},[e._v(" cancelar ")]),a("v-btn",{attrs:{large:"",tile:"",normal:"",color:"secondary",disabled:!e.groupSelected,loading:e.modalHandler.isLoading},on:{click:e.outData}},[e._v(" Guardar ")])],1)],1)],1)],1)},o=[],i=(a("b64b"),a("4de4"),{props:{modalHandler:{required:!0,type:Object,default:function(){return{isOpen:!1,isLoading:!1,info:{}}}},groups:{required:!0,type:[Array,Object],default:function(){return[]}}},data:function(){return{groupsToSelect:[],groupSelected:"",userUpdated:{}}},watch:{modalHandler:function(e){var t=e.isOpen,a=e.info;t?(this.userUpdated=a,0!==Object.keys(a).length&&(this.groupsToSelect=this.groups.filter((function(e){return a.group.id!==e.id})))):this.resetValues()}},methods:{outData:function(){var e={id:this.userUpdated.id,group:{id:this.groupSelected},role:{id:""}};this.$emit("outData",e)},close:function(){this.$emit("close",{isOpen:!1,isLoading:!1,info:{}})},resetValues:function(){this.groupsToSelect=[],this.groupSelected="",this.userUpdated={}}}}),l=i,n=a("0c7c"),s=a("6544"),c=a.n(s),d=a("8336"),u=a("b0af"),p=a("99d9"),g=a("62ad"),f=a("169a"),v=a("132d"),m=a("b974"),b=Object(n["a"])(l,r,o,!1,null,null,null);t["default"]=b.exports;c()(b,{VBtn:d["a"],VCard:u["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:g["a"],VDialog:f["a"],VIcon:v["a"],VSelect:m["a"]})}}]);
//# sourceMappingURL=chunk-2d0cbae4.002a396d.js.map