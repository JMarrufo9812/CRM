(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-741c4a6d","chunk-7859f8ee","chunk-7859f8ee"],{"0491":function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));t("b64b"),t("ac1f"),t("841c"),t("b0c0"),t("d81d"),t("159b"),t("d3b7");var a=t("59c9"),i=t("6675"),o=t("ee2e"),s={data:function(){return{PERMISSIONS_DEALS:o["f"],inputsForm:[],isLoadingDeals:!1,loadingSearch:!1,isLoadingUpdateDeal:!1,modalDeal:{isOpen:!1,isLoading:!1},infoError:{icon:"mdi-account-search-outline",title:"",message:"No se encontraron tratos"},filters:{search:"",orderBy:"desc",skip:0,take:0,sortBy:[],sortDesc:[],isDelete:!1},listDeals:[],informationBarDeals:{},resultSearchDeals:[],totalDeals:0,searchDeal:"",searchFilters:{search:"",take:5},dealsSelected:[]}},watch:{searchDeal:function(e){e&&(Object.keys(e).length>=2&&(this.searchFilters.search=e,this.searchFilters.take=5,this.getSearchDeals()),0===Object.keys(e).length&&(this.searchFilters.search="",this.searchFilters.take=0,this.getSearchDeals()))},isLoadingDeals:function(e){this.$emit("isLoadingDeals",e)}},computed:{menuProps:function(){return this.searchDeal?{}:{value:!1}}},methods:{modalHandlerDeal:function(e){var n=e.isOpen,t=e.isLoading;this.modalDeal={isOpen:n,isLoading:t}},createDeal:function(e){var n=this,t=e.title,i=e.contact,o=e.company,s=e.value,r=e.tags,d=e.customForms,c=e.expectedCloseDate,l=e.pipeline,m=l.pipelineId,u=l.stageId,p=e.owner;this.modalHandlerDeal({isOpen:!0,isLoading:!0}),this.$apollo.mutate({mutation:a["c"],variables:{input:{title:t,tags:r,customForms:d,expectedCloseDate:c,contact:null!==i&&void 0!==i&&i.id?{id:i.id}:i,company:null!==o&&void 0!==o&&o.id?{id:o.id}:o,value:s,pipelineId:m,stageId:u,ownerId:p.id}}}).then((function(e){var t=e.data.createDeal;n.updateData=!0,n.modalHandlerDeal({isOpen:!1,isLoading:!1}),"pipeline-id"===n.$route.name&&n.updateViewPipeline(n.$route.params.id),n.updateData=!0,setTimeout((function(){n.updateData=!1}),10),n.$emit("updateHistory"),"CONTACT"!==n.typeItem&&"COMPANY"!==n.typeItem||(n.updateHistory(),n.addDeal(t))})).catch((function(){var e="No se pudo crear el trato intente de nuevo o contacte al soporte";n.modalHandlerError({isOpen:!0,error:e})}))},updateDeal:function(e){var n=this,t=e.id,i=e.value,o=e.expectedCloseDate,s=e.company,r=e.contact,d=e.tags,c=e.status,l=e.comments,m=e.lostReason,u=e.owner,p=e.title,h=e.customForm;this.isLoadingUpdateDeal=!0;var f={};f.id=t,(i||0===i)&&(f.value=i),(o||void 0!==o)&&(f.expectedCloseDate=o),s&&(f.company=s),r&&(f.contact=r),d&&(f.tags=d),u&&(f.ownerId=u.id),p&&(f.title=p),h&&(f.customForm=h),c&&(f.status=c,"LOST"===c&&(f.comments=l,f.lostReason=m)),this.$apollo.mutate({mutation:a["i"],variables:{input:f}}).then((function(e){var t=e.data.updateDeal;"LOST"===f.status&&n.modalHandlerLostDeal({isOpen:!1,isLoading:!1}),n.$emit("updateItem",t),n.$emit("updateHistory"),n.isLoadingUpdateDeal=!1,"CONTACT"!==n.typeItem&&"COMPANY"!==n.typeItem||(n.updateHistory(),n.addDeal(t))})).catch((function(){n.isLoadingUpdateDeal=!1;var e="No se pudo actualizar el trato, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))},getSearchDeals:function(){var e=this;this.loadingSearch=!0,this.$apollo.query({query:i["f"],fetchPolicy:"no-cache",variables:{filters:this.searchFilters}}).then((function(n){var t=n.data.deals;e.resultSearchDeals=t.list,e.loadingSearch=!1})).catch((function(){e.loadingSearch=!1}))},getDeals:function(){var e=this;this.isLoadingDeals=!0,this.$apollo.query({query:i["b"],fetchPolicy:"no-cache",variables:{filters:this.filters,importId:this.$route.query.filterId}}).then((function(n){var t=n.data.deals;e.isLoadingDeals=!1,e.$emit("deals",t.list),e.$emit("informationBar",t.informationBar),e.listDeals=t.list.map((function(e){return e.customForms&&e.customForms.forEach((function(n){var t=n.id,a=n.value;e[t]=a})),e})),e.totalDeals=t.count,e.isErrorDeals=!1,e.$emit("endUpdateData")})).catch((function(){e.isErrorDeals=!0,e.isLoadingDeals=!1,e.listDeals=[],e.totalDeals=0,e.$emit("endUpdateData"),e.infoError={icon:"mdi-alert-outline",title:"Error",message:"No se ha podido cargar ningún trato, intente de nuevo o contacte a soporte"}}))},restoreDealsConfirmation:function(){this.modalHandlerRestore({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que deseas restaurar?",nameItem:"Los tratos seleccionados",text:"serán restaurados"},infoRestore:{}})},restoreDeals:function(e){var n=this,t=e.isOpen,i=e.isLoading,o=e.message,s=e.infoRestore;this.modalHandlerRestore({isOpen:t,isLoading:i,message:o,infoRestore:s}),this.$apollo.mutate({mutation:a["g"],variables:{input:this.dealsSelected},update:function(){n.updateData=!0,n.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron restaurados correctamente"})}}).finally((function(){n.modalHandlerRestore({isOpen:!1,isLoading:i,message:o,infoRestore:s}),n.updateData=!1})).catch((function(){var e="No se pudo restaurar el trato intente de nuevo o contacte al soporte";n.modalHandlerError({isOpen:!0,error:e})}))},deleteDealConfirmation:function(e,n){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que deseas mover a la papelera?",nameItem:"Los tratos seleccionados",text:"serán movidos a la papelera"},infoDelete:{type:e,deals:n}})},deleteDeal:function(e){var n=this,t=e.isOpen,i=e.isLoading,o=e.message,s=e.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:i,message:o,infoDelete:s}),this.$apollo.mutate({mutation:a["e"],variables:{input:s.deals},update:function(){n.updateData=!0,n.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron eliminados correctamente"})}}).finally((function(){n.updateData=!1,n.modalHandlerDelete({isOpen:!1,isLoading:i,message:o,infoDelete:s})})).catch((function(){var e="No se pudo eliminar el trato intente de nuevo o contacte al soporte";n.modalHandlerError({isOpen:!0,error:e})}))},trashDealsConfirmation:function(e,n){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"Los tratos seleccionados",text:"serán eliminados permanentemente"},infoDelete:{type:e,deals:n}})},trashDeals:function(e){var n=this,t=e.isOpen,i=e.isLoading,o=e.message,s=e.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:i,message:o,infoDelete:s}),this.$apollo.mutate({mutation:a["h"],variables:{input:s.deals},update:function(){n.updateData=!0,n.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron eliminados correctamente"})}}).finally((function(){n.updateData=!1,n.modalHandlerDelete({isOpen:!1,isLoading:i,message:o,infoDelete:s})})).catch((function(){var e="No se pudo eliminar el trato intente de nuevo o contacte al soporte";n.modalHandlerError({isOpen:!0,error:e})}))},goToProfile:function(e){this.$router.push("/deal/".concat(e))}}}},"129f":function(e,n){e.exports=Object.is||function(e,n){return e===n?0!==e||1/e===1/n:e!=e&&n!=n}},"231e":function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return p})),t.d(n,"e",(function(){return h})),t.d(n,"d",(function(){return f})),t.d(n,"f",(function(){return y})),t.d(n,"c",(function(){return v})),t.d(n,"g",(function(){return D}));var a,i,o,s,r,d,c,l=t("8785"),m=t("5184"),u=Object(m["a"])(a||(a=Object(l["a"])(["\n  mutation createCompany($input: companyCreateInput!) {\n    createCompany(companyInput: $input) {\n      id\n      name\n      address\n      website\n      phones\n      socialMedias\n      owner {\n        id\n        user {\n          id\n          name\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      contacts {\n        id\n        name\n      }\n    }\n  }\n"]))),p=Object(m["a"])(i||(i=Object(l["a"])(["\n  mutation deletedCompanies($input: [DeleteCompanyInput!]!) {\n    deletedCompanies(companies: $input) {\n      id\n      name\n    }\n  }\n"]))),h=Object(m["a"])(o||(o=Object(l["a"])(["\n  mutation trashCompanies($input: [DeleteCompanyInput!]!) {\n    trashCompanies(companies: $input) {\n      id\n    }\n  }\n"]))),f=Object(m["a"])(s||(s=Object(l["a"])(["\n  mutation restoreCompanies($input: [DeleteCompanyInput!]!) {\n    restoreCompanies(companies: $input) {\n      id\n    }\n  }\n"]))),y=Object(m["a"])(r||(r=Object(l["a"])(["\n  mutation updateCompany($companyInput: companyUpdateInput!) {\n    updateCompany(companyInput: $companyInput) {\n      id\n      name\n      address\n      website\n      phones\n      customForms\n      socialMedias\n      tags {\n        id\n        name\n        color\n        order\n      }\n      owner {\n        id\n        user {\n          id\n          name\n        }\n      }\n      contacts {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      deals {\n        id\n        title\n        value\n        status\n        contact {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        stage {\n          id\n        }\n        pipeline {\n          id\n          stages {\n            id\n          }\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),v=Object(m["a"])(d||(d=Object(l["a"])(["\n  mutation FuseCompanies($input: CompaniesToFuse!) {\n    fuseCompanies(fuse: $input) {\n      id\n      name\n    }\n  }\n"]))),D=Object(m["a"])(c||(c=Object(l["a"])(["\n  mutation assignCompanies($companyListAssign: CompanyListAssign!) {\n    assignCompanies(companyListAssign: $companyListAssign)\n  }\n"])))},"59c9":function(e,n,t){"use strict";t.d(n,"c",(function(){return y})),t.d(n,"i",(function(){return v})),t.d(n,"e",(function(){return D})),t.d(n,"h",(function(){return g})),t.d(n,"g",(function(){return C})),t.d(n,"b",(function(){return b})),t.d(n,"a",(function(){return O})),t.d(n,"d",(function(){return S})),t.d(n,"f",(function(){return L})),t.d(n,"j",(function(){return I})),t.d(n,"k",(function(){return E}));var a,i,o,s,r,d,c,l,m,u,p,h=t("8785"),f=t("5184"),y=Object(f["a"])(a||(a=Object(h["a"])(["\n  mutation CreateDeal($input: CreateDeal!) {\n    createDeal(dealInput: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      rottenTime\n      owner {\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      company {\n        id\n        name\n      }\n      contact {\n        id\n        name\n      }\n      stage {\n        id\n        name\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n    }\n  }\n"]))),v=Object(f["a"])(i||(i=Object(h["a"])(["\n  mutation UpdateDeal($input: UpdateDeal!) {\n    updateDeal(dealInput: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      contact {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n    }\n  }\n"]))),D=Object(f["a"])(o||(o=Object(h["a"])(["\n  mutation deletedDeals($input: [DeleteDealInput!]!) {\n    deletedDeals(deals: $input) {\n      id\n    }\n  }\n"]))),g=Object(f["a"])(s||(s=Object(h["a"])(["\n  mutation trashDeals($input: [DeleteDealInput!]!) {\n    trashDeals(deals: $input) {\n      id\n    }\n  }\n"]))),C=Object(f["a"])(r||(r=Object(h["a"])(["\n  mutation restoreDeals($input: [DeleteDealInput!]!) {\n    restoreDeals(deals: $input) {\n      id\n    }\n  }\n"]))),b=Object(f["a"])(d||(d=Object(h["a"])(["\n  mutation ChangeDealStage($input: ChangeStage!) {\n    changeDealStage(input: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      dateEntryIntoStage\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n      }\n      contact {\n        id\n        name\n        isDelete\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n        maxDays\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),O=Object(f["a"])(c||(c=Object(h["a"])(["\n  mutation changeDealPipeline($input: changePipelineInput!) {\n    changeDealPipeline(input: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n      }\n      contact {\n        id\n        name\n        isDelete\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),S=Object(f["a"])(l||(l=Object(h["a"])(["\n  mutation CreateLostReason($input: lostReasonCreateInput!) {\n    createLostReason(lostReasonInput: $input) {\n      id\n      reason\n    }\n  }\n"]))),L=Object(f["a"])(m||(m=Object(h["a"])(["\n  mutation DeleteLostReason($lostReasonId: ID!) {\n    deleteLostReason(lostReasonId: $lostReasonId) {\n      id\n      reason\n    }\n  }\n"]))),I=Object(f["a"])(u||(u=Object(h["a"])(["\n  mutation UpdateLostReason($input: lostReasonUpdateInput!) {\n    updateLostReason(lostReasonInput: $input) {\n      id\n      reason\n    }\n  }\n"]))),E=Object(f["a"])(p||(p=Object(h["a"])(["\n  mutation assignDeals($dealListAssign: DealListAssign!) {\n    assignDeals(dealListAssign: $dealListAssign)\n  }\n"])))},"714d":function(e,n,t){},"841c":function(e,n,t){"use strict";var a=t("d784"),i=t("825a"),o=t("1d80"),s=t("129f"),r=t("14c3");a("search",(function(e,n,t){return[function(n){var t=o(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,t):new RegExp(n)[e](String(t))},function(e){var a=t(n,this,e);if(a.done)return a.value;var o=i(this),d=String(e),c=o.lastIndex;s(c,0)||(o.lastIndex=0);var l=r(o,d);return s(o.lastIndex,c)||(o.lastIndex=c),null===l?-1:l.index}]}))},"9f18":function(e,n,t){"use strict";t("714d")},cd9b:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("v-card",{attrs:{flat:""}},[t("v-divider"),t("v-card-title",{staticClass:"company-name py-1"},[t("v-icon",{staticClass:"mr-4",attrs:{color:"primary"}},[e._v("mdi-domain")]),e._v(" Empresa "),t("v-spacer"),!e.canEditDeal&&!e.canEditDealOthers||e.item.isDelete?e._e():t("v-menu",{attrs:{"close-on-content-click":!1,left:"","nudge-right":"30","nudge-bottom":"-20",absolute:""},scopedSlots:e._u([{key:"activator",fn:function(n){var a=n.on;return[t("v-tooltip",{directives:[{name:"show",rawName:"v-show",value:(e.canEditDeal||e.canEditDealOthers)&&!e.item.isDelete,expression:"(canEditDeal || canEditDealOthers) && !item.isDelete"}],attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(n){var i=n.on;return[t("v-btn",e._g({attrs:{icon:"",loading:e.isLoadingUpdateDeal},on:{click:function(n){e.isShowAddCompany=!e.isShowAddCompany}}},Object.assign({},a,i)),[t("v-icon",{attrs:{color:"secondary"}},[e._v(" "+e._s(e.companySelected?"mdi-compare-horizontal":"mdi-plus")+" ")])],1)]}}],null,!0)},[t("span",[e._v(e._s(e.companySelected?"Reemplazar":"Agregar"))])])]}}],null,!1,171882926),model:{value:e.isShowAddCompany,callback:function(n){e.isShowAddCompany=n},expression:"isShowAddCompany"}},[t("v-card",{staticClass:"pa-4",attrs:{width:"18em"}},[t("v-form",{ref:"formCompany"},[t("FieldSelectCompanySimple",{attrs:{inputProps:{class:"no-icon full-width",isDense:!0},resetHandler:e.isShowAddCompany},on:{outData:e.updateCompany,deleteData:e.deleteCompany}})],1),t("div",{staticClass:"d-flex justify-center pt-2 ml-2"},[t("v-btn",{staticClass:"mr-2",staticStyle:{width:"45%"},attrs:{color:"primary",outlined:"",small:"",disabled:e.isLoadingUpdateDeal},on:{click:e.cancel}},[e._v(" Cancelar ")]),!e.canEditDeal&&!e.canEditDealOthers||e.item.isDelete?e._e():t("v-btn",{staticStyle:{width:"45%"},attrs:{color:"secondary",loading:e.isLoadingUpdateDeal,small:"",disabled:e.disabledAddButton},on:{click:e.addCompany}},[e._v(" Guardar ")])],1)],1)],1)],1),t("v-divider"),t("v-card-text",{staticClass:"pa-0"},[e.companySelected&&null!==e.companySelected&&void 0!==e.companySelected?t("v-list-item",{staticClass:"Company",attrs:{outlined:""}},[t("v-list-item-content",[t("v-list-item-title",{staticClass:"Company__title"},[[t("div",{staticClass:"Company__box",on:{click:function(n){return e.goCompany(e.companySelected.id)}}},[t("v-icon",[e._v("mdi-office-building")]),t("span",{staticClass:"Company__box_name"},[e._v(" "+e._s(e.companySelected.name)+" "),e.companySelected.isDelete?t("b",{staticClass:"font-weight-bold",staticStyle:{color:"red"}},[e._v(" (Eliminado) ")]):e._e()])],1)]],2)],1),e.isLoadingRemove?t("v-list-item-action",[t("v-progress-circular",{attrs:{size:20,color:"secondary",indeterminate:""}})],1):e._e(),e.isLoadingRemove||!e.canEditDeal&&!e.canEditDealOthers||e.item.isDelete?e._e():t("v-list-item-action",{staticClass:"Company__edit mt-4"},[t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(n){var a=n.on,i=n.attrs;return[t("v-btn",e._g(e._b({staticClass:"mr-1 mt-2",attrs:{"x-small":"",outlined:"",color:"grey"},on:{click:function(n){return n.stopPropagation(),e.disconnectCompany(e.companySelected.id)}}},"v-btn",i,!1),a),[t("v-icon",{attrs:{small:"",color:"grey"}},[e._v("mdi-connection")])],1)]}}],null,!1,2206051549)},[t("span",[e._v("Desvincular")])]),!e.canEditCompany&&!e.canEditCompanyOthers||e.item.isDelete?e._e():t("v-menu",{attrs:{"close-on-content-click":!1,left:""},scopedSlots:e._u([{key:"activator",fn:function(n){var a=n.on;return[t("v-tooltip",{directives:[{name:"show",rawName:"v-show",value:(e.canEditCompany||e.canEditCompanyOthers)&&!e.item.isDelete,expression:"\n                  (canEditCompany || canEditCompanyOthers) && !item.isDelete\n                "}],attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(n){var i=n.on;return[t("v-btn",e._g({staticClass:"mt-2",attrs:{"x-small":"",color:"secondary"},on:{click:function(n){e.isEdit=!0}}},Object.assign({},a,i)),[t("v-icon",{attrs:{small:"",color:"white"}},[e._v("mdi-pencil")])],1)]}}],null,!0)},[t("span",[e._v("Cambiar nombre")])])]}}],null,!1,605361110),model:{value:e.isEdit,callback:function(n){e.isEdit=n},expression:"isEdit"}},[t("v-card",{staticClass:"pa-4",attrs:{width:"18em"}},[t("v-form",{ref:"formCompany",attrs:{"lazy-validation":""},model:{value:e.isValidateFormName,callback:function(n){e.isValidateFormName=n},expression:"isValidateFormName"}},[t("v-text-field",{attrs:{rules:e.rules.general,label:"Nombre","hide-details":"auto",maxlength:"50",dense:"",outlined:""},model:{value:e.companyName,callback:function(n){e.companyName=n},expression:"companyName"}}),t("div",{staticClass:"d-flex justify-center mt-1"},[t("v-btn",{staticClass:"mr-2",staticStyle:{width:"48%"},attrs:{small:"",color:"primary",outlined:"",disables:e.isLoadingChangeName,tile:""},on:{click:e.cancelEdit}},[e._v(" Cancelar ")]),!e.canEditCompany&&!e.canEditCompanyOthers||e.item.isDelete?e._e():t("v-btn",{staticStyle:{width:"48%"},attrs:{tile:"",loading:e.isLoadingChangeName,small:"",color:"secondary"},on:{click:function(n){return e.updateName({id:e.companySelected.id,name:e.companyName})}}},[e._v(" Guardar ")])],1)],1)],1)],1)],1)],1):t("div",{staticClass:"pa-2 text-center"},[t("span",[e._v(" No tiene empresa ")])])],1)],1),t("BaseModalError",{attrs:{modalHandler:e.modalError},on:{close:e.modalHandlerError}})],1)},i=[],o=(t("d3b7"),t("3ca3"),t("ddb0"),t("b0c0"),t("b64b"),t("4b58")),s=t("9685"),r=t("ee2e"),d=t("231e"),c=t("f82a"),l=t("e815"),m=t("891c"),u=t("1e6d"),p=t("0491"),h={name:"DealCompany",components:{FieldSelectCompanySimple:function(){return t.e("chunk-7a875db0").then(t.bind(null,"8be5"))}},mixins:[c["a"],u["a"],p["a"]],props:{item:{type:Object,required:!0},itemId:{type:String,default:"",required:!0},typeItem:{type:String,required:!0,default:"DEAL"},ownerId:{type:String,default:""},companySelected:{type:Object,default:function(){return{}}}},data:function(){return{UPDATE:m["r"],UPDATE_OTHERS:m["s"],PERMISSIONS_DEALS:r["f"],PERMISSIONS_COMPANIES:r["d"],isEdit:!1,searchCompanies:{},companyName:"",isLoading:!1,isLoadingRemove:!1,isShowAddCompany:!1,isValidateFormName:!0,isLoadingChangeName:!1,companyNew:{id:"",name:""},userCurrent:{}}},created:function(){var e;this.companyName=(null===(e=this.companySelected)||void 0===e?void 0:e.name)||""},computed:{canEditDeal:function(){return"DEAL"===this.typeItem&&s["a"].can(m["r"],Object(o["b"])(r["f"],{authorId:this.ownerId||""}))},canEditDealOthers:function(){return this.canEditDeal?s["a"].can(m["s"],r["f"]):s["a"].can(m["s"],r["f"])&&!s["a"].can(m["s"],Object(o["b"])(r["f"],{authorId:this.ownerId||""}))},canEditCompany:function(){var e,n;return"DEAL"===this.typeItem&&s["a"].can(m["r"],Object(o["b"])(r["d"],{authorId:(null===(e=this.companySelected)||void 0===e||null===(n=e.owner)||void 0===n?void 0:n.id)||""}))},canEditCompanyOthers:function(){var e,n;return this.canEditCompany?s["a"].can(m["s"],r["d"]):s["a"].can(m["s"],r["d"])&&!s["a"].can(m["s"],Object(o["b"])(r["d"],{authorId:(null===(e=this.companySelected)||void 0===e||null===(n=e.owner)||void 0===n?void 0:n.id)||""}))},disabledAddButton:function(){return!this.companyNew.id&&!this.companyNew.name}},watch:{companySelected:function(){var e;this.companyName=(null===(e=this.companySelected)||void 0===e?void 0:e.name)||""},isLoadingUpdateDeal:function(e){e||(this.company="",this.isShowAddCompany&&this.$refs.formCompany.reset(),this.isShowAddCompany=!1,this.isLoadingRemove=!1,this.companyNew={id:"",name:""})}},methods:{updateCompany:function(e,n){this.companyNew=n},deleteCompany:function(){this.companyNew={id:"",name:""}},goCompany:function(e){this.$router.push({name:"company",params:{id:e}},(function(){}))},cancel:function(){this.company="",this.companyNew={id:"",name:""},this.isShowAddCompany=!1,this.isValidate=!1},addCompany:function(){(this.canEditDeal||this.canEditDealOthers)&&0!==Object.keys(this.companyNew).length&&(this.isLoading=!0,this.updateDeal({id:this.itemId,company:this.companyNew}))},disconnectCompany:function(){(this.canEditDeal||this.canEditDealOthers)&&(this.isLoadingRemove=!0,this.updateDeal({id:this.itemId,company:{id:""}}))},updateName:function(e){var n=this,t=e.id,a=e.name;this.canEditCompany&&(this.$refs.formCompany.validate(),this.isValidateFormName&&(this.isLoadingChangeName=!0,this.$apollo.mutate({mutation:d["f"],variables:{companyInput:{id:t,name:a}}}).then((function(e){var t=e.data.updateCompany;n.$emit("updateDealCompany",t),n.isLoadingChangeName=!1,n.isEdit=!1,n.isValidateFormName=!1})).catch((function(){n.isLoadingChangeName=!1,n.isValidateFormName=!1;var e="No se pudo actualizar el nombre de la empresa, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))))},text:function(e){return"".concat(e.name)},cancelEdit:function(){this.companyName=this.companySelected.name,this.isEdit=!1}},apollo:{userCurrent:{query:l["k"]}}},f=h,y=(t("9f18"),t("0c7c")),v=t("6544"),D=t.n(v),g=t("8336"),C=t("b0af"),b=t("99d9"),O=t("ce7e"),S=t("4bd4"),L=t("132d"),I=t("da13"),E=t("1800"),w=t("5d23"),$=t("e449"),N=t("490a"),j=t("2fa4"),_=t("8654"),x=t("3a2f"),k=Object(y["a"])(f,a,i,!1,null,"3e9a0da0",null);n["default"]=k.exports;D()(k,{VBtn:g["a"],VCard:C["a"],VCardText:b["c"],VCardTitle:b["d"],VDivider:O["a"],VForm:S["a"],VIcon:L["a"],VListItem:I["a"],VListItemAction:E["a"],VListItemContent:w["a"],VListItemTitle:w["c"],VMenu:$["a"],VProgressCircular:N["a"],VSpacer:j["a"],VTextField:_["a"],VTooltip:x["a"]})}}]);
//# sourceMappingURL=chunk-741c4a6d.5b697905.js.map