(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf8df"],{"63e1":function(e,t,n){"use strict";n.r(t);var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-select",{attrs:{items:e.stages,label:"Select","item-text":"name","item-value":"id",dense:"",outlined:""},scopedSlots:e._u([{key:"item",fn:function(t){return[[n("v-list-item-content",[n("v-list-item-title",{domProps:{innerHTML:e._s(t.item.name)}})],1)]]}}]),model:{value:e.field.value,callback:function(t){e.$set(e.field,"value",t)},expression:"field.value"}})},i=[],s=n("2909"),a=(n("159b"),n("99af"),n("b0c0"),n("9500")),u={name:"FieldSelectStage",props:{field:{type:Object,required:!0},resetHandler:{type:Boolean,default:!1}},data:function(){return{stageSelected:{},stages:[]}},watch:{resetValues:function(e){e||this.resetValues()},pipelines:function(e){var t=[];e.forEach((function(e){t.push.apply(t,[{header:e.name}].concat(Object(s["a"])(e.stages),[{divider:!0}]))})),this.stages=t}},computed:{menuProps:function(){return this.stageSelected?{value:!1}:{}}},methods:{updateValue:function(e){this.field.value=e.id,this.stageSelected=e},resetValues:function(){delete this.field.value}},apollo:{pipelines:{query:a["c"]}}},c=u,o=n("0c7c"),d=n("6544"),r=n.n(d),f=n("5d23"),p=n("b974"),m=Object(o["a"])(c,l,i,!1,null,null,null);t["default"]=m.exports;r()(m,{VListItemContent:f["a"],VListItemTitle:f["c"],VSelect:p["a"]})}}]);
//# sourceMappingURL=chunk-2d0cf8df.3d1c3fdf.js.map