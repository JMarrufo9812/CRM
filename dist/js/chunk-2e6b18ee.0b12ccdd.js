(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e6b18ee"],{"2e2f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"note",attrs:{flat:"",color:"#FDE584"}},[n("v-card-title",{staticClass:"d-flex justify-space-between mr-1 title-note"},[t._v(" Nota "),(t.canEdit||t.canEditOthers)&&!t.note.isDelete&&t.isMe?n("v-menu",{attrs:{bottom:"","offset-y":"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[n("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",i,!1),a),[n("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!1,3221905750)},[n("v-list",[n("v-list-item",{on:{click:t.edit}},[n("v-list-item-title",[t._v("Editar")])],1),"ACTION"!==t.typeItem?n("v-list-item",{on:{click:t.remove}},[n("v-list-item-title",[t._v("Eliminar")])],1):t._e()],1)],1):t._e()],1),n("v-card-subtitle",[t._v(" "+t._s(t._f("dateNow")(t.note.createdAt))+" - "+t._s(t.note.createdBy.user.name)+" "+t._s(t.note.createdBy.user.lastName)+" ")]),n("v-card-text",[n("div",{domProps:{innerHTML:t._s(t.note.content)}})])],1)},i=[],s=n("4b58"),c=n("9685"),r=n("891c"),o=n("ee2e"),d={name:"NoteTemplate",props:{note:{type:Object,required:!0},typeItem:{type:String,required:!0,default:""},ownerId:{type:String,default:""}},data:function(){return{UPDATE:r["r"],UPDATE_OTHERS:r["s"],subject:s["b"],PERMISSIONS_CONTACTS:o["e"],PERMISSIONS_COMPANIES:o["d"],PERMISSIONS_DEALS:o["f"],PERMISSIONS_NOTES:o["j"]}},computed:{isMe:function(){return c["a"].can(r["r"],Object(s["b"])(o["j"],{authorId:this.note.createdBy.id||""}))},canEdit:function(){return"CONTACT"===this.typeItem?c["a"].can(r["r"],Object(s["b"])(o["e"],{authorId:this.ownerId||""})):"COMPANY"===this.typeItem?c["a"].can(r["r"],Object(s["b"])(o["d"],{authorId:this.ownerId||""})):"DEAL"===this.typeItem&&c["a"].can(r["r"],Object(s["b"])(o["f"],{authorId:this.ownerId||""}))},canEditOthers:function(){return"CONTACT"===this.typeItem?this.canEdit?c["a"].can(r["s"],o["e"]):c["a"].can(r["s"],o["e"])&&!c["a"].can(r["s"],Object(s["b"])(o["e"],{authorId:this.ownerId||""})):"COMPANY"===this.typeItem?this.canEdit?c["a"].can(r["s"],o["d"]):c["a"].can(r["s"],o["d"])&&!c["a"].can(r["s"],Object(s["b"])(o["d"],{authorId:this.ownerId||""})):"DEAL"===this.typeItem&&(this.canEdit?c["a"].can(r["s"],o["f"]):c["a"].can(r["s"],o["f"])&&!c["a"].can(r["s"],Object(s["b"])(o["f"],{authorId:this.ownerId||""})))}},methods:{edit:function(){this.$emit("edit")},remove:function(){this.$emit("remove")}}},u=d,l=(n("4083"),n("0c7c")),I=n("6544"),b=n.n(I),f=n("8336"),m=n("b0af"),h=n("99d9"),v=n("132d"),p=n("8860"),O=n("da13"),E=n("5d23"),_=n("e449"),S=Object(l["a"])(u,a,i,!1,null,"07f63b3b",null);e["default"]=S.exports;b()(S,{VBtn:f["a"],VCard:m["a"],VCardSubtitle:h["b"],VCardText:h["c"],VCardTitle:h["d"],VIcon:v["a"],VList:p["a"],VListItem:O["a"],VListItemTitle:E["c"],VMenu:_["a"]})},4083:function(t,e,n){"use strict";n("941f")},"941f":function(t,e,n){}}]);
//# sourceMappingURL=chunk-2e6b18ee.0b12ccdd.js.map