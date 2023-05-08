(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-176929e6"],{4420:function(e,s,n){"use strict";n.d(s,"a",(function(){return r}));var r={data:function(){return{snackbar:{isOpen:!1,color:"",text:""}}},methods:{snackbarHandler:function(e){var s=e.isOpen,n=e.color,r=e.text;this.snackbar={isOpen:s,color:n,text:r}}}}},"74a5":function(e,s,n){},c002:function(e,s,n){"use strict";n.r(s);var r=function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("v-card",{attrs:{outlined:"",width:"35em"}},[n("v-card-title",{staticClass:"d-flex flex-column justify-center mt-10"},[n("p",{staticClass:"title-password"},[e._v("Contraseña")]),n("p",{staticClass:"text-password"},[e._v(" Elija una contraseña segura y no la reutilice para otras cuentas. ")])]),n("v-card-text",[n("div",{staticClass:"d-flex justify-center"},[n("v-form",{ref:"formPasswords",model:{value:e.isValidate,callback:function(s){e.isValidate=s},expression:"isValidate"}},[n("v-text-field",{attrs:{"prepend-inner-icon":"mdi-lock",type:e.isShowOldPassword?"text":"password",rules:e.rules.isRequired,"append-icon":e.isShowOldPassword?"mdi-eye":"mdi-eye-off",label:"Contraseña actual",outlined:"",error:!e.isValidPasswordCurrent,"error-messages":e.errorMessages,dense:"",required:""},on:{"click:append":function(s){e.isShowOldPassword=!e.isShowOldPassword}},model:{value:e.oldPassword,callback:function(s){e.oldPassword=s},expression:"oldPassword"}}),n("v-text-field",{attrs:{hint:"Al menos 8 carácteres. Combina letras y números.","persistent-hint":"","validate-on-blur":"","prepend-inner-icon":"mdi-lock-outline",rules:e.rules.password,counter:"",type:e.isShowNewPassword?"text":"password","append-icon":e.isShowNewPassword?"mdi-eye":"mdi-eye-off",label:"Nueva contraseña",outlined:"",dense:""},on:{"click:append":function(s){e.isShowNewPassword=!e.isShowNewPassword}},model:{value:e.newPassword,callback:function(s){e.newPassword=s},expression:"newPassword"}}),n("v-text-field",{attrs:{"prepend-inner-icon":"mdi-lock-outline",counter:"",rules:e.rules.isRequired,type:e.isShowNewPassword?"text":"password","append-icon":e.isShowNewPassword?"mdi-eye":"mdi-eye-off",error:e.verificationPassword,"error-messages":e.verificationPassword?"Las contraseñas no coinciden":"",label:"Confirmar nueva contraseña",outlined:"",dense:""},on:{"click:append":function(s){e.isShowNewPassword=!e.isShowNewPassword}},model:{value:e.confirmNewPassword,callback:function(s){e.confirmNewPassword=s},expression:"confirmNewPassword"}})],1)],1),n("div",{staticClass:"d-flex justify-center mb-12"},[n("v-btn",{staticClass:"mt-4 mr-2",attrs:{large:"",tile:"",outlined:"",color:"primary"},on:{click:e.resetPasswordInputs}},[e._v(" Cancelar ")]),n("v-btn",{staticClass:"mt-4",attrs:{loading:e.loadingChangePassword,large:"",tile:"",color:"secondary"},on:{click:e.updateUserPassword}},[e._v(" Cambiar contraseña ")])],1),n("BaseModalError",{attrs:{modalHandler:e.modalError},on:{close:e.modalHandlerError}}),n("v-snackbar",{attrs:{color:e.snackbar.color,timeout:7e3},scopedSlots:e._u([{key:"action",fn:function(){return[n("v-btn",{attrs:{text:""},on:{click:function(s){return e.snackbarHandler({isOpen:!1,color:"",text:""})}}},[e._v(" Cerrar ")])]},proxy:!0}]),model:{value:e.snackbar.isOpen,callback:function(s){e.$set(e.snackbar,"isOpen",s)},expression:"snackbar.isOpen"}},[e._v(" "+e._s(e.snackbar.text)+" ")])],1)],1)},a=[],t=n("f82a"),o=n("4420"),i=n("1e6d"),d=n("e815"),c=n("f647"),u={name:"PasswordAndLoginSettigns",mixins:[t["a"],o["a"],i["a"]],data:function(){return{isValidate:!0,isShowNewPassword:!1,isShowOldPassword:!1,loadingChangePassword:!1,oldPassword:"",newPassword:"",confirmNewPassword:"",isValidPasswordCurrent:!0}},computed:{errorMessages:function(){return this.isValidPasswordCurrent?[]:["La contraseña actual es incorrecta"]},verificationPassword:function(){return this.confirmNewPassword!==this.newPassword}},watch:{oldPassword:function(){this.isValidPasswordCurrent=!0}},methods:{updateUserPassword:function(){var e=this;if(this.$refs.formPasswords.validate()){var s=this.userCurrent.user;this.loadingChangePassword=!0,this.$apollo.mutate({mutation:c["f"],variables:{input:{id:s.id,oldPassword:this.oldPassword,newPassword:this.newPassword}}}).then((function(s){var n=s.data.updateUserPassword,r=n.message,a=n.status;if(e.loadingChangePassword=!1,400===a){var t="La contraseña actual es incorrecta";e.modalHandlerError({isOpen:!0,error:t}),e.isValidPasswordCurrent=!1}if(200===a&&r.success&&(e.resetPasswordInputs(),e.snackbarHandler({isOpen:!0,color:"success",text:"La contraseña se actualizo correctamente, asegúrate de introducir tu nueva contraseña la próxima vez que inicies sesión"})),200===a&&!r.success){var o="No se pudo actualizar la contraseña porque es igual a la actual por favor introduzca una contraseña diferente";e.modalHandlerError({isOpen:!0,error:o})}})).catch((function(s){e.modalHandlerError({isOpen:!0,error:s}),e.loadingChangePassword=!1}))}},resetPasswordInputs:function(){this.$refs.formPasswords.reset(),this.$refs.formPasswords.resetValidation(),this.isShowNewPassword=!1,this.isShowOldPassword=!1,this.errorPassword=!1,this.oldPassword="",this.newPassword="",this.confirmNewPassword=""}},apollo:{userCurrent:{query:d["k"]}}},l=u,p=(n("d435"),n("0c7c")),w=n("6544"),f=n.n(w),m=n("8336"),P=n("b0af"),h=n("99d9"),b=n("4bd4"),v=n("2db4"),k=n("8654"),x=Object(p["a"])(l,r,a,!1,null,"5d10dbb4",null);s["default"]=x.exports;f()(x,{VBtn:m["a"],VCard:P["a"],VCardText:h["c"],VCardTitle:h["d"],VForm:b["a"],VSnackbar:v["a"],VTextField:k["a"]})},d435:function(e,s,n){"use strict";n("74a5")},f647:function(e,s,n){"use strict";n.d(s,"a",(function(){return l})),n.d(s,"b",(function(){return p})),n.d(s,"c",(function(){return w})),n.d(s,"e",(function(){return f})),n.d(s,"f",(function(){return m})),n.d(s,"d",(function(){return P}));var r,a,t,o,i,d,c=n("8785"),u=n("5184"),l=Object(u["a"])(r||(r=Object(c["a"])(["\n  mutation changeUserStatus($input: userEnterpriseUpdateInput!) {\n    pauseAccount(userEnterpriseInput: $input) {\n      id\n      isActive\n      user {\n        id\n      }\n    }\n  }\n"]))),p=Object(u["a"])(a||(a=Object(c["a"])(["\n  mutation createUser($input: userCreateInput!) {\n    createUser(userInput: $input) {\n      id\n      isActive\n      user {\n        id\n        name\n        lastName\n        email\n        phones\n      }\n      role {\n        id\n        name\n        type\n      }\n      group {\n        id\n        name\n      }\n    }\n  }\n"]))),w=Object(u["a"])(t||(t=Object(c["a"])(["\n  mutation deleteUserEnterprise($input: userEnterpriseDeleteInput!) {\n    deleteUserEnterprise(userEnterpriseInput: $input) {\n      id\n      user {\n        id\n        name\n        lastName\n        email\n        phones\n      }\n      role {\n        id\n        name\n        type\n      }\n      group {\n        id\n        name\n      }\n    }\n  }\n"]))),f=Object(u["a"])(o||(o=Object(c["a"])(["\n  mutation updateUserEnterprise($input: userEnterpriseUpdateInput!) {\n    updateUserEnterprise(userEnterpriseInput: $input) {\n      id\n      isActive\n      user {\n        id\n        name\n        lastName\n        email\n        phones\n        config {\n          profileUrl\n        }\n      }\n      role {\n        id\n        name\n        type\n      }\n      group {\n        id\n        name\n      }\n    }\n  }\n"]))),m=Object(u["a"])(i||(i=Object(c["a"])(["\n  mutation UpdateUserPassword($input: userUpdatePasswordInput!) {\n    updateUserPassword(userInput: $input) {\n      status\n      message\n    }\n  }\n"]))),P=Object(u["a"])(d||(d=Object(c["a"])(["\n  mutation updateUser($userInput: userUpdateInput!) {\n    updateUser(userInput: $userInput) {\n      id\n      email\n      name\n      lastName\n    }\n  }\n"])))}}]);
//# sourceMappingURL=chunk-176929e6.56e28931.js.map