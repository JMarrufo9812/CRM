(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38e3affc"],{"01b2":function(n,e,t){},"0f93":function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-container",{staticStyle:{height:"100%"},attrs:{fluid:""}},[t("v-row",[t("v-col",{staticClass:"header-search",attrs:{cols:"8"}},[t("p",{staticClass:"ml-6 my-4"},[n._v(" "+n._s(n.title)+" ")])]),t("v-col",{staticClass:"header-search",attrs:{cols:"4"}},[n.$route.query.filterId||n.$route.query.recyclebin?n._e():t("v-text-field",{staticClass:"py-2 pr-8",attrs:{color:"#ffffff",label:"Buscar",outlined:"",dense:"","append-icon":"mdi-magnify","hide-details":"auto",dark:!0},model:{value:n.searchCompany,callback:function(e){n.searchCompany=e},expression:"searchCompany"}})],1),t("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[t("CompaniesDataTable",{attrs:{updateData:n.updateData,headers:n.formatHeaders,searchCompany:n.searchCompany},on:{selectCompanies:n.updateSelectCompanies,endUpdateData:function(e){n.updateData=!1},changeHeaderOrder:n.updateHeaders,companies:n.updateCompaniesShow,informationBar:n.updateInformationBar},scopedSlots:n._u([{key:"top",fn:function(){return[t("v-col",{staticClass:"white py-6 pl-12",attrs:{cols:"6"}},[n.$route.query.filterId||n.$route.query.recyclebin?n._e():t("v-menu",{attrs:{bottom:"","offset-y":""},scopedSlots:n._u([{key:"activator",fn:function(e){var a=e.on;return[t("v-tooltip",{attrs:{bottom:""},scopedSlots:n._u([{key:"activator",fn:function(e){var i=e.on;return[t("v-btn",n._g({staticClass:"mr-4",attrs:{outlined:""}},Object.assign({},a,i)),[t("v-icon",[n._v("mdi-cog")])],1)]}}],null,!0)},[t("span",[n._v("Configuraciones")])])]}}],null,!1,1819942147)},[t("v-list",{attrs:{dense:""}},[t("ListHeaders",{attrs:{type:n.viewInfo.type,headers:n.headers,form:n.getForm},on:{outData:n.updateHeaders}}),n.$can(n.FUSE,n.PERMISSIONS_COMPANIES)?t("v-list-item",{staticClass:"text-list-menu",on:{click:n.getDuplicateCompanies}},[t("v-icon",{staticClass:"mr-2",attrs:{color:"primary"}},[n._v(" mdi-account-switch-outline ")]),n._v(" Buscar duplicados ")],1):n._e(),n.$can(n.EXPORT,n.PERMISSIONS_COMPANIES)?t("v-list-item",{staticClass:"text-list-menu",on:{click:function(e){return n.modalHandlerExport({isOpen:!0})}}},[t("v-icon",{attrs:{color:"primary",left:""}},[n._v(" mdi-clipboard-arrow-up-outline ")]),n._v(" Exportar Empresas ")],1):n._e(),t("v-list-item",{staticClass:"text-list-menu",on:{click:function(e){return n.$router.push({path:"/companies",query:{recyclebin:!0}})}}},[t("v-icon",{staticClass:"mr-2",attrs:{color:"primary"}},[n._v(" mdi-delete-outline ")]),n._v(" Papelera de reciclaje ")],1)],1)],1),n.$can(n.BULK_DELETE,n.PERMISSIONS_ADMIN)?t("v-tooltip",{attrs:{bottom:""},scopedSlots:n._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[t("v-btn",n._g(n._b({directives:[{name:"show",rawName:"v-show",value:n.companiesSelected.length>=1,expression:"companiesSelected.length >= 1"}],staticClass:"mr-2 text-white",attrs:{color:"secondary"},on:{click:function(e){n.$route.query.recyclebin?n.trashCompanyConfirmation():n.deleteCompanyConfirmation()}}},"v-btn",i,!1),a),[t("v-icon",[n._v("mdi-delete")])],1)]}}],null,!1,379821283)},[t("span",[n._v(" "+n._s(n.$route.query.recyclebin?"Eliminar Permanentemente":"Mover a papelera")+" ")])]):n._e(),n.$can(n.BULK_DELETE,n.PERMISSIONS_ADMIN)&&n.$route.query.recyclebin?t("v-tooltip",{attrs:{bottom:""},scopedSlots:n._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[t("v-btn",n._g(n._b({directives:[{name:"show",rawName:"v-show",value:n.companiesSelected.length>=1,expression:"companiesSelected.length >= 1"}],staticClass:"mr-2 text-white",attrs:{color:"#396A5D"},on:{click:n.restoreCompaniesConfirmation}},"v-btn",i,!1),a),[t("v-icon",{attrs:{color:"white"}},[n._v("mdi-restore")])],1)]}}],null,!1,3126916911)},[t("span",[n._v("Restaurar")])]):n._e(),n.$route.query.recyclebin?n._e():t("ChangeOwner",{attrs:{isOpen:n.isOpenMenuOwner,isLoading:n.isLoading,typeItem:n.typeItem,itemsSelected:n.companiesSelected},on:{"update:isOpen":function(e){n.isOpenMenuOwner=e},"update:is-open":function(e){n.isOpenMenuOwner=e},success:n.changeOwnerSuccess,error:n.changeOwnerError},scopedSlots:n._u([{key:"activator",fn:function(){return[n.$can(n.TO_ASSIGN,n.PERMISSIONS_ADMIN)?t("v-tooltip",{attrs:{bottom:""},scopedSlots:n._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[t("v-btn",n._g(n._b({directives:[{name:"show",rawName:"v-show",value:n.companiesSelected.length>=1,expression:"companiesSelected.length >= 1"}],staticClass:"mr-2",attrs:{color:"primary"},on:{click:function(e){n.isOpenMenuOwner=!0}}},"v-btn",Object.assign({},i),!1),Object.assign({},a)),[t("v-icon",[n._v("mdi-account-switch")])],1)]}}],null,!1,2357084742)},[t("span",[n._v("Cambiar propietario")])]):n._e()]},proxy:!0}],null,!1,1146456264)})],1),t("v-col",{staticClass:"d-flex justify-end white py-6 pr-12",attrs:{cols:"6"}},[n.$route.query.filterId||n.$route.query.recyclebin?n._e():t("MenuFilters",{attrs:{filters:n.customFilters},on:{action:n.actionsHandler},scopedSlots:n._u([{key:"text-button",fn:function(){return[t("span",[n._v(" "+n._s(n.filterSelected.isFilterSelected?n.filterSelected.name:"Filtros")+" ")])]},proxy:!0}],null,!1,1423877413)}),n.$route.query.filterId||n.$route.query.recyclebin?n._e():t("v-menu",{attrs:{"offset-y":"",left:"",ransition:"scale-transition"},scopedSlots:n._u([{key:"activator",fn:function(e){var a=e.on;return[t("v-btn",n._g({staticClass:"ml-4",attrs:{color:"secondary",small:"",fab:"",depressed:""}},a),[t("v-icon",{attrs:{dark:""}},[n._v("mdi-plus")])],1)]}}],null,!1,3407158034)},[t("v-list",{attrs:{dense:""}},[t("v-list-item",{staticClass:"text-list-menu",on:{click:function(e){return n.modalHandlerCompany({isOpen:!0,isLoading:!1})}}},[t("v-icon",{attrs:{color:"primary",left:""}},[n._v("mdi-domain-plus")]),n._v(" Nueva Empresa ")],1),n.$can(n.IMPORT,n.PERMISSIONS_COMPANIES)?t("v-list-item",{staticClass:"text-list-menu",on:{click:function(e){return n.modalHandlerImport({isOpen:!0})}}},[t("v-icon",{attrs:{color:"primary",left:""}},[n._v(" mdi-clipboard-arrow-down-outline ")]),n._v(" Importar Empresas ")],1):n._e()],1)],1),n.$route.query.filterId||n.$route.query.recyclebin?t("v-btn",{staticClass:"mr-2",attrs:{outlined:""},on:{click:n.goToAllCompanies}},[n._v(" Ver todas las empresas ")]):n._e()],1)]},proxy:!0}])})],1),!n.$route.query.recyclebin&&n.informationBar.totalCount?t("v-col",{staticClass:"d-inline-flex white mt-10 pl-12 pt-8",attrs:{cols:"12"}},[t("div",{staticClass:"d-inline-flex mr-12"},[t("p",{staticClass:"mr-10 footer-title"},[n._v("Total")]),t("p",{staticClass:"footer-info"},[n._v(n._s(n.informationBar.totalCount))])]),t("div",{staticClass:"d-inline-flex mr-12"},[t("p",{staticClass:"footer-title-info mr-4"},[n._v("Con tratos abiertos")]),t("p",{staticClass:"footer-info"},[n._v(n._s(n.informationBar.companiesWithOpenDeals))])]),t("div",{staticClass:"d-inline-flex mr-12"},[t("p",{staticClass:"footer-title-info mr-4"},[n._v("Con tratos ganados")]),t("p",{staticClass:"footer-info"},[n._v(n._s(n.informationBar.companiesWithWonDeals))])])]):n._e()],1),t("BaseModalError",{attrs:{modalHandler:n.modalError},on:{close:n.modalHandlerError}}),t("ModalCompany",{attrs:{inputs:n.inputsForm,modalHandler:n.modalCompany},on:{close:n.modalHandlerCompany,outData:n.createCompany}}),t("ModalFilter",{attrs:{modalHandler:n.modalFilter,type:n.viewInfo},on:{outData:n.outDataFilterHandler,close:n.modalHandlerFilter}}),t("ModalCompaniesDuplicate",{attrs:{modalHandler:n.modalMergeDuplicates,companies:n.duplicateList},on:{correctDuplicate:n.correctDuplicate,close:n.modalHandlerMergeDuplicates}}),t("ModalExportData",{attrs:{typeItems:n.viewInfo,items:n.companies,headers:n.formatHeaders,modalHandler:n.modalExport},on:{close:n.modalHandlerExport}}),t("ModalImportData",{attrs:{typeItems:n.viewInfo,modalHandler:n.modalImport,form:n.getForm},on:{close:n.modalHandlerImport}}),t("BaseModalDelete",{attrs:{modalHandler:n.modalDelete},on:{cancel:n.modalHandlerDelete,confirm:n.confirmHandler}}),t("BaseModalRestore",{attrs:{modalHandler:n.modalRestore},on:{confirm:n.restoreCompanies,cancel:n.modalHandlerRestore}}),t("v-snackbar",{attrs:{color:n.snackbar.color,timeout:5e3},scopedSlots:n._u([{key:"action",fn:function(){return[t("v-btn",{attrs:{text:""},on:{click:function(e){return n.snackbarHandler({isOpen:!1,color:"",text:""})}}},[n._v(" Cerrar ")])]},proxy:!0}]),model:{value:n.snackbar.isOpen,callback:function(e){n.$set(n.snackbar,"isOpen",e)},expression:"snackbar.isOpen"}},[n._v(" "+n._s(n.snackbar.text)+" ")])],1)},i=[],s=t("1da1"),o=(t("96cf"),t("d3b7"),t("3ca3"),t("ddb0"),t("99af"),t("d81d"),t("1b56")),r=t("9685"),c=t("891c"),l=t("ee2e"),d=t("a2b6"),m=t("e50e"),u=t("231e"),p=t("1599"),f=t("1e6d"),v=t("4420"),y=t("5ff3"),h=t("1de0"),C=t("af8d"),b=t("3a72"),g=t("f82aa"),O={components:{CompaniesDataTable:function(){return Promise.all([t.e("chunk-47120d2e"),t.e("chunk-4a5f46a6"),t.e("chunk-38ea9f6c")]).then(t.bind(null,"8821"))},ModalCompany:function(){return t.e("chunk-2623a114").then(t.bind(null,"9844"))},ModalFilter:function(){return t.e("chunk-68670e43").then(t.bind(null,"1c33"))},MenuFilters:function(){return t.e("chunk-59dc59e6").then(t.bind(null,"580d"))},ModalCompaniesDuplicate:function(){return t.e("chunk-630457e8").then(t.bind(null,"8eb3"))},ListHeaders:function(){return t.e("chunk-4c3f2f2c").then(t.bind(null,"ee7a"))},ChangeOwner:o["a"]},mixins:[f["a"],v["a"],y["a"],h["a"],C["a"],b["a"],g["a"]],data:function(){return{typeItem:"COMPANY",isOpenMenuOwner:!1,isLoading:!1,viewInfo:{type:"COMPANY",name:"Empresas"},CREATE:c["d"],DELETE:c["g"],BULK_DELETE:c["c"],TO_ASSIGN:c["q"],EXPORT:c["k"],IMPORT:c["n"],FUSE:c["l"],PERMISSIONS_COMPANIES:l["d"],PERMISSIONS_ADMIN:l["b"],updateData:!1,inputsForm:[],companies:[],informationBar:{},companiesSelected:[],menu:!1,searchCompany:"",modalCompany:{isOpen:!1,isLoading:!1}}},watch:{getForm:function(n){var e=n.defaultForm,t=n.customForm,a=t.inputs?e.inputs.concat(t.inputs):e.inputs;this.inputsForm=Object(d["a"])({listItems:a,orderBy:"ASC",nextElement:"order"})}},computed:{title:function(){return this.$route.query.filterId?"Empresas importadas":this.$route.query.recyclebin?"Papelera de empresas":"Todas las empresas"}},methods:{changeOwnerSuccess:function(n){this.snackbarHandler({isOpen:!0,color:"success",text:n}),this.companiesSelected=[],this.updateData=!0},changeOwnerError:function(n){this.modalHandlerError({isOpen:!0,error:n})},updateInformationBar:function(n){this.informationBar=n},createCompany:function(n){var e=this;this.modalHandlerCompany({isOpen:!0,isLoading:!0}),this.$apollo.mutate({mutation:u["a"],variables:{input:n},update:function(){e.updateData=!0,e.modalHandlerCompany({isOpen:!1,isLoading:!1})}}).finally((function(){e.updateData=!1,e.snackbarHandler({isOpen:!0,color:"success",text:"Empresa creada correctamente"})})).catch((function(){var n="No se pudo crear la empresa, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:n}),e.modalHandlerCompany({isOpen:!0,isLoading:!1})}))},deleteCompanyConfirmation:function(){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que desea mover a la papelera?",nameItem:"Las empresas seleccionadas",text:"serán movidas a la papelera"},infoDelete:{}})},deleteCompanies:function(n){var e=this,t=n.isOpen,a=n.isLoading,i=n.message,s=n.infoDelete;r["a"].can(c["c"],l["b"])&&(this.modalHandlerDelete({isOpen:t,isLoading:a,message:i,infoDelete:s}),this.$apollo.mutate({mutation:u["b"],variables:{input:this.companiesSelected},update:function(){e.updateData=!0}}).finally((function(){e.updateData=!1,e.companiesSelected=[],e.modalHandlerDelete({isOpen:!1,isLoading:a,message:i,infoDelete:s}),e.snackbarHandler({isOpen:!0,color:"success",text:"Se eliminó correctamente"})})).catch((function(){var n="No se pudo eliminar las empresas, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:n})})))},confirmHandler:function(n){var e=n.isOpen,t=n.isLoading,a=n.message,i=n.infoDelete;this.$route.query.recyclebin?this.trashCompanies({isOpen:e,isLoading:t,message:a,infoDelete:i}):this.deleteCompanies({isOpen:e,isLoading:t,message:a,infoDelete:i})},trashCompanyConfirmation:function(){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"Las empresas seleccionadas",text:"serán eliminadas permanentemente"},infoDelete:{}})},trashCompanies:function(n){var e=this,t=n.isOpen,a=n.isLoading,i=n.message,s=n.infoDelete;r["a"].can(c["c"],l["b"])&&(this.modalHandlerDelete({isOpen:t,isLoading:a,message:i,infoDelete:s}),this.$apollo.mutate({mutation:u["e"],variables:{input:this.companiesSelected},update:function(){e.updateData=!0}}).finally((function(){e.updateData=!1,e.companiesSelected=[],e.modalHandlerDelete({isOpen:!1,isLoading:a,message:i,infoDelete:s}),e.snackbarHandler({isOpen:!0,color:"success",text:"Se eliminó correctamente"})})).catch((function(){var n="No se pudo eliminar las empresas, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:n})})))},restoreCompaniesConfirmation:function(){this.modalHandlerRestore({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que deseas restaurar?",nameItem:"Las empresas seleccionadas",text:"serán restauradas"},infoRestore:{}})},restoreCompanies:function(n){var e=this,t=n.isOpen,a=n.isLoading,i=n.message,s=n.infoRestore;r["a"].can(c["c"],l["b"])&&(this.modalHandlerRestore({isOpen:t,isLoading:a,message:i,infoRestore:s}),this.$apollo.mutate({mutation:u["d"],variables:{input:this.companiesSelected},update:function(){e.updateData=!0}}).finally((function(){e.updateData=!1,e.companiesSelected=[],e.modalHandlerRestore({isOpen:!1,isLoading:a,message:i,infoRestore:s}),e.snackbarHandler({isOpen:!0,color:"success",text:"Se restauró correctamente"})})).catch((function(){var n="No se pudo restaurar las empresas, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:n})})))},updateSelectCompanies:function(n){this.companiesSelected=n.map((function(n){var e=n.id;return{id:e}}))},updateCompaniesShow:function(n){this.companies=n},modalHandlerCompany:function(n){var e=n.isOpen,t=n.isLoading;this.modalCompany={isOpen:e,isLoading:t}},goToAllCompanies:function(){var n=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$router.push({name:"companies"});case 2:n.updateData=!0;case 3:case"end":return e.stop()}}),e)})))()}},apollo:{getForm:{query:m["a"],fetchPolicy:"no-cache",variables:{type:"COMPANY"}},headers:{query:p["a"],variables:{type:"COMPANIES"}}}},D=O,I=(t("b164"),t("0c7c")),_=t("6544"),S=t.n(_),w=t("8336"),H=t("62ad"),N=t("a523"),$=t("132d"),E=t("8860"),M=t("da13"),L=t("e449"),k=t("0fd9"),A=t("2db4"),x=t("8654"),q=t("3a2f"),j=Object(I["a"])(D,a,i,!1,null,"84607854",null);e["default"]=j.exports;S()(j,{VBtn:w["a"],VCol:H["a"],VContainer:N["a"],VIcon:$["a"],VList:E["a"],VListItem:M["a"],VMenu:L["a"],VRow:k["a"],VSnackbar:A["a"],VTextField:x["a"],VTooltip:q["a"]})},"1de0":function(n,e,t){"use strict";t.d(e,"a",(function(){return s}));t("99af"),t("b0c0");var a=t("7029"),i=t("8b3e"),s={data:function(){return{modalMergeDuplicates:{isOpen:!1,isLoading:!1},duplicateList:[]}},watch:{modalMergeDuplicates:function(n){var e=n.isOpen;e||(this.duplicateList=[])}},methods:{modalHandlerMergeDuplicates:function(n){var e=n.isOpen,t=n.isLoading;this.modalMergeDuplicates={isOpen:e,isLoading:t}},correctDuplicate:function(n,e){this.updateData=!0,this.snackbarHandler({isOpen:!0,color:"success",text:"".concat("CONTACT"===n?"El contacto":"La empresa"," \n        ").concat(e.name," se ha fusionado correctamente")}),"CONTACT"===n?this.getDuplicateContacts():this.getDuplicateCompanies()},getDuplicateContacts:function(){var n=this;this.modalHandlerMergeDuplicates({isOpen:!0,isLoading:!0}),this.$apollo.mutate({mutation:a["f"]}).then((function(e){var t=e.data.duplicateContacts;n.duplicateList=t,n.modalHandlerMergeDuplicates({isOpen:!0,isLoading:!1})})).catch((function(){var e="No se ha podido obtener los contactos duplicados, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))},getDuplicateCompanies:function(){var n=this;this.modalHandlerMergeDuplicates({isOpen:!0,isLoading:!0}),this.$apollo.mutate({mutation:i["e"]}).then((function(e){var t=e.data.duplicateCompanies;n.duplicateList=t,n.modalHandlerMergeDuplicates({isOpen:!0,isLoading:!1})})).catch((function(){var e="No se ha podido obtener las empresas duplicadas, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))}}}},7029:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"g",(function(){return p})),t.d(e,"a",(function(){return f})),t.d(e,"e",(function(){return v})),t.d(e,"c",(function(){return y})),t.d(e,"d",(function(){return h})),t.d(e,"f",(function(){return C}));var a,i,s,o,r,c,l,d=t("8785"),m=t("5184"),u=Object(m["a"])(a||(a=Object(d["a"])(["\n  query getContacts($filters: FilterContacts, $importId: ID) {\n    contacts(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        totalCount\n        contactsWithOpenDeals\n        contactsWithWonDeals\n      }\n      list {\n        id\n        name\n        email\n        phones\n        isClient\n        socialMedias\n        birthday\n        createdAt\n        updatedAt\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        contactCounts {\n          openDeals\n          closedDeals\n          lostDeals\n          wonDeals\n          emailMessages\n          totalActivities\n          doneActivities\n          undoneActivities\n          files\n          notes\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n        companies {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),p=Object(m["a"])(i||(i=Object(d["a"])(["\n  query getContacts($filters: FilterContacts, $importId: ID) {\n    searchContacts: contacts(filters: $filters, importId: $importId) {\n      list {\n        id\n        name\n        companies {\n          id\n          name\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),f=Object(m["a"])(s||(s=Object(d["a"])(["\n  query GetContact($contactId: ID!) {\n    contact(contactId: $contactId) {\n      id\n      name\n      email\n      phones\n      isClient\n      socialMedias\n      birthday\n      customForms\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      enterprise {\n        id\n        name\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      companies {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      deals {\n        id\n        title\n        value\n        status\n        contact {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        stage {\n          id\n        }\n        pipeline {\n          id\n          stages {\n            id\n          }\n        }\n        owner {\n          id\n        }\n      }\n      createdAt\n      isDelete\n    }\n  }\n"]))),v=Object(m["a"])(o||(o=Object(d["a"])(["\n  query GetContactHistory($contactId: ID!) {\n    contactHistory: contact(contactId: $contactId) {\n      id\n      name\n      email\n      files\n      import {\n        id\n      }\n      activityEmailStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n      }\n      activityStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companies {\n          id\n          name\n        }\n        deals {\n          id\n          title\n        }\n        customs {\n          id\n          label\n        }\n      }\n      notes {\n        id\n        content\n        type\n        createdAt\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        comments {\n          id\n          comment\n          createdAt\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),y=Object(m["a"])(r||(r=Object(d["a"])(["\n  query getContactsToEmail($filters: FilterContacts) {\n    contacts(filters: $filters) {\n      list {\n        id\n        name\n        email\n        birthday\n        companies {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),h=Object(m["a"])(c||(c=Object(d["a"])(["\n  query getContactsToInvites($filters: FilterContacts) {\n    contacts(filters: $filters) {\n      list {\n        id\n        name\n        email\n      }\n    }\n  }\n"]))),C=Object(m["a"])(l||(l=Object(d["a"])(["\n  query DuplicateContacts {\n    duplicateContacts {\n      list {\n        id\n        name\n        email\n        phones\n        companies {\n          id\n          name\n        }\n        contactCounts {\n          openDeals\n          totalActivities\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"])))},"8b3e":function(n,e,t){"use strict";t.d(e,"a",(function(){return m})),t.d(e,"f",(function(){return u})),t.d(e,"c",(function(){return p})),t.d(e,"d",(function(){return f})),t.d(e,"b",(function(){return v})),t.d(e,"e",(function(){return y}));var a,i,s,o,r,c,l=t("8785"),d=t("5184"),m=Object(d["a"])(a||(a=Object(l["a"])(["\n  query getCompanies($filters: FilterCompanies, $importId: ID) {\n    companies(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        totalCount\n        companiesWithOpenDeals\n        companiesWithWonDeals\n      }\n      list {\n        id\n        name\n        address\n        website\n        phones\n        socialMedias\n        createdAt\n        updatedAt\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companyCounts {\n          openDeals\n          closedDeals\n          lostDeals\n          wonDeals\n          emailMessages\n          totalActivities\n          doneActivities\n          undoneActivities\n          files\n          notes\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n        contacts {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),u=Object(d["a"])(i||(i=Object(l["a"])(["\n  query getCompanies($filters: FilterCompanies) {\n    searchCompanies: companies(filters: $filters) {\n      count\n      list {\n        id\n        name\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),p=Object(d["a"])(s||(s=Object(l["a"])(["\n  query getCompany($companyId: ID!) {\n    company(companyId: $companyId) {\n      id\n      name\n      address\n      website\n      phones\n      customForms\n      socialMedias\n      files\n      isDelete\n      tags {\n        id\n        name\n        color\n        order\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      contacts {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      deals {\n        id\n        title\n        value\n        status\n        contact {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        stage {\n          id\n        }\n        pipeline {\n          id\n          stages {\n            id\n          }\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),f=Object(d["a"])(o||(o=Object(l["a"])(["\n  query getCompanyHistory($companyId: ID!) {\n    companyHistory: company(companyId: $companyId) {\n      id\n      name\n      files\n      import {\n        id\n      }\n      activityStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        contacts {\n          id\n          name\n        }\n        deals {\n          id\n          title\n        }\n        customs {\n          id\n          label\n        }\n      }\n      notes {\n        id\n        content\n        type\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        comments {\n          id\n          comment\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),v=Object(d["a"])(r||(r=Object(l["a"])(["\n  query getCompaniesToActivity($filters: FilterCompanies) {\n    companies(filters: $filters) {\n      count\n      list {\n        id\n        name\n      }\n    }\n  }\n"]))),y=Object(d["a"])(c||(c=Object(l["a"])(["\n  query DuplicateCompanies {\n    duplicateCompanies {\n      list {\n        id\n        name\n        address\n        contacts {\n          id\n          name\n        }\n        companyCounts {\n          openDeals\n          totalActivities\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"])))},b164:function(n,e,t){"use strict";t("01b2")}}]);
//# sourceMappingURL=chunk-38e3affc.a29c1cce.js.map