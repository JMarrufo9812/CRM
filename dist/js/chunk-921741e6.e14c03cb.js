(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-921741e6"],{"04d1":function(e,t,a){var i=a("342f"),n=i.match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},"1f09":function(e,t,a){},2972:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{staticClass:"white py-6 pl-12",attrs:{cols:"10"}},[a("v-text-field",{directives:[{name:"show",rawName:"v-show",value:!e.isLoadingPage,expression:"!isLoadingPage"}],staticClass:"input-width-20",attrs:{label:"Nombre de Embudo",outlined:"",maxlength:"30","hide-details":"auto",dense:"","append-icon":"mdi-pencil"},model:{value:e.editPipeline.name,callback:function(t){e.$set(e.editPipeline,"name",t)},expression:"editPipeline.name"}}),a("v-skeleton-loader",{directives:[{name:"show",rawName:"v-show",value:e.isLoadingPage,expression:"isLoadingPage"}],attrs:{type:"button"}})],1),a("v-col",{staticClass:"white",attrs:{cols:"2","align-self":"start",align:"end"}},[a("v-menu",{attrs:{"offset-y":"",ransition:"scale-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on;return[a("v-btn",e._g({staticClass:"my-4 mr-8 white--text",attrs:{color:"secondary",fab:"",depressed:"",small:""}},i),[a("v-icon",{attrs:{dark:""}},[e._v("mdi-plus")])],1)]}}])},[a("v-list",[e.$can(e.UPDATE,e.PERMISSIONS_PIPELINES)?a("v-list-item",{attrs:{disabled:e.editPipeline.stages.length>=15},on:{click:e.addStage}},[a("v-icon",{attrs:{left:""}},[e._v("mdi-view-carousel-outline")]),e._v(" "+e._s(e.editPipeline.stages.length>=15?"Limite de etapas superado":"Nueva Etapa")+" ")],1):e._e()],1)],1)],1),e.isError?a("v-col",[a("v-card",{attrs:{height:"800"}},[a("BaseErrorComponent",{attrs:{info:e.infoError}})],1)],1):e._e(),e._l(4,(function(t,i){return a("v-col",{directives:[{name:"show",rawName:"v-show",value:e.isLoadingPage,expression:"isLoadingPage"}],key:i},[a("v-skeleton-loader",{attrs:{type:"image"}})],1)}))],2),a("v-card",{directives:[{name:"show",rawName:"v-show",value:!e.isLoadingPage,expression:"!isLoadingPage"}],staticClass:"mt-12 ml-10 stage-container",attrs:{flat:""}},[a("draggable",{staticClass:"d-flex",attrs:{group:{name:"stages",put:!0},animation:200},on:{change:e.changeOrderStage},model:{value:e.editPipeline.stages,callback:function(t){e.$set(e.editPipeline,"stages",t)},expression:"editPipeline.stages"}},e._l(e.editPipeline.stages,(function(t,i){return a("v-card",{key:i,staticClass:"justify-center flex-column mx-6 mb-6 stage-edit",attrs:{width:"100%","min-width":"300",height:"90%",tile:""}},[a("v-card-title",{staticClass:"stage-header-edit"},[e._v(" "+e._s(t.name)+" ")]),a("v-divider"),a("v-card-text",[a("v-text-field",{staticClass:"my-10",attrs:{label:"Nombre de etapa",outlined:"",maxlength:"25",counter:"25"},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"stage.name"}}),a("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:["###%","##.##%"],expression:"['###%', '##.##%']"}],staticClass:"mb-10",attrs:{label:"Probabilidad de cierre %",outlined:"",min:0,max:100},on:{change:function(e){parseInt(t.probability,10)>100?t.probability="100":parseInt(t.probability,10)<0&&(t.probability="0")}},model:{value:t.probability,callback:function(a){e.$set(t,"probability",a)},expression:"stage.probability"}}),a("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"###",expression:"'###'"}],attrs:{min:0,max:365,type:"number",label:"Días de estancamiento",outlined:""},on:{change:function(e){t.maxDays>365?t.maxDays=365:t.maxDays<0&&(t.maxDays=0)}},model:{value:t.maxDays,callback:function(a){e.$set(t,"maxDays",e._n(a))},expression:"stage.maxDays"}})],1),a("v-card-actions",{staticClass:"justify-center stage-actions"},[e.$can(e.UPDATE,e.PERMISSIONS_PIPELINES)?a("v-btn",{staticClass:"button-delete-stage mb-7",attrs:{disabled:e.editPipeline.stages.length<=2,color:"red",width:"60%",outlined:""},on:{click:function(a){return e.deleteStageConfirmation(t)}}},[a("v-icon",[e._v("mdi-delete-outline")])],1):e._e()],1)],1)})),1)],1),a("v-col",{directives:[{name:"show",rawName:"v-show",value:!e.isLoadingPage,expression:"!isLoadingPage"}],attrs:{align:"end"}},[a("v-btn",{staticClass:"mr-8",attrs:{large:"",tile:"",outlined:"",color:"primary"},on:{click:e.confirmBack}},[e._v(" Cancelar ")]),e.$can(e.UPDATE,e.PERMISSIONS_PIPELINES)?a("v-btn",{attrs:{large:"",tile:"",normal:"",color:"secondary",loading:e.isLoading},on:{click:function(t){return e.updateHandler()}}},[e._v(" Guardar ")]):e._e()],1),a("BaseModalError",{attrs:{modalHandler:e.modalError},on:{close:e.modalHandlerError}}),a("BaseModalDelete",{attrs:{modalHandler:e.modalDelete},on:{cancel:e.modalHandlerDelete,confirm:e.deleteStageWithoutDeals}}),a("ModalDeleteStage",{attrs:{stages:e.stagesToSelect,modalHandler:e.modalDeleteStage},on:{cancel:e.modalHandlerDeleteStage,confirm:e.deleteStageWithDeals}}),a("BaseModalAlert",{attrs:{modalHandler:e.modalAlert},on:{confirm:e.backPipeline,close:e.modalHandlerAlert}})],1)},n=[],s=(a("d3b7"),a("3ca3"),a("ddb0"),a("4de4"),a("7db0"),a("d81d"),a("b0c0"),a("159b"),a("b76a")),r=a.n(s),o=a("9685"),l=a("891c"),d=a("ee2e"),c=a("9500"),u=a("455a"),p=a("a2b6"),g=a("1e6d"),m={name:"PipelineEdit",components:{BaseErrorComponent:function(){return a.e("chunk-2d0abe3b").then(a.bind(null,"16cc"))},ModalDeleteStage:function(){return a.e("chunk-50e6affa").then(a.bind(null,"35d0"))},draggable:r.a},mixins:[g["a"]],data:function(){return{PERMISSIONS_PIPELINES:d["k"],UPDATE:l["r"],originalPipeline:{},editPipeline:{stages:[]},modalDeleteStage:{isOpen:!1,isLoading:!1,infoDelete:{}},stagesToDelete:[],isLoading:!1,isLoadingPage:!0,isError:!1,infoError:{icon:"mdi-alert",title:"error",message:"No se ha podido cargar los tratos, contacte con el soporte"}}},computed:{stagesToSelect:function(){return this.editPipeline.stages.filter((function(e){return e.id}))}},created:function(){var e=this.$route.params.id?this.$route.params.id:"no se encontro id";this.getPipeline(e)},methods:{changeOrderStage:function(e){var t=e.moved,a=t.newIndex,i=t.oldIndex,n=JSON.parse(JSON.stringify(this.editPipeline.stages)),s=n.find((function(e,t){return t===i})),r=n.find((function(e,t){return t===a}));n[i]=s,n[a]=r;var o=n.map((function(e,t){return e.order=t+1,{id:e.id,name:e.name,deals:e.deals,probability:e.probability,maxDays:e.maxDays,order:e.order}}));this.editPipeline.stages=o},getPipeline:function(e){var t=this;this.$apollo.query({query:c["e"],fetchPolicy:"no-cache",variables:{pipelineId:e}}).then((function(e){var a=e.data.pipeline,i=a.id,n=a.name,s=a.stages;s=s.map((function(e){return delete e.__typename,e}));var r=Object(p["a"])({listItems:s,orderBy:"ASC",nextElement:"order"});t.editPipeline={id:i,name:n,stages:r},t.originalPipeline={id:i,name:n,stages:JSON.parse(JSON.stringify(r))},t.isLoadingPage=!1})).catch((function(){t.isError=!0,t.infoError={icon:"mdi-alert-outline",title:"Error",message:"No se ha podido cargar el embudo, contacte con soporte"}}))},updateHandler:function(){var e=this;this.isLoading=!0,this.stagesToDelete.length>0&&(this.stagesToDelete.forEach((function(t){var a=t.fromStage,i=t.toStage;e.deleteStage(a,i)})),this.stagesToDelete=[]);var t={id:this.editPipeline.id,stages:[]};this.originalPipeline.name!==this.editPipeline.name&&(t.name=this.editPipeline.name);var a=JSON.parse(JSON.stringify(this.editPipeline.stages)),i=a.filter((function(t){return!e.originalPipeline.stages.some((function(e){var a=e.name,i=e.probability,n=e.maxDays,s=e.order;return a===t.name&&i===t.probability&&n===t.maxDays&&s===t.order}))})).map((function(e){return"string"===typeof e.maxDays&&(e.maxDays=0),e}));0===i.length&&a.length!==this.originalPipeline.stages.length&&(t.stages=this.editPipeline.stages.map((function(e,t){var a=e.id;return{id:a,order:t+1}}))),i.length>0&&a.forEach((function(e,a){if(i.some((function(t){var a=t.id;return a===e.id}))){var n=i.find((function(t){var a=t.id;return a===e.id}));delete n.deals,n.order=a+1,t.stages.push(n)}else t.stages.push({id:e.id,order:a+1})})),0===t.stages.length&&delete t.stages,this.updatePipeline(t)},updatePipeline:function(e){var t=this;o["a"].can(l["r"],d["k"])&&this.$apollo.mutate({mutation:u["e"],variables:{input:e}}).then((function(e){var a=e.data.updatePipeline.id;t.$router.push({name:"pipeline-id",params:{id:a}})})).catch((function(){t.isLoading=!1;var e="Error no se ha podido actualizar el embudo, intente de nuevo o contacte a soporte";t.modalHandlerError({isOpen:!0,error:e})}))},confirmBack:function(){this.modalHandlerAlert({isOpen:!0,isLoading:!1,message:{text:"Si sale en este momento su configuración se perderá"},info:{}})},backPipeline:function(){window.history.back()},modalHandlerDeleteStage:function(e){var t=e.isOpen,a=e.isLoading,i=e.infoDelete;this.modalDeleteStage={isOpen:t,isLoading:a,infoDelete:i}},deleteStageConfirmation:function(e){var t;(null===(t=e.deals)||void 0===t?void 0:t.length)>0?this.modalHandlerDeleteStage({isOpen:!0,isLoading:!1,infoDelete:{fromStage:e.id}}):this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"La etapa ".concat(e.name),text:"será eliminada del embudo"},infoDelete:{fromStage:e.id}})},deleteStageWithoutDeals:function(e){var t=e.isOpen,a=e.isLoading,i=e.message,n=e.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:a,message:i,infoDelete:n});var s=n.fromStage;this.stagesToDelete.push({existDeals:!1,fromStage:s}),this.editPipeline.stages=this.editPipeline.stages.filter((function(e){return e.id!==s})),this.modalHandlerDelete({isOpen:!1,isLoading:a,message:i,infoDelete:n})},deleteStageWithDeals:function(e){var t=e.isOpen,a=e.isLoading,i=e.message,n=e.infoDelete,s=n.fromStage,r=n.toStage;this.modalHandlerDeleteStage({isOpen:t,isLoading:a,message:i,infoDelete:n}),this.stagesToDelete.push({existDeals:!0,fromStage:s,toStage:r}),this.editPipeline.stages=this.editPipeline.stages.filter((function(e){return e.id!==s})),this.modalHandlerDeleteStage({isOpen:!1,isLoading:!1,message:{},infoDelete:{}})},deleteStage:function(e,t){var a=this;if(o["a"].can(l["r"],d["k"])){var i={};i.fromStage=e,t&&(i.toStage=t),this.$apollo.mutate({mutation:u["c"],variables:{input:i}}).then((function(){a.reorderStages()})).catch((function(){var e="Error, no se ha podido eliminar la etapa, intente de nuevo";a.modalHandlerError({isOpen:!0,error:e})}))}},reorderStages:function(){this.editPipeline.stages=this.editPipeline.stages.map((function(e,t){return e.order=t+1,e}))},addStage:function(){var e={name:"Nueva Etapa",probability:"0",maxDays:0,order:0};this.editPipeline.stages.push(e),this.reorderStages()}}},h=m,f=(a("e697"),a("0c7c")),v=a("6544"),b=a.n(v),S=a("8336"),y=a("b0af"),P=a("99d9"),x=a("62ad"),D=a("a523"),k=a("ce7e"),E=a("132d"),w=a("8860"),L=a("da13"),O=a("e449"),I=a("0fd9"),C=a("3129"),_=a("8654"),$=Object(f["a"])(h,i,n,!1,null,"073ce83c",null);t["default"]=$.exports;b()($,{VBtn:S["a"],VCard:y["a"],VCardActions:P["a"],VCardText:P["c"],VCardTitle:P["d"],VCol:x["a"],VContainer:D["a"],VDivider:k["a"],VIcon:E["a"],VList:w["a"],VListItem:L["a"],VMenu:O["a"],VRow:I["a"],VSkeletonLoader:C["a"],VTextField:_["a"]})},3129:function(e,t,a){"use strict";a("1f09");var i=a("c995"),n=a("24b2"),s=a("7560"),r=a("58df"),o=a("80d2");t["a"]=Object(r["a"])(i["a"],n["a"],s["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:()=>({})}},computed:{attrs(){return this.isLoading?this.boilerplate?{}:{"aria-busy":!0,"aria-live":"polite",role:"alert",...this.$attrs}:this.$attrs},classes(){return{"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile,...this.themeClasses,...this.elevationClasses}},isLoading(){return!("default"in this.$scopedSlots)||this.loading},rootTypes(){return{actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text",...this.types}}},methods:{genBone(e,t){return this.$createElement("div",{staticClass:`v-skeleton-loader__${e} v-skeleton-loader__bone`},t)},genBones(e){const[t,a]=e.split("@"),i=()=>this.genStructure(t);return Array.from({length:a}).map(i)},genStructure(e){let t=[];e=e||this.type||"";const a=this.rootTypes[e]||"";if(e===a);else{if(e.indexOf(",")>-1)return this.mapBones(e);if(e.indexOf("@")>-1)return this.genBones(e);a.indexOf(",")>-1?t=this.mapBones(a):a.indexOf("@")>-1?t=this.genBones(a):a&&t.push(this.genStructure(a))}return[this.genBone(e,t)]},genSkeleton(){const e=[];return this.isLoading?e.push(this.genStructure()):e.push(Object(o["t"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},e):e},mapBones(e){return e.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter(e){this.resetStyles(e),this.isLoading&&(e._initialStyle={display:e.style.display,transition:e.style.transition},e.style.setProperty("transition","none","important"))},onBeforeLeave(e){e.style.setProperty("display","none","important")},resetStyles(e){e._initialStyle&&(e.style.display=e._initialStyle.display||"",e.style.transition=e._initialStyle.transition,delete e._initialStyle)}},render(e){return e("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}})},"455a":function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return p})),a.d(t,"e",(function(){return g})),a.d(t,"d",(function(){return m}));var i,n,s,r,o,l=a("8785"),d=a("5184"),c=Object(d["a"])(i||(i=Object(l["a"])(["\n  mutation CreatePipeline($input: pipelineCreateInput!) {\n    createPipeline(pipelineInput: $input) {\n      id\n    }\n  }\n"]))),u=Object(d["a"])(n||(n=Object(l["a"])(["\n  mutation DeletePipeline($input: pipelineDeleteInput!) {\n    deletePipeline(pipelineInput: $input) {\n      id\n      name\n    }\n  }\n"]))),p=Object(d["a"])(s||(s=Object(l["a"])(["\n  mutation DeleteStage($input: stageDeleteInput!) {\n    deleteStage(stageInput: $input) {\n      id\n      name\n    }\n  }\n"]))),g=Object(d["a"])(r||(r=Object(l["a"])(["\n  mutation UpdatePipeline($input: pipelineUpdateInput!) {\n    updatePipeline(pipelineInput: $input) {\n      id\n      name\n      stages {\n        id\n        name\n        probability\n        maxDays\n        order\n        deals {\n          id\n          title\n          value\n          status\n        }\n      }\n    }\n  }\n"]))),m=Object(d["a"])(o||(o=Object(l["a"])(["\n  mutation DuplicatePipeline($pipelineId: ID!) {\n    duplicatePipeline(pipelineId: $pipelineId) {\n      id\n      name\n    }\n  }\n"])))},"4e827":function(e,t,a){"use strict";var i=a("23e7"),n=a("1c0b"),s=a("7b0b"),r=a("50c4"),o=a("d039"),l=a("addb"),d=a("a640"),c=a("04d1"),u=a("d998"),p=a("2d00"),g=a("512c"),m=[],h=m.sort,f=o((function(){m.sort(void 0)})),v=o((function(){m.sort(null)})),b=d("sort"),S=!o((function(){if(p)return p<70;if(!(c&&c>3)){if(u)return!0;if(g)return g<603;var e,t,a,i,n="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:a=3;break;case 68:case 71:a=4;break;default:a=2}for(i=0;i<47;i++)m.push({k:t+i,v:a})}for(m.sort((function(e,t){return t.v-e.v})),i=0;i<m.length;i++)t=m[i].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}})),y=f||!v||!b||!S,P=function(e){return function(t,a){return void 0===a?-1:void 0===t?1:void 0!==e?+e(t,a)||0:String(t)>String(a)?1:-1}};i({target:"Array",proto:!0,forced:y},{sort:function(e){void 0!==e&&n(e);var t=s(this);if(S)return void 0===e?h.call(t):h.call(t,e);var a,i,o=[],d=r(t.length);for(i=0;i<d;i++)i in t&&o.push(t[i]);o=l(o,P(e)),a=o.length,i=0;while(i<a)t[i]=o[i++];while(i<d)delete t[i++];return t}})},"512c":function(e,t,a){var i=a("342f"),n=i.match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},5604:function(e,t,a){},a2b6:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("3835"),a("4e827"),a("ac1f"),a("1276");var i=function(e){var t=e.listItems,a=void 0===t?[]:t,i=e.orderBy,n=void 0===i?"ASC":i,s=e.nextElement,r=void 0===s?"none":s;return a.sort((function(e,t){var a="none"===r?e-t:e[r]-t[r],i="none"===r?t-e:t[r]-e[r];return"ASC"===n?a:i}))}},addb:function(e,t){var a=Math.floor,i=function(e,t){var r=e.length,o=a(r/2);return r<8?n(e,t):s(i(e.slice(0,o),t),i(e.slice(o),t),t)},n=function(e,t){var a,i,n=e.length,s=1;while(s<n){i=s,a=e[s];while(i&&t(e[i-1],a)>0)e[i]=e[--i];i!==s++&&(e[i]=a)}return e},s=function(e,t,a){var i=e.length,n=t.length,s=0,r=0,o=[];while(s<i||r<n)s<i&&r<n?o.push(a(e[s],t[r])<=0?e[s++]:t[r++]):o.push(s<i?e[s++]:t[r++]);return o};e.exports=i},d998:function(e,t,a){var i=a("342f");e.exports=/MSIE|Trident/.test(i)},e697:function(e,t,a){"use strict";a("5604")}}]);
//# sourceMappingURL=chunk-921741e6.e14c03cb.js.map