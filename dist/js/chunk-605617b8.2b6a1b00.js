(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-605617b8","chunk-7859f8ee","chunk-7859f8ee"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"2b5d":function(e,t,n){"use strict";n("2bfd");var s=n("b974"),i=n("c6a6"),a=n("80d2");t["a"]=i["a"].extend({name:"v-combobox",props:{delimiters:{type:Array,default:()=>[]},returnObject:{type:Boolean,default:!0}},data:()=>({editingIndex:-1}),computed:{computedCounterValue(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot(){return s["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed(){return!0},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty(){return null!=this.internalSearch}},methods:{onInternalSearchChanged(e){if(e&&this.multiple&&this.delimiters.length){const t=this.delimiters.find(t=>e.endsWith(t));null!=t&&(this.internalSearch=e.slice(0,e.length-t.length),this.updateTags())}this.updateMenuDimensions()},genInput(){const e=i["a"].options.methods.genInput.call(this);return delete e.data.attrs.name,e.data.on.paste=this.onPaste,e},genChipSelection(e,t){const n=s["a"].options.methods.genChipSelection.call(this,e,t);return this.multiple&&(n.componentOptions.listeners={...n.componentOptions.listeners,dblclick:()=>{this.editingIndex=t,this.internalSearch=this.getText(e),this.selectedIndex=-1}}),n},onChipInput(e){s["a"].options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown(e){e.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged(e,t){this.autoSelectFirst&&i["a"].options.methods.onFilteredItemsChanged.call(this,e,t)},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[a["z"].home,a["z"].end].includes(t)||s["a"].options.methods.onKeyDown.call(this,e),this.multiple&&t===a["z"].left&&0===this.$refs.input.selectionStart?this.updateSelf():t===a["z"].enter&&this.onEnterDown(e),this.changeSelectedIndex(t)},onTabDown(e){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return e.preventDefault(),e.stopPropagation(),this.updateTags();i["a"].options.methods.onTabDown.call(this,e)},selectItem(e){this.editingIndex>-1?this.updateEditing():(i["a"].options.methods.selectItem.call(this,e),this.internalSearch&&this.multiple&&this.getText(e).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue(e){s["a"].options.methods.setValue.call(this,null!=e?e:this.internalSearch)},updateEditing(){const e=this.internalValue.slice(),t=this.selectedItems.findIndex(e=>this.getText(e)===this.internalSearch);if(t>-1){const n="object"===typeof e[t]?Object.assign({},e[t]):e[t];e.splice(t,1),e.push(n)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox(){if(!this.searchIsDirty)return;this.internalSearch!==this.getText(this.internalValue)&&this.setValue();const e=Boolean(this.$scopedSlots.selection)||this.hasChips;e&&(this.internalSearch=null)},updateSelf(){this.multiple?this.updateTags():this.updateCombobox()},updateTags(){const e=this.getMenuIndex();if(e<0&&!this.searchIsDirty||!this.internalSearch)return;if(this.editingIndex>-1)return this.updateEditing();const t=this.selectedItems.findIndex(e=>this.internalSearch===this.getText(e)),n=t>-1&&"object"===typeof this.selectedItems[t]?Object.assign({},this.selectedItems[t]):this.internalSearch;if(t>-1){const e=this.internalValue.slice();e.splice(t,1),this.setValue(e)}if(e>-1)return this.internalSearch=null;this.selectItem(n),this.internalSearch=null},onPaste(e){var t;if(!this.multiple||this.searchIsDirty)return;const n=null==(t=e.clipboardData)?void 0:t.getData("text/vnd.vuetify.autocomplete.item+plain");n&&-1===this.findExistingIndex(n)&&(e.preventDefault(),s["a"].options.methods.selectItem.call(this,n))},clearableCallback(){this.editingIndex=-1,i["a"].options.methods.clearableCallback.call(this)}}})},"2bfd":function(e,t,n){},"61d21":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-combobox",{attrs:{readonly:e.readOnly,items:e.companies.list,"menu-props":e.menuProps,"search-input":e.search,rules:e.field.isRequired?e.rules.isRequired:[],hint:e.field.isRequired?"* Este campo es obligatorio":"",maxlength:"50",counter:"","item-value":"id","item-text":"name",label:"Empresa","hide-details":"auto",dense:"",outlined:"",clearable:"","full-width":"","hide-selected":"","persistent-hint":"","hide-no-data":e.$apollo.queries.companies.loading,loading:e.$apollo.queries.companies.loading},on:{"update:searchInput":function(t){e.search=t},"update:search-input":function(t){e.search=t}},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.index,i=t.item;return[n("span",{key:s},[e._v(" "+e._s(i.name)+" ")])]}},{key:"selection",fn:function(t){var s=t.attrs,i=t.item,a=t.selected;return[n("span",e._b({attrs:{"input-value":a}},"span",s,!1),[e._v(" "+e._s(i.name?i.name:i)+" ")])]}}]),model:{value:e.company,callback:function(t){e.company=t},expression:"company"}})},i=[],a=(n("ac1f"),n("841c"),n("f82a")),l=n("8b3e"),r={name:"FieldSelectCompany",mixins:[a["a"]],props:{field:{type:Object,required:!0},resetHandler:{type:Boolean,default:!1}},data:function(){return{search:"",company:"",companies:{}}},watch:{resetHandler:function(e){e||this.resetValues()},company:function(e){e&&(this.field.value=e.id)}},computed:{hasSearch:function(){return null!==this.search&&void 0!==this.search&&""!==this.search&&this.search.length>0},menuProps:function(){return this.search?{}:{value:!1}},readOnly:function(){return null!==this.company&&void 0!==this.company&&""!==this.company}},methods:{clearValue:function(){this.company=""},resetValues:function(){delete this.field.value,this.company=""}},apollo:{companies:{query:l["a"],variables:function(){return{filters:{orderBy:"desc",search:this.search}}},skip:function(){return!this.hasSearch}}}},o=r,c=n("0c7c"),h=n("6544"),d=n.n(h),u=n("2b5d"),m=Object(c["a"])(o,s,i,!1,null,null,null);t["default"]=m.exports;d()(m,{VCombobox:u["a"]})},"841c":function(e,t,n){"use strict";var s=n("d784"),i=n("825a"),a=n("1d80"),l=n("129f"),r=n("14c3");s("search",(function(e,t,n){return[function(t){var n=a(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,n):new RegExp(t)[e](String(n))},function(e){var s=n(t,this,e);if(s.done)return s.value;var a=i(this),o=String(e),c=a.lastIndex;l(c,0)||(a.lastIndex=0);var h=r(a,o);return l(a.lastIndex,c)||(a.lastIndex=c),null===h?-1:h.index}]}))},"8b3e":function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"f",(function(){return u})),n.d(t,"c",(function(){return m})),n.d(t,"d",(function(){return p})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return I}));var s,i,a,l,r,o,c=n("8785"),h=n("5184"),d=Object(h["a"])(s||(s=Object(c["a"])(["\n  query getCompanies($filters: FilterCompanies, $importId: ID) {\n    companies(filters: $filters, importId: $importId) {\n      count\n      informationBar {\n        totalCount\n        companiesWithOpenDeals\n        companiesWithWonDeals\n      }\n      list {\n        id\n        name\n        address\n        website\n        phones\n        socialMedias\n        createdAt\n        updatedAt\n        customForms\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        companyCounts {\n          openDeals\n          closedDeals\n          lostDeals\n          wonDeals\n          emailMessages\n          totalActivities\n          doneActivities\n          undoneActivities\n          files\n          notes\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        tags {\n          id\n          name\n          color\n          order\n        }\n        contacts {\n          id\n          name\n        }\n      }\n    }\n  }\n"]))),u=Object(h["a"])(i||(i=Object(c["a"])(["\n  query getCompanies($filters: FilterCompanies) {\n    searchCompanies: companies(filters: $filters) {\n      count\n      list {\n        id\n        name\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),m=Object(h["a"])(a||(a=Object(c["a"])(["\n  query getCompany($companyId: ID!) {\n    company(companyId: $companyId) {\n      id\n      name\n      address\n      website\n      phones\n      customForms\n      socialMedias\n      files\n      isDelete\n      tags {\n        id\n        name\n        color\n        order\n      }\n      owner {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      contacts {\n        id\n        name\n        owner {\n          id\n        }\n      }\n      deals {\n        id\n        title\n        value\n        status\n        contact {\n          id\n          name\n        }\n        company {\n          id\n          name\n        }\n        stage {\n          id\n        }\n        pipeline {\n          id\n          stages {\n            id\n          }\n        }\n        owner {\n          id\n        }\n      }\n    }\n  }\n"]))),p=Object(h["a"])(l||(l=Object(c["a"])(["\n  query getCompanyHistory($companyId: ID!) {\n    companyHistory: company(companyId: $companyId) {\n      id\n      name\n      files\n      import {\n        id\n      }\n      activityStream {\n        id\n        flow\n        users {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        contacts {\n          id\n          name\n        }\n        deals {\n          id\n          title\n        }\n        customs {\n          id\n          label\n        }\n      }\n      notes {\n        id\n        content\n        type\n        userTags {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        comments {\n          id\n          comment\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n      activities {\n        id\n        title\n        status\n        start\n        end\n        location\n        description\n        deal {\n          id\n          title\n        }\n        contacts {\n          id\n          name\n        }\n        companies {\n          id\n          name\n        }\n        type {\n          id\n          name\n          color\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        notes {\n          id\n          content\n          type\n          userTags {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdBy {\n            id\n            user {\n              id\n              name\n              lastName\n            }\n          }\n          createdAt\n          comments {\n            id\n            comment\n            userTags {\n              id\n            }\n            createdBy {\n              id\n              user {\n                id\n                name\n                lastName\n              }\n            }\n            createdAt\n          }\n        }\n        completedDate\n        createdAt\n        isAllDay\n        guests\n      }\n    }\n  }\n"]))),f=Object(h["a"])(r||(r=Object(c["a"])(["\n  query getCompaniesToActivity($filters: FilterCompanies) {\n    companies(filters: $filters) {\n      count\n      list {\n        id\n        name\n      }\n    }\n  }\n"]))),I=Object(h["a"])(o||(o=Object(c["a"])(["\n  query DuplicateCompanies {\n    duplicateCompanies {\n      list {\n        id\n        name\n        address\n        contacts {\n          id\n          name\n        }\n        companyCounts {\n          openDeals\n          totalActivities\n        }\n        owner {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdBy {\n          id\n          user {\n            id\n            name\n            lastName\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"])))},c6a6:function(e,t,n){"use strict";n("2bfd");var s=n("b974"),i=n("8654"),a=n("d9f7"),l=n("80d2");const r={...s["b"],offsetY:!0,offsetOverflow:!0,transition:!1};t["a"]=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,n)=>n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:()=>r},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...s["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(e=>this.getValue(e))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(e=>!this.hasItem(e)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(e=>{const t=Object(l["s"])(e,this.itemText),n=null!=t?String(t):"";return this.filter(e,String(this.internalSearch),n)})},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=s["a"].options.computed.$_menuProps.call(this);return e.contentClass=("v-autocomplete__content "+(e.contentClass||"")).trim(),{...r,...e}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue)))},listData(){const e=s["a"].options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=null)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(e,t){e!==t&&(this.setMenuIndex(-1),this.$nextTick(()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.setMenuIndex(0))}))},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===l["z"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===l["z"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==l["z"].backspace&&e!==l["z"].delete||this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const n=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==n)return void(this.selectedIndex=n);const s=this.selectedItems.length,i=e!==s-1?e:e-1,a=this.selectedItems[i];a?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=i},clearableCallback(){this.internalSearch=null,s["a"].options.methods.clearableCallback.call(this)},genInput(){const e=i["a"].options.methods.genInput.call(this);return e.data=Object(a["a"])(e.data,{attrs:{"aria-activedescendant":Object(l["q"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(l["q"])(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=s["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,n=t.value;t.value&&this.activateMenu(),this.internalSearch=n,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[l["z"].home,l["z"].end].includes(t)||s["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){s["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){s["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){var t,n;if(-1===this.selectedIndex)return;const s=this.selectedItems[this.selectedIndex],i=this.getText(s);null==(t=e.clipboardData)||t.setData("text/plain",i),null==(n=e.clipboardData)||n.setData("text/vnd.vuetify.autocomplete.item+plain",i),e.preventDefault()}}})}}]);
//# sourceMappingURL=chunk-605617b8.2b6a1b00.js.map