(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18ed75f4"],{"9ab4":function(e,t,i){"use strict";i("ee99")},e8ea:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("v-select",{class:[e.inputProps?e.inputProps.class:"",e.field.isRequired?"required":""],attrs:{"prepend-icon":e.field.icon?e.field.icon:"mdi-view-column",dense:!!e.inputProps&&e.inputProps.isDense,items:e.pipelines,"item-text":function(e){var t=e.name;return t},"item-value":"id","return-object":!0,rules:e.field.isRequired?e.rules.isRequiredObject:[],outlined:"","hide-details":"auto",label:e.field.label||"Embudo"},model:{value:e.pipelineSelected,callback:function(t){e.pipelineSelected=t},expression:"pipelineSelected"}}),""!==e.pipelineSelected.id?i("div",{staticClass:"mt-5"},[i("span",[i("v-icon",{staticClass:"mr-4"},[e._v("mdi-view-carousel-outline")]),e._v(" Etapa "),i("b",{directives:[{name:"show",rawName:"v-show",value:e.field.isRequired,expression:"field.isRequired"}],staticClass:"red--text"},[e._v(" * ")])],1),i("div",{staticClass:"Pipeline py-3 pl-8"},[i("div",{staticClass:"Pipeline__stages open"},[i("ul",e._l(e.stages,(function(t,s){return i("li",{key:s,class:t.done?"active Stage":"Stage",on:{click:function(i){return e.selectStage(s,t)}}},[i("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,a=t.attrs;return[i("div",e._g(e._b({staticClass:"Stage__content"},"div",a,!1),s),[i("div",{staticClass:"Stage__name"}),i("span",{staticClass:"Stage__separator "})])]}}],null,!0)},[i("span",{staticClass:"d-block font-weight-bold"},[e._v(" "+e._s(t.name)+" ")])])],1)})),0)])])]):e._e()],1)},a=[],l=i("3835"),n=(i("b64b"),i("d81d"),i("b0c0"),i("9500")),d=i("f82a"),c=i("a2b6"),u={name:"FieldSelect",mixins:[d["a"]],props:{resetHandler:{type:Boolean,default:!1},field:{type:Object,required:!0},inputProps:{type:Object,required:!1}},data:function(){return{pipelineSelected:{id:"",name:"",stages:[]},stageSelected:{},stages:[]}},created:function(){this.field.defaultValue&&this.addDefaultValue()},watch:{resetHandler:function(e){e?this.field.defaultValue&&e&&this.addDefaultValue():this.resetValues()},pipelineSelected:function(e){if(0!==Object.keys(e).length){this.stages=Object(c["a"])({listItems:e.stages,orderBy:"ASC",nextElement:"order"});var t=Object(l["a"])(this.stages,1),i=t[0];i.done=!0,this.selectStage(0,i)}},stageSelected:function(e){if(0!==Object.keys(e).length){var t=e.id;this.field.value={stageId:t,pipelineId:this.pipelineSelected.id}}}},methods:{selectStage:function(e,t){this.stages=this.stages.map((function(t,i){return t.done=i<=e,t})),this.stageSelected=t},addDefaultValue:function(){if(this.field.defaultValue.pipeline){var e=this.field.defaultValue.pipeline,t=e.id,i=e.name,s=e.stages;this.pipelineSelected={id:t,name:i,stages:s}}if(this.field.defaultValue.stage){var a=this.field.defaultValue.stage.order-1,l=this.field.defaultValue.stage;l.done=!0,this.selectStage(a,l)}},resetValues:function(){this.field.defaultValue={},this.field.value={},this.stageSelected={},this.pipelineSelected={},this.stages=[]}},apollo:{pipelines:{query:n["c"],fetchPolicy:"no-cache"}}},o=u,r=(i("9ab4"),i("0c7c")),p=i("6544"),f=i.n(p),h=i("132d"),g=i("b974"),v=i("3a2f"),b=Object(r["a"])(o,s,a,!1,null,"ef1614d0",null);t["default"]=b.exports;f()(b,{VIcon:h["a"],VSelect:g["a"],VTooltip:v["a"]})},ee99:function(e,t,i){}}]);
//# sourceMappingURL=chunk-18ed75f4.ee887128.js.map