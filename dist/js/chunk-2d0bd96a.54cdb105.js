(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd96a"],{"2d46":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-row",{staticClass:"px-12",attrs:{justify:"center","no-gutters":""}},[t("v-col",{staticClass:"py-12",attrs:{cols:"12",align:"center"}},[t("p",{staticClass:"text-center text-h4"},[e._v(" ¡Bienvenido a "+e._s(e.userEnterprise.enterprise.name)+"! ")]),t("p",{staticClass:"text-center"},[e._v(" Antes de formar parte del equipo necesitamos unos datos para continuar ")])]),t("v-card",{attrs:{outlined:"",width:"480"}},[t("v-card-title",{staticClass:"primary white--text"},[e._v(" Completa tu registro ")]),t("v-card-text",{staticClass:"mt-10"},[t("v-form",{ref:"formUser",model:{value:e.isValidate,callback:function(s){e.isValidate=s},expression:"isValidate"}},[t("v-row",[t("v-col",{attrs:{cols:"6"}},[t("v-text-field",{staticClass:"required",attrs:{rules:e.rules.general.concat(e.rules.text),outlined:"",label:"Nombre(s)","hide-details":"auto"},model:{value:e.user.name,callback:function(s){e.$set(e.user,"name",s)},expression:"user.name"}})],1),t("v-col",{attrs:{cols:"6"}},[t("v-text-field",{staticClass:"required",attrs:{rules:e.rules.general.concat(e.rules.text),outlined:"",label:"Apellido(s)","hide-details":"auto"},model:{value:e.user.lastName,callback:function(s){e.$set(e.user,"lastName",s)},expression:"user.lastName"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{staticClass:"required",attrs:{outlined:"",rules:e.rules.password.concat(e.rules.isRequired),type:e.isShowPassword?"text":"password","append-icon":e.isShowPassword?"mdi-eye":"mdi-eye-off",label:"Contraseña","hide-details":"auto"},on:{"click:append":function(s){e.isShowPassword=!e.isShowPassword}},model:{value:e.user.password,callback:function(s){e.$set(e.user,"password",s)},expression:"user.password"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{staticClass:"required",attrs:{error:e.verificationPassword,"error-messages":e.verificationPassword?"Las contraseñas no coinciden":"",rules:e.rules.password.concat(e.rules.isRequired),type:e.isShowConfirmPassword?"text":"password","append-icon":e.isShowConfirmPassword?"mdi-eye":"mdi-eye-off",outlined:"",label:"Confirmar contraseña","hide-details":"auto"},on:{"click:append":function(s){e.isShowConfirmPassword=!e.isShowConfirmPassword}},model:{value:e.confirmPassword,callback:function(s){e.confirmPassword=s},expression:"confirmPassword"}})],1)],1),e._l(e.user.phones,(function(s,a){return t("v-row",{key:a+"-phone"},[t("v-col",{attrs:{cols:"12",md:"8"}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"##########",expression:"'##########'"}],attrs:{rules:e.rules.phoneNumber,type:"tel",counter:"10",maxlength:"10",outlined:"",required:"",label:e.user.phones.length>1?"Teléfono "+(a+1):"Teléfono","hide-details":"auto"},model:{value:s.number,callback:function(t){e.$set(s,"number",t)},expression:"phone.number"}})],1),t("v-col",{staticClass:"ml-2 ml-md-0 mt-md-2",attrs:{cols:"12",md:"4",align:"center"}},[0===a?t("v-btn",{attrs:{outlined:"",tile:"",disabled:e.user.phones.length>=3},on:{click:e.addNewPhoneUser}},[t("v-icon",{staticClass:"mr-2"},[e._v("mdi-phone-plus-outline")])],1):t("v-btn",{attrs:{outlined:"",tile:"",color:"error"},on:{click:function(s){return e.deletePhoneUser(a)}}},[t("v-icon",{staticClass:"mr-2"},[e._v("mdi-phone-minus")])],1)],1)],1)}))],2)],1),t("v-card-actions",[t("v-col",{attrs:{align:"end"}},[t("v-btn",{attrs:{loading:e.loading,"x-large":"",tile:"",normal:"",color:"secondary"},on:{click:e.outData}},[t("v-icon",{staticClass:"mr-2"},[e._v("mdi-account-arrow-right-outline")]),e._v(" Iniciar ")],1)],1)],1)],1)],1)},r=[],o=(t("a434"),t("f82a")),i={name:"CompleteSignUpForm",mixins:[o["a"]],props:{isUpdate:{required:!0,type:Boolean},userEnterprise:{required:!0,type:Object}},data:function(){return{isValidate:!0,loading:!1,isShowPassword:!1,isShowConfirmPassword:!1,confirmPassword:"",user:{password:"",name:"",lastName:"",phones:[{number:""}]}}},watch:{isUpdatePassword:function(e){e&&this.reset()}},computed:{verificationPassword:function(){return this.confirmPassword!==this.user.password}},methods:{addNewPhoneUser:function(){this.user.phones.length>=3||this.user.phones.push({number:""})},deletePhoneUser:function(e){this.user.phones.splice(e,1)},outData:function(){if(this.$refs.formUser.validate(),this.isValidate){this.loading=!0;var e=JSON.parse(JSON.stringify(this.user));this.$emit("outData",e)}},reset:function(){this.user={password:"",name:"",lastName:"",phones:[]},this.$refs.formUser.reset(),this.$refs.formUser.resetValidation()}}},n=i,l=t("0c7c"),d=t("6544"),c=t.n(d),u=t("8336"),m=t("b0af"),p=t("99d9"),f=t("62ad"),h=t("4bd4"),w=t("132d"),v=t("0fd9"),b=t("8654"),x=Object(l["a"])(n,a,r,!1,null,null,null);s["default"]=x.exports;c()(x,{VBtn:u["a"],VCard:m["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:f["a"],VForm:h["a"],VIcon:w["a"],VRow:v["a"],VTextField:b["a"]})}}]);
//# sourceMappingURL=chunk-2d0bd96a.54cdb105.js.map