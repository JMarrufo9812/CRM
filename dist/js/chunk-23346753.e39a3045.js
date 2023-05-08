(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23346753","chunk-7859f8ee","chunk-7859f8ee"],{"0491":function(n,e,t){"use strict";t.d(e,"a",(function(){return s}));t("b64b"),t("ac1f"),t("841c"),t("b0c0"),t("d81d"),t("159b"),t("d3b7");var a=t("59c9"),i=t("6675"),o=t("ee2e"),s={data:function(){return{PERMISSIONS_DEALS:o["f"],inputsForm:[],isLoadingDeals:!1,loadingSearch:!1,isLoadingUpdateDeal:!1,modalDeal:{isOpen:!1,isLoading:!1},infoError:{icon:"mdi-account-search-outline",title:"",message:"No se encontraron tratos"},filters:{search:"",orderBy:"desc",skip:0,take:0,sortBy:[],sortDesc:[],isDelete:!1},listDeals:[],informationBarDeals:{},resultSearchDeals:[],totalDeals:0,searchDeal:"",searchFilters:{search:"",take:5},dealsSelected:[]}},watch:{searchDeal:function(n){n&&(Object.keys(n).length>=2&&(this.searchFilters.search=n,this.searchFilters.take=5,this.getSearchDeals()),0===Object.keys(n).length&&(this.searchFilters.search="",this.searchFilters.take=0,this.getSearchDeals()))},isLoadingDeals:function(n){this.$emit("isLoadingDeals",n)}},computed:{menuProps:function(){return this.searchDeal?{}:{value:!1}}},methods:{modalHandlerDeal:function(n){var e=n.isOpen,t=n.isLoading;this.modalDeal={isOpen:e,isLoading:t}},createDeal:function(n){var e=this,t=n.title,i=n.contact,o=n.company,s=n.value,r=n.tags,d=n.customForms,c=n.expectedCloseDate,l=n.pipeline,u=l.pipelineId,m=l.stageId,p=n.owner;this.modalHandlerDeal({isOpen:!0,isLoading:!0}),this.$apollo.mutate({mutation:a["c"],variables:{input:{title:t,tags:r,customForms:d,expectedCloseDate:c,contact:null!==i&&void 0!==i&&i.id?{id:i.id}:i,company:null!==o&&void 0!==o&&o.id?{id:o.id}:o,value:s,pipelineId:u,stageId:m,ownerId:p.id}}}).then((function(n){var t=n.data.createDeal;e.updateData=!0,e.modalHandlerDeal({isOpen:!1,isLoading:!1}),"pipeline-id"===e.$route.name&&e.updateViewPipeline(e.$route.params.id),e.updateData=!0,setTimeout((function(){e.updateData=!1}),10),e.$emit("updateHistory"),"CONTACT"!==e.typeItem&&"COMPANY"!==e.typeItem||(e.updateHistory(),e.addDeal(t))})).catch((function(){var n="No se pudo crear el trato intente de nuevo o contacte al soporte";e.modalHandlerError({isOpen:!0,error:n})}))},updateDeal:function(n){var e=this,t=n.id,i=n.value,o=n.expectedCloseDate,s=n.company,r=n.contact,d=n.tags,c=n.status,l=n.comments,u=n.lostReason,m=n.owner,p=n.title,f=n.customForm;this.isLoadingUpdateDeal=!0;var h={};h.id=t,(i||0===i)&&(h.value=i),(o||void 0!==o)&&(h.expectedCloseDate=o),s&&(h.company=s),r&&(h.contact=r),d&&(h.tags=d),m&&(h.ownerId=m.id),p&&(h.title=p),f&&(h.customForm=f),c&&(h.status=c,"LOST"===c&&(h.comments=l,h.lostReason=u)),this.$apollo.mutate({mutation:a["i"],variables:{input:h}}).then((function(n){var t=n.data.updateDeal;"LOST"===h.status&&e.modalHandlerLostDeal({isOpen:!1,isLoading:!1}),e.$emit("updateItem",t),e.$emit("updateHistory"),e.isLoadingUpdateDeal=!1,"CONTACT"!==e.typeItem&&"COMPANY"!==e.typeItem||(e.updateHistory(),e.addDeal(t))})).catch((function(){e.isLoadingUpdateDeal=!1;var n="No se pudo actualizar el trato, intente de nuevo o contacte a soporte";e.modalHandlerError({isOpen:!0,error:n})}))},getSearchDeals:function(){var n=this;this.loadingSearch=!0,this.$apollo.query({query:i["f"],fetchPolicy:"no-cache",variables:{filters:this.searchFilters}}).then((function(e){var t=e.data.deals;n.resultSearchDeals=t.list,n.loadingSearch=!1})).catch((function(){n.loadingSearch=!1}))},getDeals:function(){var n=this;this.isLoadingDeals=!0,this.$apollo.query({query:i["b"],fetchPolicy:"no-cache",variables:{filters:this.filters,importId:this.$route.query.filterId}}).then((function(e){var t=e.data.deals;n.isLoadingDeals=!1,n.$emit("deals",t.list),n.$emit("informationBar",t.informationBar),n.listDeals=t.list.map((function(n){return n.customForms&&n.customForms.forEach((function(e){var t=e.id,a=e.value;n[t]=a})),n})),n.totalDeals=t.count,n.isErrorDeals=!1,n.$emit("endUpdateData")})).catch((function(){n.isErrorDeals=!0,n.isLoadingDeals=!1,n.listDeals=[],n.totalDeals=0,n.$emit("endUpdateData"),n.infoError={icon:"mdi-alert-outline",title:"Error",message:"No se ha podido cargar ningún trato, intente de nuevo o contacte a soporte"}}))},restoreDealsConfirmation:function(){this.modalHandlerRestore({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que deseas restaurar?",nameItem:"Los tratos seleccionados",text:"serán restaurados"},infoRestore:{}})},restoreDeals:function(n){var e=this,t=n.isOpen,i=n.isLoading,o=n.message,s=n.infoRestore;this.modalHandlerRestore({isOpen:t,isLoading:i,message:o,infoRestore:s}),this.$apollo.mutate({mutation:a["g"],variables:{input:this.dealsSelected},update:function(){e.updateData=!0,e.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron restaurados correctamente"})}}).finally((function(){e.modalHandlerRestore({isOpen:!1,isLoading:i,message:o,infoRestore:s}),e.updateData=!1})).catch((function(){var n="No se pudo restaurar el trato intente de nuevo o contacte al soporte";e.modalHandlerError({isOpen:!0,error:n})}))},deleteDealConfirmation:function(n,e){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{title:"¿Seguro que deseas mover a la papelera?",nameItem:"Los tratos seleccionados",text:"serán movidos a la papelera"},infoDelete:{type:n,deals:e}})},deleteDeal:function(n){var e=this,t=n.isOpen,i=n.isLoading,o=n.message,s=n.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:i,message:o,infoDelete:s}),this.$apollo.mutate({mutation:a["e"],variables:{input:s.deals},update:function(){e.updateData=!0,e.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron eliminados correctamente"})}}).finally((function(){e.updateData=!1,e.modalHandlerDelete({isOpen:!1,isLoading:i,message:o,infoDelete:s})})).catch((function(){var n="No se pudo eliminar el trato intente de nuevo o contacte al soporte";e.modalHandlerError({isOpen:!0,error:n})}))},trashDealsConfirmation:function(n,e){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"Los tratos seleccionados",text:"serán eliminados permanentemente"},infoDelete:{type:n,deals:e}})},trashDeals:function(n){var e=this,t=n.isOpen,i=n.isLoading,o=n.message,s=n.infoDelete;this.modalHandlerDelete({isOpen:t,isLoading:i,message:o,infoDelete:s}),this.$apollo.mutate({mutation:a["h"],variables:{input:s.deals},update:function(){e.updateData=!0,e.snackbarHandler({isOpen:!0,color:"success",text:"Los tratos fueron eliminados correctamente"})}}).finally((function(){e.updateData=!1,e.modalHandlerDelete({isOpen:!1,isLoading:i,message:o,infoDelete:s})})).catch((function(){var n="No se pudo eliminar el trato intente de nuevo o contacte al soporte";e.modalHandlerError({isOpen:!0,error:n})}))},goToProfile:function(n){this.$router.push("/deal/".concat(n))}}}},"04d1":function(n,e,t){var a=t("342f"),i=a.match(/firefox\/(\d+)/i);n.exports=!!i&&+i[1]},"129f":function(n,e){n.exports=Object.is||function(n,e){return n===e?0!==n||1/n===1/e:n!=n&&e!=e}},"4e827":function(n,e,t){"use strict";var a=t("23e7"),i=t("1c0b"),o=t("7b0b"),s=t("50c4"),r=t("d039"),d=t("addb"),c=t("a640"),l=t("04d1"),u=t("d998"),m=t("2d00"),p=t("512c"),f=[],h=f.sort,D=r((function(){f.sort(void 0)})),g=r((function(){f.sort(null)})),y=c("sort"),b=!r((function(){if(m)return m<70;if(!(l&&l>3)){if(u)return!0;if(p)return p<603;var n,e,t,a,i="";for(n=65;n<76;n++){switch(e=String.fromCharCode(n),n){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(a=0;a<47;a++)f.push({k:e+a,v:t})}for(f.sort((function(n,e){return e.v-n.v})),a=0;a<f.length;a++)e=f[a].k.charAt(0),i.charAt(i.length-1)!==e&&(i+=e);return"DGBEFHACIJK"!==i}})),v=D||!g||!y||!b,I=function(n){return function(e,t){return void 0===t?-1:void 0===e?1:void 0!==n?+n(e,t)||0:String(e)>String(t)?1:-1}};a({target:"Array",proto:!0,forced:v},{sort:function(n){void 0!==n&&i(n);var e=o(this);if(b)return void 0===n?h.call(e):h.call(e,n);var t,a,r=[],c=s(e.length);for(a=0;a<c;a++)a in e&&r.push(e[a]);r=d(r,I(n)),t=r.length,a=0;while(a<t)e[a]=r[a++];while(a<c)delete e[a++];return e}})},"512c":function(n,e,t){var a=t("342f"),i=a.match(/AppleWebKit\/(\d+)\./);n.exports=!!i&&+i[1]},"59c9":function(n,e,t){"use strict";t.d(e,"c",(function(){return D})),t.d(e,"i",(function(){return g})),t.d(e,"e",(function(){return y})),t.d(e,"h",(function(){return b})),t.d(e,"g",(function(){return v})),t.d(e,"b",(function(){return I})),t.d(e,"a",(function(){return O})),t.d(e,"d",(function(){return C})),t.d(e,"f",(function(){return $})),t.d(e,"j",(function(){return F})),t.d(e,"k",(function(){return L}));var a,i,o,s,r,d,c,l,u,m,p,f=t("8785"),h=t("5184"),D=Object(h["a"])(a||(a=Object(f["a"])(["\n  mutation CreateDeal($input: CreateDeal!) {\n    createDeal(dealInput: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      rottenTime\n      owner {\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      company {\n        id\n        name\n      }\n      contact {\n        id\n        name\n      }\n      stage {\n        id\n        name\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n    }\n  }\n"]))),g=Object(h["a"])(i||(i=Object(f["a"])(["\n  mutation UpdateDeal($input: UpdateDeal!) {\n    updateDeal(dealInput: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      contact {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n    }\n  }\n"]))),y=Object(h["a"])(o||(o=Object(f["a"])(["\n  mutation deletedDeals($input: [DeleteDealInput!]!) {\n    deletedDeals(deals: $input) {\n      id\n    }\n  }\n"]))),b=Object(h["a"])(s||(s=Object(f["a"])(["\n  mutation trashDeals($input: [DeleteDealInput!]!) {\n    trashDeals(deals: $input) {\n      id\n    }\n  }\n"]))),v=Object(h["a"])(r||(r=Object(f["a"])(["\n  mutation restoreDeals($input: [DeleteDealInput!]!) {\n    restoreDeals(deals: $input) {\n      id\n    }\n  }\n"]))),I=Object(h["a"])(d||(d=Object(f["a"])(["\n  mutation ChangeDealStage($input: ChangeStage!) {\n    changeDealStage(input: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      dateEntryIntoStage\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n      }\n      contact {\n        id\n        name\n        isDelete\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n        maxDays\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),O=Object(h["a"])(c||(c=Object(f["a"])(["\n  mutation changeDealPipeline($input: changePipelineInput!) {\n    changeDealPipeline(input: $input) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n      }\n      contact {\n        id\n        name\n        isDelete\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),C=Object(h["a"])(l||(l=Object(f["a"])(["\n  mutation CreateLostReason($input: lostReasonCreateInput!) {\n    createLostReason(lostReasonInput: $input) {\n      id\n      reason\n    }\n  }\n"]))),$=Object(h["a"])(u||(u=Object(f["a"])(["\n  mutation DeleteLostReason($lostReasonId: ID!) {\n    deleteLostReason(lostReasonId: $lostReasonId) {\n      id\n      reason\n    }\n  }\n"]))),F=Object(h["a"])(m||(m=Object(f["a"])(["\n  mutation UpdateLostReason($input: lostReasonUpdateInput!) {\n    updateLostReason(lostReasonInput: $input) {\n      id\n      reason\n    }\n  }\n"]))),L=Object(h["a"])(p||(p=Object(f["a"])(["\n  mutation assignDeals($dealListAssign: DealListAssign!) {\n    assignDeals(dealListAssign: $dealListAssign)\n  }\n"])))},6675:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"f",(function(){return m})),t.d(e,"a",(function(){return p})),t.d(e,"d",(function(){return f})),t.d(e,"e",(function(){return h})),t.d(e,"c",(function(){return D}));var a,i,o,s,r,d,c=t("8785"),l=t("5184"),u=Object(l["a"])(a||(a=Object(c["a"])(["\n  query GetDeals($filters: FilterDeals, $importId: ID) {\n    deals(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        openDeals\n        wonDealsSum\n        predictionSales\n        predictionIncome\n      }\n      list {\n        id\n        title\n        value\n        status\n        expectedCloseDate\n        dateStatus\n        activity\n        files\n        customForms\n        rottenTime\n        changeTime\n        createdAt\n        updatedAt\n        wonTime\n        lostTime\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        dealCounts {\n          files\n          notes\n          emailMessages\n          activities {\n            total\n            done\n            undone\n          }\n        }\n        lostDeal {\n          id\n          lostReason {\n            id\n            reason\n          }\n        }\n        exchangeCurrency {\n          id\n          name\n          code\n          icon\n        }\n        company {\n          id\n          name\n        }\n        contact {\n          id\n          name\n        }\n        owner {\n          id\n          user {\n            name\n            lastName\n          }\n        }\n        stage {\n          id\n          name\n          order\n        }\n        pipeline {\n          id\n          name\n          stages {\n            id\n            name\n            order\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n      }\n    }\n  }\n"]))),m=Object(l["a"])(i||(i=Object(c["a"])(["\n  query GetDeals($filters: FilterDeals) {\n    deals(filters: $filters) {\n      count\n      list {\n        id\n        title\n        stage {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        contact {\n          id\n          name\n        }\n        pipeline {\n          id\n          name\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),p=Object(l["a"])(o||(o=Object(c["a"])(["\n  query getDeal($dealId: ID!) {\n    deal(dealId: $dealId) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n        owner {\n          id\n        }\n      }\n      contact {\n        id\n        name\n        email\n        isDelete\n        owner {\n          id\n        }\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),f=Object(l["a"])(s||(s=Object(c["a"])(["\n  query getDealHistory($dealId: ID!) {\n    dealHistory: deal(dealId: $dealId) {\n      id\n      title\n      files\n      import {\n        id\n      }\n      activityStream {\n        id\n        flow\n        customs {\n          id\n          label\n        }\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companies {\n          id\n          name\n        }\n        contacts {\n          id\n          name\n        }\n        stages {\n          id\n          name\n        }\n        pipelines {\n          id\n          name\n        }\n      }\n      notes {\n        id\n        content\n        type\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n        comments {\n          id\n          comment\n          userTags {\n            id\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n        }\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),h=Object(l["a"])(r||(r=Object(c["a"])(["\n  query readLostReasons($filters: Filter) {\n    lostReasons(filters: $filters) {\n      id\n      reason\n    }\n  }\n"]))),D=Object(l["a"])(d||(d=Object(c["a"])(["\n  query getDealsToActivity($filters: FilterDeals) {\n    deals(filters: $filters) {\n      count\n      list {\n        id\n        title\n        pipeline {\n          id\n          name\n        }\n        stage {\n          id\n          name\n        }\n      }\n    }\n  }\n"])))},7029:function(n,e,t){"use strict";t.d(e,"b",(function(){return m})),t.d(e,"g",(function(){return p})),t.d(e,"a",(function(){return f})),t.d(e,"e",(function(){return h})),t.d(e,"c",(function(){return D})),t.d(e,"d",(function(){return g})),t.d(e,"f",(function(){return y}));var a,i,o,s,r,d,c,l=t("8785"),u=t("5184"),m=Object(u["a"])(a||(a=Object(l["a"])(["\n  query getContacts($filters: FilterContacts, $importId: ID) {\n    contacts(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        totalCount\n        contactsWithOpenDeals\n        contactsWithWonDeals\n      }\n      list {\n        id\n        name\n        email\n        phones\n        isClient\n        socialMedias\n        birthday\n        createdAt\n        updatedAt\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        contactCounts {\n          openDeals\n          closedDeals\n          lostDeals\n          wonDeals\n          emailMessages\n          totalActivities\n          doneActivities\n          undoneActivities\n          files\n          notes\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n        companies {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),p=Object(u["a"])(i||(i=Object(l["a"])(["\n  query getContacts($filters: FilterContacts, $importId: ID) {\n    searchContacts: contacts(filters: $filters, importId: $importId) {\n      list {\n        id\n        name\n        companies {\n          id\n          name\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),f=Object(u["a"])(o||(o=Object(l["a"])(["\n  query GetContact($contactId: ID!) {\n    contact(contactId: $contactId) {\n      id\n      name\n      email\n      phones\n      isClient\n      socialMedias\n      birthday\n      customForms\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      enterprise {\n        id\n        name\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      companies {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      deals {\n        id\n        title\n        value\n        status\n        contact {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        stage {\n          id\n        }\n        pipeline {\n          id\n          stages {\n            id\n          }\n        }\n        owner {\n          id\n        }\n      }\n      createdAt\n      isDelete\n    }\n  }\n"]))),h=Object(u["a"])(s||(s=Object(l["a"])(["\n  query GetContactHistory($contactId: ID!) {\n    contactHistory: contact(contactId: $contactId) {\n      id\n      name\n      email\n      files\n      import {\n        id\n      }\n      activityEmailStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n      }\n      activityStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companies {\n          id\n          name\n        }\n        deals {\n          id\n          title\n        }\n        customs {\n          id\n          label\n        }\n      }\n      notes {\n        id\n        content\n        type\n        createdAt\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        comments {\n          id\n          comment\n          createdAt\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),D=Object(u["a"])(r||(r=Object(l["a"])(["\n  query getContactsToEmail($filters: FilterContacts) {\n    contacts(filters: $filters) {\n      list {\n        id\n        name\n        email\n        birthday\n        companies {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),g=Object(u["a"])(d||(d=Object(l["a"])(["\n  query getContactsToInvites($filters: FilterContacts) {\n    contacts(filters: $filters) {\n      list {\n        id\n        name\n        email\n      }\n    }\n  }\n"]))),y=Object(u["a"])(c||(c=Object(l["a"])(["\n  query DuplicateContacts {\n    duplicateContacts {\n      list {\n        id\n        name\n        email\n        phones\n        companies {\n          id\n          name\n        }\n        contactCounts {\n          openDeals\n          totalActivities\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"])))},"841c":function(n,e,t){"use strict";var a=t("d784"),i=t("825a"),o=t("1d80"),s=t("129f"),r=t("14c3");a("search",(function(n,e,t){return[function(e){var t=o(this),a=void 0==e?void 0:e[n];return void 0!==a?a.call(e,t):new RegExp(e)[n](String(t))},function(n){var a=t(e,this,n);if(a.done)return a.value;var o=i(this),d=String(n),c=o.lastIndex;s(c,0)||(o.lastIndex=0);var l=r(o,d);return s(o.lastIndex,c)||(o.lastIndex=c),null===l?-1:l.index}]}))},a2b6:function(n,e,t){"use strict";t.d(e,"a",(function(){return a}));t("3835"),t("4e827"),t("ac1f"),t("1276");var a=function(n){var e=n.listItems,t=void 0===e?[]:e,a=n.orderBy,i=void 0===a?"ASC":a,o=n.nextElement,s=void 0===o?"none":o;return t.sort((function(n,e){var t="none"===s?n-e:n[s]-e[s],a="none"===s?e-n:e[s]-n[s];return"ASC"===i?t:a}))}},addb:function(n,e){var t=Math.floor,a=function(n,e){var s=n.length,r=t(s/2);return s<8?i(n,e):o(a(n.slice(0,r),e),a(n.slice(r),e),e)},i=function(n,e){var t,a,i=n.length,o=1;while(o<i){a=o,t=n[o];while(a&&e(n[a-1],t)>0)n[a]=n[--a];a!==o++&&(n[a]=t)}return n},o=function(n,e,t){var a=n.length,i=e.length,o=0,s=0,r=[];while(o<a||s<i)o<a&&s<i?r.push(t(n[o],e[s])<=0?n[o++]:e[s++]):r.push(o<a?n[o++]:e[s++]);return r};n.exports=a},b8fa:function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-container",{staticClass:"pb-0",staticStyle:{height:"100%"},attrs:{fluid:""}},[t("v-row",[t("v-col",{staticClass:"px-0 py-0",attrs:{cols:"12"}},[t("Header",{attrs:{item:n.contact,typeItem:n.typeItem,isLoading:this.$apollo.queries.contact.loading},on:{updateItem:n.updateContact,updateHistory:n.updateHistory,openModalDeal:n.getForm}})],1),t("v-col",{staticClass:"pt-0 pl-0",attrs:{cols:"3"}},[t("Details",{attrs:{item:n.contact,typeItem:n.typeItem,isLoading:this.$apollo.queries.contact.loading},on:{updateItem:n.updateContact,updateHistory:n.updateHistory}}),t("ListCompanies",{attrs:{item:n.contact,itemId:n.contact.id,ownerId:n.contact.owner?n.contact.owner.id:"",typeItem:n.typeItem,companiesSelected:n.contact.companies,isLoading:this.$apollo.queries.contact.loading},on:{updateItem:n.updateContact,updateContactCompany:n.updateContactCompany,updateHistory:n.updateHistory}}),t("ListDeals",{attrs:{item:n.contact,itemId:n.contact.id,ownerId:n.contact.owner?n.contact.owner.id:"",typeItem:n.typeItem,deals:n.contact.deals||[],isLoading:this.$apollo.queries.contact.loading},on:{updateHistory:n.updateHistory,updateItem:n.updateContact,openModalDeal:n.getForm}})],1),t("v-col",{staticClass:"pt-1",attrs:{cols:"9"}},[t("History",{attrs:{item:n.contact,itemId:n.contact.id,ownerId:n.contact.owner?n.contact.owner.id:"",typeItem:n.typeItem,itemProfile:n.contactHistory},on:{updateHistory:n.updateHistory}})],1),t("ModalDeal",{attrs:{inputs:n.inputsForm,modalHandler:n.modalDeal},on:{close:n.modalHandlerDeal,outData:n.createDeal}})],1)],1)},i=[],o=(t("b0c0"),t("7029")),s=t("eae8"),r=t("0491"),d={name:"Contact",mixins:[s["a"],r["a"]],data:function(){return{typeItem:"CONTACT",contact:{}}},methods:{updateContact:function(n){this.contact=n},updateContactCompany:function(n,e){this.contact.companies[e].name=n.name},addDeal:function(n){this.contact.deals.push(n)},updateHistory:function(){this.$apollo.queries.contactHistory.refetch()}},apollo:{contact:{query:o["a"],fetchPolicy:"no-cache",variables:function(){return{contactId:this.$route.params.id}}},contactHistory:{query:o["e"],fetchPolicy:"no-cache",variables:function(){return{contactId:this.$route.params.id}}}}},c=d,l=t("0c7c"),u=t("6544"),m=t.n(u),p=t("62ad"),f=t("a523"),h=t("0fd9"),D=Object(l["a"])(c,a,i,!1,null,null,null);e["default"]=D.exports;m()(D,{VCol:p["a"],VContainer:f["a"],VRow:h["a"]})},d998:function(n,e,t){var a=t("342f");n.exports=/MSIE|Trident/.test(a)},e50e:function(n,e,t){"use strict";t.d(e,"a",(function(){return r})),t.d(e,"b",(function(){return d}));var a,i,o=t("8785"),s=t("5184"),r=Object(s["a"])(a||(a=Object(o["a"])(["\n  query GetForm($type: typeForm!) {\n    getForm: dynamicForms(forForm: $type) {\n      forForm\n      defaultForm {\n        inputs {\n          id\n          type\n          icon\n          label\n          items\n          order\n          keyInput\n          isRequired\n          isMultiple\n        }\n      }\n      customForm {\n        inputs {\n          id\n          type\n          icon\n          label\n          items\n          order\n          isRequired\n          isMultiple\n        }\n      }\n      headers\n    }\n  }\n"]))),d=Object(s["a"])(i||(i=Object(o["a"])(["\n  query getForm {\n    formContact: dynamicForms(forForm: CONTACT) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n    formCompany: dynamicForms(forForm: COMPANY) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n    formDeal: dynamicForms(forForm: DEAL) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n  }\n"])))},eae8:function(n,e,t){"use strict";t.d(e,"a",(function(){return o}));t("d3b7"),t("3ca3"),t("ddb0"),t("d81d"),t("99af");var a=t("e50e"),i=t("a2b6"),o={components:{History:function(){return t.e("chunk-5ef58284").then(t.bind(null,"f943"))},Header:function(){return Promise.all([t.e("chunk-5b13cade"),t.e("chunk-75d93884")]).then(t.bind(null,"e7de"))},Details:function(){return t.e("chunk-55ab1396").then(t.bind(null,"5e8f"))},ListCompanies:function(){return t.e("chunk-f326d678").then(t.bind(null,"50e6"))},ListContacts:function(){return t.e("chunk-259de4f9").then(t.bind(null,"4393"))},ListDeals:function(){return t.e("chunk-b8d289ce").then(t.bind(null,"998b"))},ModalDeal:function(){return t.e("chunk-ce459dc8").then(t.bind(null,"60eb"))},SubHeader:function(){return t.e("chunk-4e03f372").then(t.bind(null,"ef42"))},DealCompany:function(){return t.e("chunk-741c4a6d").then(t.bind(null,"cd9b"))},DealContact:function(){return t.e("chunk-ea606578").then(t.bind(null,"538b"))}},watch:{modalDeal:function(n){var e=this;n.isOpen&&(this.inputsForm=this.inputsForm.map((function(n){return"CONTACT"===e.typeItem?"contact"===n.keyInput&&(n.defaultValue=JSON.parse(JSON.stringify(e.contact))):"COMPANY"===e.typeItem&&"company"===n.keyInput&&(n.defaultValue=JSON.parse(JSON.stringify(e.company))),n})))}},methods:{getForm:function(){var n=this;this.$apollo.query({query:a["a"],variables:{type:"DEAL"}}).then((function(e){var t=e.data.getForm,a=t.customForm,o=t.defaultForm,s=a.inputs?o.inputs.concat(a.inputs):o.inputs,r=Object(i["a"])({listItems:s,orderBy:"ASC",nextElement:"order"});n.inputsForm=r,n.modalHandlerDeal({isOpen:!0,isLoading:!1})})).catch((function(){var e="No se pudo obtener el formulario, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))}}}}}]);
//# sourceMappingURL=chunk-23346753.e39a3045.js.map