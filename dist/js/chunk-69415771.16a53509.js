(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69415771"],{"0cb2":function(e,t,n){var i=n("7b0b"),a=Math.floor,o="".replace,r=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,d=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,n,u,c,s){var l=n+e.length,m=u.length,p=d;return void 0!==c&&(c=i(c),p=r),o.call(s,p,(function(i,o){var r;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(l);case"<":r=c[o.slice(1,-1)];break;default:var d=+o;if(0===d)return i;if(d>m){var s=a(d/10);return 0===s?i:s<=m?void 0===u[s-1]?o.charAt(1):u[s-1]+o.charAt(1):i}r=u[d-1]}return void 0===r?"":r}))}},1648:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mr-11 pb-2",attrs:{color:"#FDE584"}},[n("NoteTemplate",{attrs:{note:e.item,ownerId:e.ownerId,typeItem:e.typeItem},on:{edit:e.edit,remove:e.removeConfirm}}),e.comments?n("NoteListComments",{attrs:{note:e.item,ownerId:e.ownerId,typeItem:e.typeItem},on:{updateHistory:e.updateHistory}}):e._e(),!e.canEdit&&!e.canEditOthers||e.item.isDelete?e._e():n("NoteAddComment",{attrs:{note:e.item,userCurrent:e.userCurrent},on:{updateHistory:e.updateHistory}}),n("BaseModalDelete",{attrs:{modalHandler:e.modalDelete},on:{cancel:e.modalHandlerDelete,confirm:e.remove}}),n("BaseModalError",{attrs:{modalHandler:e.modalError},on:{close:e.modalHandlerError}})],1)},a=[],o=(n("d3b7"),n("3ca3"),n("ddb0"),n("ac1f"),n("5319"),n("4b58")),r=n("9685"),d=n("62f2"),u=n("e815"),c=n("1891"),s=n("1e6d"),l=n("6b2a"),m=n("891c"),p=n("ee2e"),f={name:"Note",components:{NoteTemplate:function(){return n.e("chunk-2e6b18ee").then(n.bind(null,"2e2f"))},NoteAddComment:function(){return Promise.all([n.e("chunk-8277adaa"),n.e("chunk-4c461642"),n.e("chunk-607ca9af")]).then(n.bind(null,"c9f3"))},NoteListComments:function(){return n.e("chunk-e0124d94").then(n.bind(null,"f1a6"))}},mixins:[s["a"],c["b"],c["a"],l["a"]],props:{item:{type:Object,required:!0},typeItem:{type:String,required:!0,default:""},ownerId:{type:String,default:""},itemId:{type:String,default:"",required:!0},comments:{type:Boolean,default:!0,required:!1}},data:function(){return{userCurrent:{},UPDATE:m["r"],UPDATE_OTHERS:m["s"],subject:o["b"],PERMISSIONS_CONTACTS:p["e"],PERMISSIONS_COMPANIES:p["d"],PERMISSIONS_DEALS:p["f"],PERMISSIONS_NOTES:p["j"]}},computed:{filters:function(){var e={orderBy:"desc"};return"CONTACT"===this.typeItem?e.contactId=this.itemId:"COMPANY"===this.typeItem?e.companyId=this.itemId:"DEAL"===this.typeItem&&(e.dealId=this.itemId),e},isMe:function(){return r["a"].can(m["r"],Object(o["b"])(p["j"],{authorId:this.item.createdBy.id||""}))},canEdit:function(){return"CONTACT"===this.typeItem?r["a"].can(m["r"],Object(o["b"])(p["e"],{authorId:this.ownerId||""})):"COMPANY"===this.typeItem?r["a"].can(m["r"],Object(o["b"])(p["d"],{authorId:this.ownerId||""})):"DEAL"===this.typeItem&&r["a"].can(m["r"],Object(o["b"])(p["f"],{authorId:this.ownerId||""}))},canEditOthers:function(){return"CONTACT"===this.typeItem?this.canEdit?r["a"].can(m["s"],p["e"]):r["a"].can(m["s"],p["e"])&&!r["a"].can(m["s"],Object(o["b"])(p["e"],{authorId:this.ownerId||""})):"COMPANY"===this.typeItem?this.canEdit?r["a"].can(m["s"],p["d"]):r["a"].can(m["s"],p["d"])&&!r["a"].can(m["s"],Object(o["b"])(p["d"],{authorId:this.ownerId||""})):"DEAL"===this.typeItem&&(this.canEdit?r["a"].can(m["s"],p["f"]):r["a"].can(m["s"],p["f"])&&!r["a"].can(m["s"],Object(o["b"])(p["f"],{authorId:this.ownerId||""})))}},methods:{removeConfirm:function(){this.modalHandlerDelete({isOpen:!0,isLoading:!1,message:{nameItem:"La Nota",text:"será eliminada"},infoDelete:{}})},remove:function(e){var t=this,n=e.isOpen,i=e.isLoading,a=e.message,o=e.infoDelete;this.modalHandlerDelete({isOpen:n,isLoading:i,message:a,infoDelete:o});var r=this.item,u=r.id,c=r.content,s=[];c.replace(/<img[^>]*>/gi,(function(e){e.replace(/\b(alt\s*=\s*(?:['"]?))([^'"> ]+)/i,(function(e,t,n){s.push({key:n})}))})),this.$apollo.mutate({mutation:d["d"],variables:{noteInput:{noteId:u}}}).then((function(){t.updateHistory(),s.forEach((function(e){var n=e.key;t.deleteFileWhitOutModal(n)})),t.modalHandlerDelete({isOpen:!1,isLoading:i,message:a,infoDelete:o})})).catch((function(){var e="No se pudo eliminar la nota, intente de nuevo o contacte a soporte";t.modalHandlerError({isOpen:!0,error:e})}))},edit:function(){this.changeModal({id:"createNote",status:!0,isEdit:!0,item:this.item})},updateHistory:function(){this.$emit("updateHistory")}},apollo:{userCurrent:{query:u["k"]}}},h=f,I=(n("22ea"),n("0c7c")),b=n("6544"),v=n.n(b),O=n("b0af"),g=Object(I["a"])(h,i,a,!1,null,"fb8616e8",null);t["default"]=g.exports;v()(g,{VCard:O["a"]})},"22ea":function(e,t,n){"use strict";n("8b8d")},5319:function(e,t,n){"use strict";var i=n("d784"),a=n("d039"),o=n("825a"),r=n("50c4"),d=n("a691"),u=n("1d80"),c=n("8aa5"),s=n("0cb2"),l=n("14c3"),m=n("b622"),p=m("replace"),f=Math.max,h=Math.min,I=function(e){return void 0===e?e:String(e)},b=function(){return"$0"==="a".replace(/./,"$0")}(),v=function(){return!!/./[p]&&""===/./[p]("a","$0")}(),O=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));i("replace",(function(e,t,n){var i=v?"$":"$0";return[function(e,n){var i=u(this),a=void 0==e?void 0:e[p];return void 0!==a?a.call(e,i,n):t.call(String(i),e,n)},function(e,a){if("string"===typeof a&&-1===a.indexOf(i)&&-1===a.indexOf("$<")){var u=n(t,this,e,a);if(u.done)return u.value}var m=o(this),p=String(e),b="function"===typeof a;b||(a=String(a));var v=m.global;if(v){var O=m.unicode;m.lastIndex=0}var g=[];while(1){var y=l(m,p);if(null===y)break;if(g.push(y),!v)break;var N=String(y[0]);""===N&&(m.lastIndex=c(p,r(m.lastIndex),O))}for(var $="",C=0,E=0;E<g.length;E++){y=g[E];for(var j=String(y[0]),F=f(h(d(y.index),p.length),0),S=[],H=1;H<y.length;H++)S.push(I(y[H]));var D=y.groups;if(b){var A=[j].concat(S,F,p);void 0!==D&&A.push(D);var L=String(a.apply(void 0,A))}else L=s(j,p,F,S,D,a);F>=C&&($+=p.slice(C,F)+L,C=F+j.length)}return $+p.slice(C)}]}),!O||!b||v)},"62f2":function(e,t,n){"use strict";n.d(t,"b",(function(){return m})),n.d(t,"f",(function(){return p})),n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return h})),n.d(t,"e",(function(){return I})),n.d(t,"c",(function(){return b})),n.d(t,"g",(function(){return v}));var i,a,o,r,d,u,c,s=n("8785"),l=n("5184"),m=Object(l["a"])(i||(i=Object(s["a"])(["\n  mutation createNote($noteInput: noteCreateInput!) {\n    createNote(noteInput: $noteInput) {\n      id\n      content\n      type\n      comments {\n        id\n        comment\n      }\n      userTags {\n        id\n      }\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n    }\n  }\n"]))),p=Object(l["a"])(a||(a=Object(s["a"])(["\n  mutation updateNote($noteInput: noteUpdateInput!) {\n    updateNote(noteInput: $noteInput) {\n      id\n      content\n      type\n      userTags {\n        id\n      }\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n    }\n  }\n"]))),f=Object(l["a"])(o||(o=Object(s["a"])(["\n  mutation deleteNote($noteInput: noteId!) {\n    deleteNote(noteInput: $noteInput) {\n      id\n    }\n  }\n"]))),h=Object(l["a"])(r||(r=Object(s["a"])(["\n  mutation createNoteComment($noteCommentInput: noteCommentCreateInput) {\n    createNoteComment(noteCommentInput: $noteCommentInput) {\n      id\n      comment\n      userTags {\n        id\n      }\n      note {\n        id\n      }\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n    }\n  }\n"]))),I=Object(l["a"])(d||(d=Object(s["a"])(["\n  mutation updateNoteComment($noteCommentInput: noteCommentUpdateInput) {\n    updateNoteComment(noteCommentInput: $noteCommentInput) {\n      id\n      comment\n      userTags {\n        id\n      }\n      note {\n        id\n      }\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n    }\n  }\n"]))),b=Object(l["a"])(u||(u=Object(s["a"])(["\n  mutation deleteNoteComment($noteCommentId: ID!) {\n    deleteNoteComment(noteCommentId: $noteCommentId) {\n      id\n    }\n  }\n"]))),v=Object(l["a"])(c||(c=Object(s["a"])(["\n  mutation UploadNoteFile($input: TypeFileNoteInput!) {\n    uploadNoteFile(upFile: $input) {\n      link\n      key\n    }\n  }\n"])))},"6b2a":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("b0c0"),n("a4d3"),n("e01a");var i=n("8907"),a={data:function(){return{modalFileEdit:{isOpen:!1,isLoading:!1,info:{}}}},methods:{modalFileEditHandler:function(e){var t=e.isOpen,n=e.isLoading,i=e.info;this.modalFileEdit={isOpen:t,isLoading:n,info:i}},uploadFile:function(e,t,n,a){var o=this;this.isLoading=!0;var r=n.name,d=n.size;this.$apollo.mutate({mutation:i["c"],client:"files",variables:{input:{location:e,idSource:t,name:r,size:d,file:n}}}).then((function(n){var i=n.data.uploadFile;if(a.length>0){var r={item:{id:i.id,description:a},itemId:t,typeItem:e};o.updateFile({isOpen:!1,isLoading:!1,info:r})}else o.$emit("updateHistory");o.isLoading=!1,o.close()})).catch((function(){o.isLoading=!1;var e="No se ha podido subir el archivo, intente de nuevo o contacte a soporte";o.modalHandlerError({isOpen:!0,error:e})}))},updateFile:function(e){var t=this,n=e.isOpen,a=e.isLoading,o=e.info;this.modalFileEditHandler({isOpen:n,isLoading:a,info:o});var r={idSource:o.itemId,fileId:o.item.id,location:o.typeItem,description:o.item.description};this.$apollo.mutate({mutation:i["b"],variables:{input:r}}).then((function(){t.$emit("updateHistory"),t.modalFileEditHandler({isOpen:!1,isLoading:!1,info:{}})})).catch((function(){t.modalFileEditHandler({isOpen:!0,isLoading:!1,info:{}});var e="No se pudo agregar la descripcion al archivo, intente de nuevo o contacte a soporte";t.modalHandlerError({isOpen:!0,error:e})}))},deleteFile:function(e){var t=this,n=e.isOpen,a=e.isLoading,o=e.message,r=e.infoDelete;this.modalHandlerDelete({isOpen:n,isLoading:a,message:o,infoDelete:r}),this.$apollo.mutate({mutation:i["a"],client:"files",variables:{input:{key:r.data.item.url.key,idSource:r.data.itemId,fileId:r.data.item.id,location:r.data.typeItem}}}).then((function(){t.$emit("updateHistory"),t.modalHandlerDelete({isOpen:!1,isLoading:a,message:o,infoDelete:r})})).catch((function(){var e="No se pudo eliminar el archivo, intente de nuevo o contacte a soporte";t.modalHandlerError({isOpen:!0,error:e})}))},deleteFileWhitOutModal:function(e){var t=this,n={key:e};this.$apollo.mutate({client:"files",mutation:i["a"],variables:{input:n}}).catch((function(){var e="No se pudo eliminar el archivo, intente de nuevo o contacte a soporte";t.modalHandlerError({isOpen:!0,error:e})}))}}}},8907:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var i,a,o,r,d=n("8785"),u=n("5184"),c=Object(u["a"])(i||(i=Object(d["a"])(["\n  mutation UploadFile($input: TypeFileInput!) {\n    uploadFile(upFile: $input) {\n      id\n      name\n      fileExtension\n      url {\n        link\n        key\n      }\n      description\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n      size\n    }\n  }\n"]))),s=Object(u["a"])(a||(a=Object(d["a"])(["\n  mutation uploadProfilePhoto($input: FileInput!) {\n    uploadProfilePhoto(upFile: $input) {\n      link\n    }\n  }\n"]))),l=Object(u["a"])(o||(o=Object(d["a"])(["\n  mutation DeleteFile($input: DeleteFile!) {\n    deleteFile(deleteFile: $input)\n  }\n"]))),m=Object(u["a"])(r||(r=Object(d["a"])(["\n  mutation UpdateDescriptionFile($input: descriptionInput!) {\n    updateDescriptionFile(descriptionInput: $input) {\n      id\n      name\n      url {\n        key\n        link\n      }\n      description\n      size\n      createdBy {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      createdAt\n    }\n  }\n"])))},"8b8d":function(e,t,n){}}]);
//# sourceMappingURL=chunk-69415771.16a53509.js.map