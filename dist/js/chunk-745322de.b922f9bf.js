(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-745322de"],{"0d2b8":function(e,s,r){"use strict";r.r(s);var i=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("v-dialog",{attrs:{persistent:"","max-width":"450px",scrollable:""},model:{value:e.modalHandler.isOpen,callback:function(s){e.$set(e.modalHandler,"isOpen",s)},expression:"modalHandler.isOpen"}},[r("v-card",[r("v-card-title",{staticClass:"primary d-flex justify-space-between py-6"},[r("span",{staticClass:"white--text ml-2"},[e._v(" "+e._s(e.modalHandler.isEdit?"Agregar usuarios a "+e.group.name:"Agregar Grupo")+" ")]),r("div",[r("v-icon",{staticClass:"white--text",on:{click:e.close}},[e._v(" mdi-close ")])],1)]),r("v-card-text",{staticClass:"pt-10"},[r("v-form",{ref:"formGroup",model:{value:e.isValidate,callback:function(s){e.isValidate=s},expression:"isValidate"}},[r("v-text-field",{staticClass:"mx-6",attrs:{rules:e.rules.general,label:"Nombre",counter:"",maxlength:"25",outlined:"",required:""},model:{value:e.newGroup.name,callback:function(s){e.$set(e.newGroup,"name",s)},expression:"newGroup.name"}}),r("v-alert",{attrs:{dense:"",outlined:"",type:"error",dismissible:""},model:{value:e.isError.show,callback:function(s){e.$set(e.isError,"show",s)},expression:"isError.show"}},[e._v(" "+e._s(e.isError.error)+" ")]),r("p",{staticClass:"ml-6 black--text"},[e._v(" selecciona los permisos del nuevo grupo: ")]),r("ListGroupPermissions",{attrs:{permissions:e.permissions.length>0?e.permissions:this.newGroup.permissionsu,isModal:!0},on:{emitPermissions:e.permissionsSelected}})],1)],1),r("v-card-actions",{staticClass:"d-flex justify-space-between"},[r("v-btn",{staticClass:"mr-8",attrs:{large:"",tile:"",outlined:"",color:"primary"},on:{click:e.close}},[e._v(" cancelar ")]),r("v-btn",{attrs:{large:"",tile:"",normal:"",color:"secondary",loading:e.modalHandler.isLoading},on:{click:e.outData}},[e._v(" Guardar ")])],1)],1)],1)},t=[],n=(r("d3b7"),r("3ca3"),r("ddb0"),r("d81d"),r("b0c0"),r("f82a")),o={name:"ModalGroup",mixins:[n["a"]],components:{ListGroupPermissions:function(){return r.e("chunk-cbc14cf0").then(r.bind(null,"11f7"))}},props:{modalHandler:{required:!0,type:Object,default:function(){return{isOpen:!1,isLoading:!1}}},permissions:{required:!0,type:[Array,Object],default:function(){return[]}},group:{required:!1,type:Object,default:function(){return{}}},loadingPermissions:{required:!0,type:Boolean}},data:function(){return{isValidate:!0,isError:{show:!1,error:""},newGroup:{name:"",permissions:[]}}},watch:{permissions:function(e){e&&(this.newGroup.permissions=JSON.parse(JSON.stringify(e)))},modalHandler:function(e){var s=e.isOpen;s||this.resetValues()}},methods:{permissionsSelected:function(e,s){this.newGroup.permissions=s},outData:function(){this.newGroup.permissions=this.newGroup.permissions.map((function(e){var s=e.name,r=e.methods;return{name:s,methods:r}})),this.$refs.formGroup.validate(),0===this.newGroup.permissions.length?this.isError={show:!0,error:"Selecciona mínimo un permiso"}:this.isValidate&&this.$emit("newGroup",this.newGroup)},close:function(){this.$emit("close",{isOpen:!1,isLoading:!1})},resetValues:function(){this.$refs.formGroup.resetValidation(),this.isError={show:!1,error:""},this.newGroup={name:"",permissions:[]}}}},a=o,l=r("0c7c"),c=r("6544"),u=r.n(c),d=r("0798"),p=r("8336"),m=r("b0af"),f=r("99d9"),h=r("169a"),w=r("4bd4"),v=r("132d"),b=r("8654"),g=Object(l["a"])(a,i,t,!1,null,null,null);s["default"]=g.exports;u()(g,{VAlert:d["a"],VBtn:p["a"],VCard:m["a"],VCardActions:f["a"],VCardText:f["c"],VCardTitle:f["d"],VDialog:h["a"],VForm:w["a"],VIcon:v["a"],VTextField:b["a"]})}}]);
//# sourceMappingURL=chunk-745322de.b922f9bf.js.map