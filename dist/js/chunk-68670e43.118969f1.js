(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68670e43"],{"06a4":function(e,t,i){},"1c33":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-dialog",{attrs:{width:"900",scrollable:"",persistent:""},model:{value:e.modalHandler.isOpen,callback:function(t){e.$set(e.modalHandler,"isOpen",t)},expression:"modalHandler.isOpen"}},[i("v-card",[i("v-card-title",{staticClass:"d-flex justify-space-between primary white--text py-4"},[i("span",[e._v(e._s(e.modalHandler.isEdit?"Editar":"Agregar")+" filtro")]),i("v-icon",{staticClass:"white--text",on:{click:e.close}},[e._v(" mdi-close ")])],1),e.isLoading?i("v-card-text",{staticClass:"text-center"},[i("v-sheet",{staticClass:"ml-7",attrs:{color:"white",height:"400",width:"800"}},[i("v-progress-circular",{staticStyle:{"margin-top":"25%"},attrs:{indeterminate:"",color:"primary"}})],1)],1):i("v-card-text",{staticClass:"pt-2 px-2"},[i("v-form",{ref:"formFilter",model:{value:e.isValidate,callback:function(t){e.isValidate=t},expression:"isValidate"}},[i("v-row",[i("v-col",[i("v-text-field",{staticClass:"mt-8 ml-8 required",attrs:{rules:this.rules.isRequired,outlined:"",label:"Nombre de filtro","hide-details":"auto",maxlength:"25",counter:"25"},model:{value:e.filter.name,callback:function(t){e.$set(e.filter,"name",t)},expression:"filter.name"}})],1),i("v-col",[i("v-container",{attrs:{fluid:""}},[i("v-switch",{attrs:{inset:"",disabled:e.filter.isDefault},scopedSlots:e._u([{key:"label",fn:function(){return[e.filter.isVisible?e._e():i("span",[i("v-icon",{staticClass:"mb-2"},[e._v("mdi-lock-outline")]),e._v(" Filtro privado: Solo el creador puede ver y utilizar este filtro ")],1),e.filter.isVisible?i("span",[i("v-icon",{staticClass:"mb-2"},[e._v(" mdi-lock-open-variant-outline ")]),e._v(" Filtro público: todos los usuarios de la empresa pueden ver y usar este filtro ")],1):e._e()]},proxy:!0}]),model:{value:e.filter.isVisible,callback:function(t){e.$set(e.filter,"isVisible",t)},expression:"filter.isVisible"}})],1)],1),i("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[e.conditionsError.show?i("v-alert",{attrs:{dense:"",outlined:"",type:"error"}},[e._v(" "+e._s(e.conditionsError.message)+" ")]):e._e()],1)],1)],1),e._l(e.filter.conditions.conditions,(function(t,s){var n=t.glue,a=t.conditions;return i("v-card",{key:s,staticClass:"pa-4 mb-4",attrs:{outlined:""}},[i("p",[e._v(" "+e._s("AND"===n?"Mostrar "+e.section+" que cumplan TODAS estas condiciones:":"Y que cumplan CUALQUIERA de estas condiciones:")+" ")]),e._l(a,(function(t,s){return i("v-row",{key:s},[i("v-col",{staticClass:"d-flex justify-space-between pb-0",class:{"pb-4":a.length-1===s},attrs:{cols:"12"}},[i("v-row",[i("v-col",{staticClass:"pr-0",attrs:{cols:"3"}},[i("v-select",{staticClass:"mr-2",attrs:{items:e.typeTableItems,"item-text":"text","item-value":"value",label:"Tipo",outlined:"",dense:"","hide-details":"auto"},on:{input:function(i){return e.getFiltersParams(n,t.typeTable,s)},change:function(t){return e.resetValuesTypeTable(n,s)}},model:{value:t.typeTable,callback:function(i){e.$set(t,"typeTable",i)},expression:"subcondition.typeTable"}})],1),i("v-col",{staticClass:"pr-0",attrs:{cols:"3"}},[i("v-select",{directives:[{name:"show",rawName:"v-show",value:"AND"===n?!!e.typeLabelItems.andItems[s]&&e.typeLabelItems.andItems[s].length>=1:!!e.typeLabelItems.orItems[s]&&e.typeLabelItems.orItems[s].length>=1,expression:"\n                    glue === 'AND'\n                      ? typeLabelItems.andItems[index]\n                        ? typeLabelItems.andItems[index].length >= 1\n                        : false\n                      : typeLabelItems.orItems[index]\n                      ? typeLabelItems.orItems[index].length >= 1\n                      : false\n                  "}],attrs:{items:"AND"===n?e.typeLabelItems.andItems[s]:e.typeLabelItems.orItems[s],"item-text":"label","item-value":"typeLabel",label:"Campo",outlined:"",dense:"","hide-details":"auto"},on:{input:function(i){return e.getOperators(n,t.typeTable,t.typeLabel,s)},change:function(t){return e.resetValuesTypeLabel(n,s)}},model:{value:t.typeLabel,callback:function(i){e.$set(t,"typeLabel",i)},expression:"subcondition.typeLabel"}})],1),i("v-col",{staticClass:"pr-0",attrs:{cols:"3"}},[i("v-select",{directives:[{name:"show",rawName:"v-show",value:"AND"===n?!!e.operatorItems.andItems[s]&&e.operatorItems.andItems[s].length>=1:!!e.operatorItems.orItems[s]&&e.operatorItems.orItems[s].length>=1,expression:"\n                    glue === 'AND'\n                      ? operatorItems.andItems[index]\n                        ? operatorItems.andItems[index].length >= 1\n                        : false\n                      : operatorItems.orItems[index]\n                      ? operatorItems.orItems[index].length >= 1\n                      : false\n                  "}],attrs:{items:"AND"===n?e.operatorItems.andItems[s]:e.operatorItems.orItems[s],"item-text":"name","item-value":"symbol",label:"Operadores",outlined:"",dense:"","hide-details":"auto"},on:{input:function(t){return e.getTypeField(n,s)}},model:{value:t.operator,callback:function(i){e.$set(t,"operator",i)},expression:"subcondition.operator"}})],1),i("v-col",{attrs:{cols:"3"}},[i("Fields",{directives:[{name:"show",rawName:"v-show",value:e.viewValueHandler(t),expression:"viewValueHandler(subcondition)"}],attrs:{inputProps:{class:"no-icon",isDense:!0},field:e.fieldConfig(t),resetHandler:e.modalHandler.isOpen}})],1)],1),i("v-btn",{attrs:{small:"",icon:""},on:{click:function(t){return e.deleteCondition(n,s)}}},[i("v-icon",{staticClass:"mt-2 ml-4"},[e._v("mdi-minus-circle-outline")])],1)],1),a.length-1!==s?i("v-col",{staticClass:"pt-0",attrs:{cols:"12",align:"end"}},[i("span",[e._v(e._s("AND"===n?"Y":"O")+" esta condición:")]),i("v-divider")],1):e._e()],1)})),i("v-col",{staticClass:"pl-0",attrs:{cols:"12"}},[i("v-btn",{attrs:{"x-small":"",outlined:""},on:{click:function(t){return e.addConditions(n)}}},[i("v-icon",{attrs:{small:""}},[e._v("mdi-plus")]),e._v(" Añadir condicion ")],1)],1)],2)}))],2),i("v-card-actions",{staticClass:"pa-5 justify-end"},[e.modalHandler.isEdit?i("v-btn",{attrs:{large:"",tile:"",outlined:"",color:"error"},on:{click:e.deleteFilterConfirmation}},[i("v-icon",[e._v("mdi-trash-can-outline")]),e._v(" Eliminar ")],1):e._e(),i("v-btn",{attrs:{large:"",tile:"",outlined:"",color:"primary"},on:{click:e.close}},[e._v(" cancelar ")]),i("v-btn",{attrs:{large:"",tile:"",normal:"",color:"secondary",loading:e.modalHandler.isLoading},on:{click:function(t){return e.outDataCreateorUpdate(e.modalHandler.isEdit?"UPDATE":"CREATE")}}},[e._v(" Guardar ")])],1)],1),i("BaseModalDelete",{attrs:{modalHandler:e.modalDelete},on:{confirm:e.outDataDelete,cancel:e.modalHandlerDelete}})],1)},n=[],a=i("5530"),o=i("1da1"),r=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("d81d"),i("b0c0"),i("4de4"),i("159b"),i("7db0"),i("a434"),i("6eed")),l=i("f82a"),c=i("1e6d"),d={name:"ModalFilter",mixins:[c["a"],l["a"]],props:{type:{required:!0,type:Object},modalHandler:{required:!0,type:Object,default:function(){return{isOpen:!1,isLoading:!1,isEdit:!1,info:{}}}}},components:{Fields:function(){return i.e("chunk-2d21400a").then(i.bind(null,"aea1"))}},data:function(){return{isLoading:!1,isValidate:!0,conditionsError:{show:!1,message:""},section:"",filters:[],filter:{name:"",type:"",isVisible:!1,conditions:{glue:"AND",conditions:[{glue:"AND",conditions:[]},{glue:"OR",conditions:[]}]}},typeTableItems:[{text:"Trato",value:"DEAL"},{text:"Empresa",value:"COMPANY"},{text:"Contacto",value:"CONTACT"}],typeLabelItems:{andItems:[],orItems:[]},operatorItems:{andItems:[],orItems:[]},typesFields:{andTypes:[],orTypes:[]}}},watch:{modalHandler:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var s,n,a,r,l,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(s=e.isOpen,n=e.isEdit,a=e.info,s||t.resetValues(),s&&!n&&(t.filters=[],["DEAL","COMPANY","CONTACT"].map(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(i){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getFilter(i);case 2:s=e.sent,n=s.data.filters,t.filters.push(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),r=t.type,l=r.type,c=r.name,t.filter.type=l,t.section=c),!s||!n){i.next=9;break}return t.isLoading=!0,t.filters=[],i.next=8,Promise.all(["DEAL","COMPANY","CONTACT"].map(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(i){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getFilter(i);case 2:s=e.sent,n=s.data.filters,t.filters.push(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 8:t.fillItems(a);case 9:case"end":return i.stop()}}),i)})))()}},methods:{fillItems:function(e){var t=this;this.filter=Object(a["a"])({},e),e.conditions.conditions.forEach((function(e){var i=e.glue,s=e.conditions;s.length>0&&s.forEach((function(e,s){t.getFiltersParams(i,e.typeTable,s),t.getOperators(i,e.typeTable,e.typeLabel,s),t.getTypeField(i,s)}))})),this.isLoading=!1},fieldConfig:function(e){return"NUMBER"===e.typeField&&(e.label="Cantidad"),"DATE"===e.typeField&&(e.label="Fecha"),"CREATED_BY"===e.typeLabel&&(e.label="Creador"),"TAGS"===e.typeLabel&&(e.label="Etiquetas"),"STATUS"===e.typeLabel&&(e.label="Estados"),"NAME"===e.typeLabel&&(e.label="Nombre"),e},viewValueHandler:function(e){var t=e.typeField,i=e.operator;return""!==t&&"IS NOT NULL"!==i&&"IS NULL"!==i},getFilter:function(e){return this.$apollo.query({query:r["b"],fetchPolicy:"no-cache",variables:{typeTable:e}})},getFiltersParams:function(e,t,i){var s=this.filters.find((function(e){var i=e.typeTable;return i===t})),n=s.columns;"AND"===e&&(this.typeLabelItems.andItems[i]=n),"OR"===e&&(this.typeLabelItems.orItems[i]=n)},getOperators:function(e,t,i,s){var n=this.filters.find((function(e){var i=e.typeTable;return i===t})),a=n.columns,o=a.find((function(e){var t=e.typeLabel;return t===i})),r=o.typeField;"AND"===e&&(this.operatorItems.andItems[s]=r.operators,this.typesFields.andTypes[s]=r.type),"OR"===e&&(this.operatorItems.orItems[s]=r.operators,this.typesFields.orTypes[s]=r.type)},getTypeField:function(e,t){var i=this.filter.conditions.conditions,s=i.find((function(t){var i=t.glue;return i===e}));"AND"===e&&(s.conditions[t].typeField=this.typesFields.andTypes[t]),"OR"===e&&(s.conditions[t].typeField=this.typesFields.orTypes[t])},outDataCreateorUpdate:function(e){var t=this;this.$refs.formFilter.validate(),this.isValidate&&(0===this.filter.conditions.conditions[0].conditions.length&&0===this.filter.conditions.conditions[1].conditions.length?(this.conditionsError={show:!0,message:"Agrega una condición como mínimo"},setTimeout((function(){t.conditionsError={show:!1,message:""}}),3e3)):this.$emit("outData",e,this.filter))},outDataDelete:function(e){var t=e.isOpen,i=e.isLoading,s=e.message,n=e.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:i,message:s,infoDelete:n}),this.$emit("outData","DELETE",this.filter)},close:function(){this.$emit("close",{isOpen:!1,isLoading:!1,isEdit:!1,info:{}})},resetValues:function(){this.$refs.formFilter.resetValidation(),this.$refs.formFilter.reset(),this.filters=[],this.typeLabelItems={andItems:[],orItems:[]},this.operatorItems={andItems:[],orItems:[]},this.typeField={andTypes:[],orTypes:[]},this.filter={name:"",type:"",isVisible:!1,conditions:{glue:"AND",conditions:[{glue:"AND",conditions:[]},{glue:"OR",conditions:[]}]}}},addConditions:function(e){this.conditionsError={show:!1,message:""},this.filter.conditions.conditions=this.filter.conditions.conditions.map((function(t){return t.glue===e&&t.conditions.push({typeTable:"",typeLabel:"",typeField:"",operator:"",value:null}),t}))},deleteFilterConfirmation:function(){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"El filtro",text:"será eliminado"},infoDelete:{}})},deleteCondition:function(e,t){this.filter.conditions.conditions=this.filter.conditions.conditions.map((function(i){return i.glue===e&&i.conditions.splice(t,1),i})),"AND"===e&&(this.typeLabelItems.andItems.splice(t,1),this.operatorItems.andItems.splice(t,1),this.typesFields.andTypes.splice(t,1)),"OR"===e&&(this.typeLabelItems.orItems.splice(t,1),this.operatorItems.orItems.splice(t,1),this.typesFields.orTypes.splice(t,1))},resetValuesTypeTable:function(e,t){this.filter.conditions.conditions=this.filter.conditions.conditions.map((function(i){return i.glue===e&&(i.conditions[t].typeLabel="",i.conditions[t].typeField="",i.conditions[t].operator="",i.conditions[t].value="",delete i.conditions[t].label,delete i.conditions[t].type),i})),"AND"===e&&(this.operatorItems.andItems[t]=[],this.typesFields.andTypes[t]=[]),"OR"===e&&(this.operatorItems.orItems[t]=[],this.typesFields.orTypes[t]=[])},resetValuesTypeLabel:function(e,t){this.filter.conditions.conditions=this.filter.conditions.conditions.map((function(i){return i.glue===e&&(i.conditions[t].typeField="",i.conditions[t].operator="",i.conditions[t].value="",delete i.conditions[t].label,delete i.conditions[t].type),i}))}}},u=d,p=(i("2828"),i("0c7c")),m=i("6544"),h=i.n(m),f=i("0798"),v=i("8336"),b=i("b0af"),y=i("99d9"),g=i("62ad"),I=i("a523"),C=i("169a"),w=i("ce7e"),T=i("4bd4"),x=i("132d"),L=i("490a"),D=i("0fd9"),A=i("b974"),E=i("8dd9"),F=i("b73d"),V=i("8654"),O=Object(p["a"])(u,s,n,!1,null,"1b4757e3",null);t["default"]=O.exports;h()(O,{VAlert:f["a"],VBtn:v["a"],VCard:b["a"],VCardActions:y["a"],VCardText:y["c"],VCardTitle:y["d"],VCol:g["a"],VContainer:I["a"],VDialog:C["a"],VDivider:w["a"],VForm:T["a"],VIcon:x["a"],VProgressCircular:L["a"],VRow:D["a"],VSelect:A["a"],VSheet:E["a"],VSwitch:F["a"],VTextField:V["a"]})},2828:function(e,t,i){"use strict";i("06a4")},"9d01":function(e,t,i){},b73d:function(e,t,i){"use strict";i("ec29"),i("9d01");var s=i("fe09"),n=i("c37a"),a=i("c3f0"),o=i("0789"),r=i("490a"),l=i("80d2");t["a"]=s["a"].extend({name:"v-switch",directives:{Touch:a["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes(){return{...n["a"].options.computed.classes.call(this),"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset}},attrs(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot(){return[this.genSwitch(),this.genLabel()]},genSwitch(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs,...t}),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",{staticClass:"v-input--switch__track",...this.switchData}),this.$createElement("div",{staticClass:"v-input--switch__thumb",...this.switchData},[this.genProgress()])])},genProgress(){return this.$createElement(o["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(r["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft(){this.isActive&&this.onChange()},onSwipeRight(){this.isActive||this.onChange()},onKeydown(e){(e.keyCode===l["z"].left&&this.isActive||e.keyCode===l["z"].right&&!this.isActive)&&this.onChange()}}})}}]);
//# sourceMappingURL=chunk-68670e43.118969f1.js.map