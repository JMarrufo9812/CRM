(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2623a114"],{"269a":function(t,e){t.exports=function(t,e){var n="function"===typeof t.exports?t.exports.extendOptions:t.options;for(var i in"function"===typeof t.exports&&(n.directives=t.exports.options.directives),n.directives=n.directives||{},e)n.directives[i]=n.directives[i]||e[i]}},"6f34":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("d3b7"),n("3ca3"),n("ddb0");var i=n("cd1c"),o={data:function(){return{isUpdateInputs:!1,modalCustomField:{isOpen:!1,isLoading:!1,isEdit:!1}}},components:{Fields:function(){return n.e("chunk-2d21400a").then(n.bind(null,"aea1"))},ModalCustomField:function(){return n.e("chunk-2fe60b47").then(n.bind(null,"2aaf"))}},methods:{modalHandlerCustomFields:function(t){var e=t.isOpen,n=t.isLoading,i=t.isEdit;this.modalCustomField={isOpen:e,isLoading:n,isEdit:i}},createCustomField:function(t,e){var n=this,o=e.type,a=e.label,s=e.items,r=e.isRequired;this.modalHandlerCustomFields({isOpen:!0,isLoading:!0,isEdit:!1}),this.$apollo.mutate({mutation:i["a"],variables:{forForm:t,input:{type:o,label:a,items:s,isRequired:r,isMultiple:!1}},update:function(t,e){var i=e.data.createCustomField;if(n.inputs&&!n.isImportModal&&n.inputs.push(i),n.inputs&&n.isImportModal){var o=i.id,a=i.type,s=i.label,r={label:s,key:o,isSelect:!1,isDefault:!1,type:a};n.inputs.push(r)}}}).then((function(){n.modalHandlerCustomFields({isOpen:!1,isLoading:!1,isEdit:!1}),n.isUpdateInputs=!0})).catch((function(){var t="No se pudo actualizar los campos, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:t})}))}}}},9844:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("v-dialog",{attrs:{width:"400",scrollable:"",persistent:""},model:{value:t.modalHandler.isOpen,callback:function(e){t.$set(t.modalHandler,"isOpen",e)},expression:"modalHandler.isOpen"}},[n("v-card",[n("v-card-title",{staticClass:"primary d-flex justify-space-between py-6"},[n("span",{staticClass:"white--text ml-9"},[t._v(" Agregar Empresa ")]),n("div",[t.$can(t.CUSTOM_FIELDS_MANAGEMENT,t.PERMISSIONS_SETTINGS)?n("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-icon",t._g({staticClass:"white--text mr-4",attrs:{small:""}},i),[t._v(" mdi-cog ")])]}}],null,!1,1915171085)},[n("v-list",[n("v-list-item",{on:{click:function(e){return t.modalHandlerCustomFields({isOpen:!0,isLoading:!1,isEdit:!1})}}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-text-box-plus-outline")]),t._v(" Agregar campo ")],1),n("v-list-item",{attrs:{to:"/settings/enterprise/custom-fields/companies"}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-clipboard-edit-outline")]),t._v(" Editar campos ")],1)],1)],1):t._e(),n("v-icon",{staticClass:"white--text",on:{click:t.close}},[t._v(" mdi-close ")])],1)]),n("v-card-text",{directives:[{name:"scroll",rawName:"v-scroll.self",value:t.onScroll,expression:"onScroll",modifiers:{self:!0}}],staticClass:"pt-6"},[n("v-form",{ref:"formCompany",model:{value:t.isValidate,callback:function(e){t.isValidate=e},expression:"isValidate"}},[n("v-row",t._l(t.inputs,(function(e,i){return n("v-col",{key:i,attrs:{cols:"12"}},[n("Fields",{attrs:{field:e,resetHandler:t.modalHandler.isOpen,isScrolled:t.isScrolled},on:{scrolled:t.scrolled}})],1)})),1)],1)],1),n("v-card-actions",{staticClass:"d-flex justify-space-between mx-2 my-2"},[n("v-btn",{attrs:{width:"45%",large:"",outlined:"",color:"primary"},on:{click:t.close}},[t._v(" Cancelar ")]),n("v-btn",{attrs:{width:"45%",large:"",normal:"",color:"secondary",loading:t.modalHandler.isLoading},on:{click:t.outData}},[t._v(" Agregar ")])],1)],1)],1),n("ModalCustomField",{attrs:{forForm:"COMPANY",modalHandler:t.modalCustomField},on:{outData:t.createCustomField,close:t.modalHandlerCustomFields}})],1)},o=[],a=n("2909"),s=(n("d81d"),n("4de4"),n("159b"),n("6f34")),r=n("891c"),l=n("ee2e"),d={props:{modalHandler:{required:!0,type:Object,default:function(){return{isOpen:!1,isLoading:!1}}},inputs:{required:!0,type:Array,default:function(){return{}}}},mixins:[s["a"]],data:function(){return{isValidate:"",company:{},modalCustomField:{isOpen:!1,isLoading:!1},isScrolled:!1,PERMISSIONS_SETTINGS:l["l"],CUSTOM_FIELDS_MANAGEMENT:r["e"]}},watch:{modalHandler:function(t){var e=t.isOpen;e?this.isScrolled=!1:this.resetValues()}},methods:{scrolled:function(t){this.isScrolled=t},onScroll:function(){this.isScrolled=!0},outData:function(){var t=this,e=Object(a["a"])(this.inputs),n=this.inputs.some((function(t){return!t.keyInput}));if(n){var i=e.filter((function(t){return!t.keyInput})).map((function(t){var e=t.id,n=t.value;return{id:e,value:n}})),o=e.filter((function(t){return t.keyInput}));e=o,e.push({keyInput:"customForms",value:i})}e.filter((function(t){var e=t.value;return void 0!==e&&""!==e})).forEach((function(e){var n=e.keyInput,i=e.value;t.company[n]=i})),this.$refs.formCompany.validate(),this.isValidate&&this.$emit("outData",this.company)},close:function(){this.$emit("close",{isOpen:!1,isLoading:!1})},resetValues:function(){this.company={},this.$refs.formCompany.resetValidation(),this.$refs.formCompany.reset()},modalHandlerCustomFields:function(t){var e=t.isOpen,n=t.isLoading;this.modalCustomField={isOpen:e,isLoading:n}}}},u=d,c=n("0c7c"),p=n("6544"),m=n.n(p),f=n("8336"),v=n("b0af"),C=n("99d9"),F=n("62ad"),b=n("169a"),h=n("4bd4"),y=n("132d"),O=n("8860"),g=n("da13"),S=n("e449"),I=n("0fd9"),x=n("269a"),E=n.n(x),V=n("f977"),$=Object(c["a"])(u,i,o,!1,null,null,null);e["default"]=$.exports;m()($,{VBtn:f["a"],VCard:v["a"],VCardActions:C["a"],VCardText:C["c"],VCardTitle:C["d"],VCol:F["a"],VDialog:b["a"],VForm:h["a"],VIcon:y["a"],VList:O["a"],VListItem:g["a"],VMenu:S["a"],VRow:I["a"]}),E()($,{Scroll:V["b"]})},cd1c:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"d",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return p}));var i,o,a,s,r=n("8785"),l=n("5184"),d=Object(l["a"])(i||(i=Object(r["a"])(["\n  mutation CreateCustomFields($forForm: typeForm!, $input: CreateCustomInput!) {\n    createCustomField(forForm: $forForm, input: $input) {\n      id\n      order\n      label\n      icon\n      type\n      items\n      isRequired\n      isMultiple\n    }\n  }\n"]))),u=Object(l["a"])(o||(o=Object(r["a"])(["\n  mutation UpdateOrderInputs($forForm: typeForm!, $inputs: [UpdateOrder!]!) {\n    updateOrderInputs(forForm: $forForm, inputs: $inputs) {\n      forForm\n      defaultForm {\n        id\n        inputs {\n          id\n          label\n          order\n        }\n      }\n      customForm {\n        id\n        inputs {\n          id\n          label\n          order\n        }\n      }\n    }\n  }\n"]))),c=Object(l["a"])(a||(a=Object(r["a"])(["\n  mutation UpdateCustomField($input: UpdateCustomInput!) {\n    updateCustomField(input: $input) {\n      id\n      type\n      icon\n      label\n      items\n      order\n      isRequired\n      isMultiple\n    }\n  }\n"]))),p=Object(l["a"])(s||(s=Object(r["a"])(["\n  mutation DeleteInput($input: ID!) {\n    deleteCustomField(input: $input) {\n      forForm\n      defaultForm {\n        id\n        inputs {\n          id\n          order\n        }\n      }\n      customForm {\n        id\n        inputs {\n          id\n          order\n          label\n          icon\n          type\n          items\n          isRequired\n          isMultiple\n        }\n      }\n    }\n  }\n"])))}}]);
//# sourceMappingURL=chunk-2623a114.a2a9a818.js.map