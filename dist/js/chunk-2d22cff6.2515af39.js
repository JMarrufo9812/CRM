(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22cff6"],{f62b:function(e,l,t){"use strict";t.r(l);var i=function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("v-select",{class:[e.field.isRequired?"required":""],attrs:{items:e.pipelines,"item-text":"name","item-value":"id",dense:"",outlined:"","hide-details":"auto",label:e.field.label||"Embudos"},model:{value:e.field.value,callback:function(l){e.$set(e.field,"value",l)},expression:"field.value"}})},a=[],s=(t("b0c0"),t("9500")),u={name:"FieldSelectStage",props:{field:{type:Object,required:!0},resetHandler:{type:Boolean,default:!1}},watch:{resetValues:function(e){e||this.resetValues()}},methods:{updateValue:function(e){this.field.value=e.id,this.stageName=e.name},resetValues:function(){delete this.field.value}},apollo:{pipelines:{query:s["c"]}}},n=u,d=t("0c7c"),c=t("6544"),o=t.n(c),r=t("b974"),f=Object(d["a"])(n,i,a,!1,null,null,null);l["default"]=f.exports;o()(f,{VSelect:r["a"]})}}]);
//# sourceMappingURL=chunk-2d22cff6.2515af39.js.map