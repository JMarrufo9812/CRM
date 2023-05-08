(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bf77df1"],{"04d1":function(n,e,t){var a=t("342f"),i=a.match(/firefox\/(\d+)/i);n.exports=!!i&&+i[1]},"3ff5":function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-container",{staticClass:"pb-0",staticStyle:{height:"100%"},attrs:{fluid:""}},[t("v-row",[t("v-col",{staticClass:"px-0 py-0",attrs:{cols:"12"}},[t("Header",{attrs:{item:n.deal,typeItem:n.typeItem,isLoading:this.$apollo.queries.deal.loading},on:{updateItem:n.updateDeal,updateHistory:n.updateHistory}}),t("SubHeader",{attrs:{deal:n.deal,isLoading:this.$apollo.queries.deal.loading},on:{updateItem:n.updateDeal,updateHistory:n.updateHistory}})],1),t("v-col",{staticClass:"pt-0 pl-0",attrs:{cols:"3"}},[t("Details",{attrs:{item:n.deal,typeItem:n.typeItem,inputsDefault:n.inputsDefault,isLoading:this.$apollo.queries.deal.loading},on:{updateItem:n.updateDeal,updateHistory:n.updateHistory}}),t("DealCompany",{attrs:{item:n.deal,itemId:n.deal.id,typeItem:n.typeItem,ownerId:n.deal.owner?n.deal.owner.id:"",companySelected:n.deal.company,isLoading:this.$apollo.queries.deal.loading},on:{updateItem:n.updateDeal,updateHistory:n.updateHistory,updateDealCompany:n.updateDealCompany}}),t("DealContact",{attrs:{item:n.deal,itemId:n.deal.id,typeItem:n.typeItem,ownerId:n.deal.owner?n.deal.owner.id:"",contactSelected:n.deal.contact,isLoading:this.$apollo.queries.deal.loading},on:{updateItem:n.updateDeal,updateDeal:n.updateDeal,updateHistory:n.updateHistory,updateDealContact:n.updateDealContact}})],1),t("v-col",{staticClass:"pt-0",attrs:{cols:"9"}},[t("History",{attrs:{item:n.deal,itemId:n.deal.id,typeItem:n.typeItem,ownerId:n.deal.owner?n.deal.owner.id:"",itemProfile:n.dealHistory},on:{updateHistory:n.updateHistory}})],1)],1)],1)},i=[],r=(t("b0c0"),t("6675")),o=t("eae8"),d={name:"Deal",mixins:[o["a"]],data:function(){return{typeItem:"DEAL",deal:{},inputsDefault:["title"]}},methods:{updateDeal:function(n){this.deal=n},updateDealContact:function(n){this.deal.contact.name=n.name},updateDealCompany:function(n){this.deal.company.name=n.name},updateHistory:function(){this.$apollo.queries.dealHistory.refetch()}},apollo:{deal:{query:r["a"],fetchPolicy:"no-cache",variables:function(){return{dealId:this.$route.params.id}},error:function(){this.$router.push({name:"pipeline"},(function(){}))}},dealHistory:{query:r["d"],fetchPolicy:"no-cache",variables:function(){return{dealId:this.$route.params.id}}}}},s=d,l=t("0c7c"),u=t("6544"),c=t.n(u),m=t("62ad"),p=t("a523"),f=t("0fd9"),y=Object(l["a"])(s,a,i,!1,null,null,null);e["default"]=y.exports;c()(y,{VCol:m["a"],VContainer:p["a"],VRow:f["a"]})},"4e827":function(n,e,t){"use strict";var a=t("23e7"),i=t("1c0b"),r=t("7b0b"),o=t("50c4"),d=t("d039"),s=t("addb"),l=t("a640"),u=t("04d1"),c=t("d998"),m=t("2d00"),p=t("512c"),f=[],y=f.sort,h=d((function(){f.sort(void 0)})),b=d((function(){f.sort(null)})),D=l("sort"),g=!d((function(){if(m)return m<70;if(!(u&&u>3)){if(c)return!0;if(p)return p<603;var n,e,t,a,i="";for(n=65;n<76;n++){switch(e=String.fromCharCode(n),n){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(a=0;a<47;a++)f.push({k:e+a,v:t})}for(f.sort((function(n,e){return e.v-n.v})),a=0;a<f.length;a++)e=f[a].k.charAt(0),i.charAt(i.length-1)!==e&&(i+=e);return"DGBEFHACIJK"!==i}})),v=h||!b||!D||!g,I=function(n){return function(e,t){return void 0===t?-1:void 0===e?1:void 0!==n?+n(e,t)||0:String(e)>String(t)?1:-1}};a({target:"Array",proto:!0,forced:v},{sort:function(n){void 0!==n&&i(n);var e=r(this);if(g)return void 0===n?y.call(e):y.call(e,n);var t,a,d=[],l=o(e.length);for(a=0;a<l;a++)a in e&&d.push(e[a]);d=s(d,I(n)),t=d.length,a=0;while(a<t)e[a]=d[a++];while(a<l)delete e[a++];return e}})},"512c":function(n,e,t){var a=t("342f"),i=a.match(/AppleWebKit\/(\d+)\./);n.exports=!!i&&+i[1]},6675:function(n,e,t){"use strict";t.d(e,"b",(function(){return c})),t.d(e,"f",(function(){return m})),t.d(e,"a",(function(){return p})),t.d(e,"d",(function(){return f})),t.d(e,"e",(function(){return y})),t.d(e,"c",(function(){return h}));var a,i,r,o,d,s,l=t("8785"),u=t("5184"),c=Object(u["a"])(a||(a=Object(l["a"])(["\n  query GetDeals($filters: FilterDeals, $importId: ID) {\n    deals(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        openDeals\n        wonDealsSum\n        predictionSales\n        predictionIncome\n      }\n      list {\n        id\n        title\n        value\n        status\n        expectedCloseDate\n        dateStatus\n        activity\n        files\n        customForms\n        rottenTime\n        changeTime\n        createdAt\n        updatedAt\n        wonTime\n        lostTime\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        dealCounts {\n          files\n          notes\n          emailMessages\n          activities {\n            total\n            done\n            undone\n          }\n        }\n        lostDeal {\n          id\n          lostReason {\n            id\n            reason\n          }\n        }\n        exchangeCurrency {\n          id\n          name\n          code\n          icon\n        }\n        company {\n          id\n          name\n        }\n        contact {\n          id\n          name\n        }\n        owner {\n          id\n          user {\n            name\n            lastName\n          }\n        }\n        stage {\n          id\n          name\n          order\n        }\n        pipeline {\n          id\n          name\n          stages {\n            id\n            name\n            order\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n      }\n    }\n  }\n"]))),m=Object(u["a"])(i||(i=Object(l["a"])(["\n  query GetDeals($filters: FilterDeals) {\n    deals(filters: $filters) {\n      count\n      list {\n        id\n        title\n        stage {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        contact {\n          id\n          name\n        }\n        pipeline {\n          id\n          name\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),p=Object(u["a"])(r||(r=Object(l["a"])(["\n  query getDeal($dealId: ID!) {\n    deal(dealId: $dealId) {\n      id\n      title\n      value\n      status\n      expectedCloseDate\n      dateStatus\n      activity\n      files\n      customForms\n      rottenTime\n      lostDeal {\n        id\n        lostReason {\n          id\n          reason\n        }\n      }\n      exchangeCurrency {\n        id\n        name\n        code\n        icon\n      }\n      company {\n        id\n        name\n        isDelete\n        owner {\n          id\n        }\n      }\n      contact {\n        id\n        name\n        email\n        isDelete\n        owner {\n          id\n        }\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n          config {\n            profileUrl\n          }\n        }\n      }\n      stage {\n        id\n        name\n        order\n      }\n      pipeline {\n        id\n        name\n        stages {\n          id\n          name\n          order\n          daysInStage\n        }\n      }\n      tags {\n        id\n        name\n        color\n        order\n      }\n      isDelete\n    }\n  }\n"]))),f=Object(u["a"])(o||(o=Object(l["a"])(["\n  query getDealHistory($dealId: ID!) {\n    dealHistory: deal(dealId: $dealId) {\n      id\n      title\n      files\n      import {\n        id\n      }\n      activityStream {\n        id\n        flow\n        customs {\n          id\n          label\n        }\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companies {\n          id\n          name\n        }\n        contacts {\n          id\n          name\n        }\n        stages {\n          id\n          name\n        }\n        pipelines {\n          id\n          name\n        }\n      }\n      notes {\n        id\n        content\n        type\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n        comments {\n          id\n          comment\n          userTags {\n            id\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n        }\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),y=Object(u["a"])(d||(d=Object(l["a"])(["\n  query readLostReasons($filters: Filter) {\n    lostReasons(filters: $filters) {\n      id\n      reason\n    }\n  }\n"]))),h=Object(u["a"])(s||(s=Object(l["a"])(["\n  query getDealsToActivity($filters: FilterDeals) {\n    deals(filters: $filters) {\n      count\n      list {\n        id\n        title\n        pipeline {\n          id\n          name\n        }\n        stage {\n          id\n          name\n        }\n      }\n    }\n  }\n"])))},a2b6:function(n,e,t){"use strict";t.d(e,"a",(function(){return a}));t("3835"),t("4e827"),t("ac1f"),t("1276");var a=function(n){var e=n.listItems,t=void 0===e?[]:e,a=n.orderBy,i=void 0===a?"ASC":a,r=n.nextElement,o=void 0===r?"none":r;return t.sort((function(n,e){var t="none"===o?n-e:n[o]-e[o],a="none"===o?e-n:e[o]-n[o];return"ASC"===i?t:a}))}},addb:function(n,e){var t=Math.floor,a=function(n,e){var o=n.length,d=t(o/2);return o<8?i(n,e):r(a(n.slice(0,d),e),a(n.slice(d),e),e)},i=function(n,e){var t,a,i=n.length,r=1;while(r<i){a=r,t=n[r];while(a&&e(n[a-1],t)>0)n[a]=n[--a];a!==r++&&(n[a]=t)}return n},r=function(n,e,t){var a=n.length,i=e.length,r=0,o=0,d=[];while(r<a||o<i)r<a&&o<i?d.push(t(n[r],e[o])<=0?n[r++]:e[o++]):d.push(r<a?n[r++]:e[o++]);return d};n.exports=a},d998:function(n,e,t){var a=t("342f");n.exports=/MSIE|Trident/.test(a)},e50e:function(n,e,t){"use strict";t.d(e,"a",(function(){return d})),t.d(e,"b",(function(){return s}));var a,i,r=t("8785"),o=t("5184"),d=Object(o["a"])(a||(a=Object(r["a"])(["\n  query GetForm($type: typeForm!) {\n    getForm: dynamicForms(forForm: $type) {\n      forForm\n      defaultForm {\n        inputs {\n          id\n          type\n          icon\n          label\n          items\n          order\n          keyInput\n          isRequired\n          isMultiple\n        }\n      }\n      customForm {\n        inputs {\n          id\n          type\n          icon\n          label\n          items\n          order\n          isRequired\n          isMultiple\n        }\n      }\n      headers\n    }\n  }\n"]))),s=Object(o["a"])(i||(i=Object(r["a"])(["\n  query getForm {\n    formContact: dynamicForms(forForm: CONTACT) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n    formCompany: dynamicForms(forForm: COMPANY) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n    formDeal: dynamicForms(forForm: DEAL) {\n      defaultForm {\n        inputs {\n          id\n          label\n          keyInput\n        }\n      }\n      customForm {\n        inputs {\n          id\n          label\n        }\n      }\n    }\n  }\n"])))},eae8:function(n,e,t){"use strict";t.d(e,"a",(function(){return r}));t("d3b7"),t("3ca3"),t("ddb0"),t("d81d"),t("99af");var a=t("e50e"),i=t("a2b6"),r={components:{History:function(){return t.e("chunk-5ef58284").then(t.bind(null,"f943"))},Header:function(){return Promise.all([t.e("chunk-5b13cade"),t.e("chunk-75d93884")]).then(t.bind(null,"e7de"))},Details:function(){return t.e("chunk-55ab1396").then(t.bind(null,"5e8f"))},ListCompanies:function(){return t.e("chunk-f326d678").then(t.bind(null,"50e6"))},ListContacts:function(){return t.e("chunk-259de4f9").then(t.bind(null,"4393"))},ListDeals:function(){return t.e("chunk-b8d289ce").then(t.bind(null,"998b"))},ModalDeal:function(){return t.e("chunk-ce459dc8").then(t.bind(null,"60eb"))},SubHeader:function(){return t.e("chunk-4e03f372").then(t.bind(null,"ef42"))},DealCompany:function(){return t.e("chunk-741c4a6d").then(t.bind(null,"cd9b"))},DealContact:function(){return t.e("chunk-ea606578").then(t.bind(null,"538b"))}},watch:{modalDeal:function(n){var e=this;n.isOpen&&(this.inputsForm=this.inputsForm.map((function(n){return"CONTACT"===e.typeItem?"contact"===n.keyInput&&(n.defaultValue=JSON.parse(JSON.stringify(e.contact))):"COMPANY"===e.typeItem&&"company"===n.keyInput&&(n.defaultValue=JSON.parse(JSON.stringify(e.company))),n})))}},methods:{getForm:function(){var n=this;this.$apollo.query({query:a["a"],variables:{type:"DEAL"}}).then((function(e){var t=e.data.getForm,a=t.customForm,r=t.defaultForm,o=a.inputs?r.inputs.concat(a.inputs):r.inputs,d=Object(i["a"])({listItems:o,orderBy:"ASC",nextElement:"order"});n.inputsForm=d,n.modalHandlerDeal({isOpen:!0,isLoading:!1})})).catch((function(){var e="No se pudo obtener el formulario, intente de nuevo o contacte a soporte";n.modalHandlerError({isOpen:!0,error:e})}))}}}}}]);
//# sourceMappingURL=chunk-6bf77df1.75518612.js.map