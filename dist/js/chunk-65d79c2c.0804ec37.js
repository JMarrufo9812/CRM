(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65d79c2c"],{"0510":function(e,t,a){},b2b4:function(e,t,a){"use strict";a("0510")},c3e5:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.isRelativeDate?e._e():a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,l=t.attrs;return[a("v-text-field",e._g(e._b({class:[e.inputProps?e.inputProps.class:"",e.field.isRequired?"required":""],attrs:{label:e.field.label||"Fecha",dense:!!e.inputProps&&e.inputProps.isDense,"prepend-icon":e.field.icon?e.field.icon:"mdi-calendar",readonly:"",outlined:"","hide-details":"auto"},model:{value:e.field.value,callback:function(t){e.$set(e.field,"value",t)},expression:"field.value"}},"v-text-field",l,!1),i))]}}],null,!1,72296831),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{max:e.maxDate,min:e.minDate},on:{input:function(t){e.menu=!1}},model:{value:e.field.value,callback:function(t){e.$set(e.field,"value",t)},expression:"field.value"}})],1),e.isRelativeDate?a("v-select",{attrs:{items:e.typeTimes,"item-text":"text","item-value":"value",label:"Tiempo relativo","hide-details":"auto",dense:"",outlined:""},model:{value:e.field.value,callback:function(t){e.$set(e.field,"value",t)},expression:"field.value"}}):e._e(),a("div",{staticClass:"d-flex justify-center"},[a("v-btn",{attrs:{"x-small":""},on:{click:function(t){e.isRelativeDate=!e.isRelativeDate}}},[e._v(" "+e._s(e.isRelativeDate?"Fecha exacta":"Tiempo relativo")+" ")])],1)],1)},l=[],n=a("c1df"),s=a.n(n),u=a("ec60"),o={name:"FieldDate",mixins:[u["a"]],props:{field:{type:Object,required:!0},inputProps:{type:Object,required:!1},resetHandler:{type:Boolean,default:!1}},data:function(){return{menu:!1,date:this.field.value,isRelativeDate:!0,typeTimes:[{text:"Último trimestre",value:"last_quarter"},{text:"Este trimestre",value:"this_quarter"},{text:"Ultimo mes",value:"last_month"},{text:"Este mes",value:"this_month"},{text:"Última semana",value:"last_week"},{text:"Esta semana",value:"this_week"}]}},mounted:function(){var e=Date.parse(this.field.value);this.isRelativeDate=!e},watch:{isRelativeDate:function(e){this.field.value=e?"":s()().format("YYYY-MM-DD")}},methods:{changeMode:function(){this.isRelativeDate=!this.isRelativeDate},resetValues:function(){delete this.field.defaultValue,delete this.field.value}}},c=o,r=(a("b2b4"),a("0c7c")),d=a("6544"),f=a.n(d),v=a("8336"),m=a("2e4b"),p=a("e449"),h=a("b974"),D=a("8654"),x=Object(r["a"])(c,i,l,!1,null,"152b57f8",null);t["default"]=x.exports;f()(x,{VBtn:v["a"],VDatePicker:m["a"],VMenu:p["a"],VSelect:h["a"],VTextField:D["a"]})},ec60:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var i=a("c1df"),l=a.n(i),n={data:function(){return{maxDate:l()().add(5,"years").format("YYYY-MM-DD"),minDate:l()().add(-5,"years").format("YYYY-MM-DD")}}}}}]);
//# sourceMappingURL=chunk-65d79c2c.0804ec37.js.map