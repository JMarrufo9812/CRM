(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b13cade"],{"03a42":function(e,t,i){"use strict";i("bb18");var a=i("8dd9"),s=(i("7863"),i("9e29"),i("c37a")),n=i("0789"),r=i("58df"),h=i("297c"),l=i("a293"),c=i("80d2"),o=i("d9bd"),d=Object(r["a"])(s["a"],h["a"]).extend({name:"v-slider",directives:{ClickOutside:l["a"]},mixins:[h["a"]],props:{disabled:Boolean,inverseLabel:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:1},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>"boolean"===typeof e||"always"===e},thumbSize:{type:[Number,String],default:32},tickLabels:{type:Array,default:()=>[]},ticks:{type:[Boolean,String],default:!1,validator:e=>"boolean"===typeof e||"always"===e},tickSize:{type:[Number,String],default:2},trackColor:String,trackFillColor:String,value:[Number,String],vertical:Boolean},data:()=>({app:null,oldValue:null,thumbPressed:!1,mouseTimeout:-1,isFocused:!1,isActive:!1,noClick:!1,startOffset:0}),computed:{classes(){return{...s["a"].options.computed.classes.call(this),"v-input__slider":!0,"v-input__slider--vertical":this.vertical,"v-input__slider--inverse-label":this.inverseLabel}},internalValue:{get(){return this.lazyValue},set(e){e=isNaN(e)?this.minValue:e;const t=this.roundValue(Math.min(Math.max(e,this.minValue),this.maxValue));t!==this.lazyValue&&(this.lazyValue=t,this.$emit("input",t))}},trackTransition(){return this.thumbPressed?this.showTicks||this.stepNumeric?"0.1s cubic-bezier(0.25, 0.8, 0.5, 1)":"none":""},minValue(){return parseFloat(this.min)},maxValue(){return parseFloat(this.max)},stepNumeric(){return this.step>0?parseFloat(this.step):0},inputWidth(){const e=(this.roundValue(this.internalValue)-this.minValue)/(this.maxValue-this.minValue)*100;return isNaN(e)?0:e},trackFillStyles(){const e=this.vertical?"bottom":"left",t=this.vertical?"top":"right",i=this.vertical?"height":"width",a=this.$vuetify.rtl?"auto":"0",s=this.$vuetify.rtl?"0":"auto",n=this.isDisabled?`calc(${this.inputWidth}% - 10px)`:this.inputWidth+"%";return{transition:this.trackTransition,[e]:a,[t]:s,[i]:n}},trackStyles(){const e=this.vertical?this.$vuetify.rtl?"bottom":"top":this.$vuetify.rtl?"left":"right",t=this.vertical?"height":"width",i="0px",a=this.isDisabled?`calc(${100-this.inputWidth}% - 10px)`:`calc(${100-this.inputWidth}%)`;return{transition:this.trackTransition,[e]:i,[t]:a}},showTicks(){return this.tickLabels.length>0||!(this.isDisabled||!this.stepNumeric||!this.ticks)},numTicks(){return Math.ceil((this.maxValue-this.minValue)/this.stepNumeric)},showThumbLabel(){return!this.isDisabled&&!(!this.thumbLabel&&!this.$scopedSlots["thumb-label"])},computedTrackColor(){if(!this.isDisabled)return this.trackColor?this.trackColor:this.isDark?this.validationState:this.validationState||"primary lighten-3"},computedTrackFillColor(){if(!this.isDisabled)return this.trackFillColor?this.trackFillColor:this.validationState||this.computedColor},computedThumbColor(){return this.thumbColor?this.thumbColor:this.validationState||this.computedColor}},watch:{min(e){const t=parseFloat(e);t>this.internalValue&&this.$emit("input",t)},max(e){const t=parseFloat(e);t<this.internalValue&&this.$emit("input",t)},value:{handler(e){this.internalValue=e}}},beforeMount(){this.internalValue=this.value},mounted(){this.app=document.querySelector("[data-app]")||Object(o["c"])("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot(){const e=[this.genLabel()],t=this.genSlider();return this.inverseLabel?e.unshift(t):e.push(t),e.push(this.genProgress()),e},genSlider(){return this.$createElement("div",{class:{"v-slider":!0,"v-slider--horizontal":!this.vertical,"v-slider--vertical":this.vertical,"v-slider--focused":this.isFocused,"v-slider--active":this.isActive,"v-slider--disabled":this.isDisabled,"v-slider--readonly":this.isReadonly,...this.themeClasses},directives:[{name:"click-outside",value:this.onBlur}],on:{click:this.onSliderClick,mousedown:this.onSliderMouseDown,touchstart:this.onSliderMouseDown}},this.genChildren())},genChildren(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isActive,this.isFocused,this.onFocus,this.onBlur)]},genInput(){return this.$createElement("input",{attrs:{value:this.internalValue,id:this.computedId,disabled:!0,readonly:!0,tabindex:-1,...this.$attrs}})},genTrackContainer(){const e=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track-background",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedTrackFillColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},e)},genSteps(){if(!this.step||!this.showTicks)return null;const e=parseFloat(this.tickSize),t=Object(c["i"])(this.numTicks+1),i=this.vertical?"bottom":this.$vuetify.rtl?"right":"left",a=this.vertical?this.$vuetify.rtl?"left":"right":"top";this.vertical&&t.reverse();const s=t.map(t=>{const s=[];this.tickLabels[t]&&s.push(this.$createElement("div",{staticClass:"v-slider__tick-label"},this.tickLabels[t]));const n=t*(100/this.numTicks),r=this.$vuetify.rtl?100-this.inputWidth<n:n<this.inputWidth;return this.$createElement("span",{key:t,staticClass:"v-slider__tick",class:{"v-slider__tick--filled":r},style:{width:e+"px",height:e+"px",[i]:`calc(${n}% - ${e/2}px)`,[a]:`calc(50% - ${e/2}px)`}},s)});return this.$createElement("div",{staticClass:"v-slider__ticks-container",class:{"v-slider__ticks-container--always-show":"always"===this.ticks||this.tickLabels.length>0}},s)},genThumbContainer(e,t,i,a,s,n,r="thumb"){const h=[this.genThumb()],l=this.genThumbLabelContent(e);return this.showThumbLabel&&h.push(this.genThumbLabel(l)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{ref:r,key:r,staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--active":i,"v-slider__thumb-container--focused":a,"v-slider__thumb-container--show-label":this.showThumbLabel},style:this.getThumbContainerStyles(t),attrs:{role:"slider",tabindex:this.isDisabled?-1:this.$attrs.tabindex?this.$attrs.tabindex:0,"aria-label":this.$attrs["aria-label"]||this.label,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue,"aria-readonly":String(this.isReadonly),"aria-orientation":this.vertical?"vertical":"horizontal"},on:{focus:s,blur:n,keydown:this.onKeyDown}}),h)},genThumbLabelContent(e){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:e}):[this.$createElement("span",[String(e)])]},genThumbLabel(e){const t=Object(c["h"])(this.thumbSize),i=this.vertical?`translateY(20%) translateY(${Number(this.thumbSize)/3-1}px) translateX(55%) rotate(135deg)`:"translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)";return this.$createElement(n["e"],{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label-container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:t,width:t,transform:i}}),[this.$createElement("div",e)])])])},genThumb(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},getThumbContainerStyles(e){const t=this.vertical?"top":"left";let i=this.$vuetify.rtl?100-e:e;return i=this.vertical?100-i:i,{transition:this.trackTransition,[t]:i+"%"}},onSliderMouseDown(e){var t;if(e.preventDefault(),this.oldValue=this.internalValue,this.isActive=!0,null!=(t=e.target)&&t.matches(".v-slider__thumb-container, .v-slider__thumb-container *")){this.thumbPressed=!0;const t=e.target.getBoundingClientRect(),i="touches"in e?e.touches[0]:e;this.startOffset=this.vertical?i.clientY-(t.top+t.height/2):i.clientX-(t.left+t.width/2)}else this.startOffset=0,window.clearTimeout(this.mouseTimeout),this.mouseTimeout=window.setTimeout(()=>{this.thumbPressed=!0},300);const i=!c["D"]||{passive:!0,capture:!0},a=!!c["D"]&&{passive:!0},s="touches"in e;this.onMouseMove(e),this.app.addEventListener(s?"touchmove":"mousemove",this.onMouseMove,a),Object(c["a"])(this.app,s?"touchend":"mouseup",this.onSliderMouseUp,i),this.$emit("start",this.internalValue)},onSliderMouseUp(e){e.stopPropagation(),window.clearTimeout(this.mouseTimeout),this.thumbPressed=!1;const t=!!c["D"]&&{passive:!0};this.app.removeEventListener("touchmove",this.onMouseMove,t),this.app.removeEventListener("mousemove",this.onMouseMove,t),this.$emit("mouseup",e),this.$emit("end",this.internalValue),Object(c["k"])(this.oldValue,this.internalValue)||(this.$emit("change",this.internalValue),this.noClick=!0),this.isActive=!1},onMouseMove(e){"mousemove"===e.type&&(this.thumbPressed=!0),this.internalValue=this.parseMouseMove(e)},onKeyDown(e){if(!this.isInteractive)return;const t=this.parseKeyDown(e,this.internalValue);null==t||t<this.minValue||t>this.maxValue||(this.internalValue=t,this.$emit("change",t))},onSliderClick(e){if(this.noClick)return void(this.noClick=!1);const t=this.$refs.thumb;t.focus(),this.onMouseMove(e),this.$emit("change",this.internalValue)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},parseMouseMove(e){const t=this.vertical?"top":"left",i=this.vertical?"height":"width",a=this.vertical?"clientY":"clientX",{[t]:s,[i]:n}=this.$refs.track.getBoundingClientRect(),r="touches"in e?e.touches[0][a]:e[a];let h=Math.min(Math.max((r-s-this.startOffset)/n,0),1)||0;return this.vertical&&(h=1-h),this.$vuetify.rtl&&(h=1-h),parseFloat(this.min)+h*(this.maxValue-this.minValue)},parseKeyDown(e,t){if(!this.isInteractive)return;const{pageup:i,pagedown:a,end:s,home:n,left:r,right:h,down:l,up:o}=c["z"];if(![i,a,s,n,r,h,l,o].includes(e.keyCode))return;e.preventDefault();const d=this.stepNumeric||1,u=(this.maxValue-this.minValue)/d;if([r,h,l,o].includes(e.keyCode)){const i=this.$vuetify.rtl?[r,o]:[h,o],a=i.includes(e.keyCode)?1:-1,s=e.shiftKey?3:e.ctrlKey?2:1;t+=a*d*s}else if(e.keyCode===n)t=this.minValue;else if(e.keyCode===s)t=this.maxValue;else{const i=e.keyCode===a?1:-1;t-=i*d*(u>100?u/10:10)}return t},roundValue(e){if(!this.stepNumeric)return e;const t=this.step.toString().trim(),i=t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0,a=this.minValue%this.stepNumeric,s=Math.round((e-a)/this.stepNumeric)*this.stepNumeric+a;return parseFloat(Math.min(s,this.maxValue).toFixed(i))}}}),u=i("7bc6"),f=i("2b0e");function b(e){e={...e};const t=Object(u["c"])(e),i=Object(u["b"])(e),a=Object(u["d"])(e);return{alpha:e.a,hex:t.substr(0,7),hexa:t,hsla:i,hsva:e,hue:e.h,rgba:a}}function p(e){const t=Object(u["a"])(e),i=Object(u["c"])(t),a=Object(u["d"])(t);return{alpha:t.a,hex:i.substr(0,7),hexa:i,hsla:e,hsva:t,hue:t.h,rgba:a}}function g(e){const t=Object(u["g"])(e),i=Object(u["h"])(e),a=Object(u["b"])(t);return{alpha:t.a,hex:i.substr(0,7),hexa:i,hsla:a,hsva:t,hue:t.h,rgba:e}}function m(e){const t=Object(u["e"])(e),i=Object(u["b"])(t),a=Object(u["d"])(t);return{alpha:t.a,hex:e.substr(0,7),hexa:e,hsla:i,hsva:t,hue:t.h,rgba:a}}function v(e){return m(Object(u["o"])(e))}function k(e,t){return t.every(t=>e.hasOwnProperty(t))}function w(e,t){if(!e)return g({r:255,g:0,b:0,a:1});if("string"===typeof e){if("transparent"===e)return m("#00000000");const i=Object(u["o"])(e);return t&&i===t.hexa?t:m(i)}if("object"===typeof e){if(e.hasOwnProperty("alpha"))return e;const i=e.hasOwnProperty("a")?parseFloat(e.a):1;if(k(e,["r","g","b"]))return t&&e===t.rgba?t:g({...e,a:i});if(k(e,["h","s","l"]))return t&&e===t.hsla?t:p({...e,a:i});if(k(e,["h","s","v"]))return t&&e===t.hsva?t:b({...e,a:i})}return g({r:255,g:0,b:0,a:1})}function y(e,t){if(t){const{a:t,...i}=e;return i}return e}function C(e,t){if(null==t)return e;if("string"===typeof t)return 7===t.length?e.hex:e.hexa;if("object"===typeof t){const i="number"===typeof t.a&&0===t.a?!!t.a:!t.a;if(k(t,["r","g","b"]))return y(e.rgba,i);if(k(t,["h","s","l"]))return y(e.hsla,i);if(k(t,["h","s","v"]))return y(e.hsva,i)}return e}function $(e){return!!e&&("string"===typeof e?e.length>7:"object"===typeof e&&(k(e,["a"])||k(e,["alpha"])))}var S=f["default"].extend({name:"v-color-picker-preview",props:{color:Object,disabled:Boolean,hideAlpha:Boolean},methods:{genAlpha(){return this.genTrack({staticClass:"v-color-picker__alpha",props:{thumbColor:"grey lighten-2",hideDetails:!0,value:this.color.alpha,step:0,min:0,max:1},style:{backgroundImage:this.disabled?void 0:`linear-gradient(to ${this.$vuetify.rtl?"left":"right"}, transparent, ${Object(u["i"])(this.color.rgba)})`},on:{input:e=>this.color.alpha!==e&&this.$emit("update:color",b({...this.color.hsva,a:e}))}})},genSliders(){return this.$createElement("div",{staticClass:"v-color-picker__sliders"},[this.genHue(),!this.hideAlpha&&this.genAlpha()])},genDot(){return this.$createElement("div",{staticClass:"v-color-picker__dot"},[this.$createElement("div",{style:{background:Object(u["f"])(this.color.rgba)}})])},genHue(){return this.genTrack({staticClass:"v-color-picker__hue",props:{thumbColor:"grey lighten-2",hideDetails:!0,value:this.color.hue,step:0,min:0,max:360},on:{input:e=>this.color.hue!==e&&this.$emit("update:color",b({...this.color.hsva,h:e}))}})},genTrack(e){return this.$createElement(d,{class:"v-color-picker__track",...e,props:{disabled:this.disabled,...e.props}})}},render(e){return e("div",{staticClass:"v-color-picker__preview",class:{"v-color-picker__preview--hide-alpha":this.hideAlpha}},[this.genDot(),this.genSliders()])}}),O=(i("d59f"),f["default"].extend({name:"v-color-picker-canvas",props:{color:{type:Object,default:()=>g({r:255,g:0,b:0,a:1})},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300}},data(){return{boundingRect:{width:0,height:0,left:0,top:0}}},computed:{dot(){return this.color?{x:this.color.hsva.s*parseInt(this.width,10),y:(1-this.color.hsva.v)*parseInt(this.height,10)}:{x:0,y:0}}},watch:{"color.hue":"updateCanvas"},mounted(){this.updateCanvas()},methods:{emitColor(e,t){const{left:i,top:a,width:s,height:n}=this.boundingRect;this.$emit("update:color",b({h:this.color.hue,s:Object(c["f"])(e-i,0,s)/s,v:1-Object(c["f"])(t-a,0,n)/n,a:this.color.alpha}))},updateCanvas(){if(!this.color)return;const e=this.$refs.canvas,t=e.getContext("2d");if(!t)return;const i=t.createLinearGradient(0,0,e.width,0);i.addColorStop(0,"hsla(0, 0%, 100%, 1)"),i.addColorStop(1,`hsla(${this.color.hue}, 100%, 50%, 1)`),t.fillStyle=i,t.fillRect(0,0,e.width,e.height);const a=t.createLinearGradient(0,0,0,e.height);a.addColorStop(0,"hsla(0, 0%, 100%, 0)"),a.addColorStop(1,"hsla(0, 0%, 0%, 1)"),t.fillStyle=a,t.fillRect(0,0,e.width,e.height)},handleClick(e){this.disabled||(this.boundingRect=this.$el.getBoundingClientRect(),this.emitColor(e.clientX,e.clientY))},handleMouseDown(e){e.preventDefault(),this.disabled||(this.boundingRect=this.$el.getBoundingClientRect(),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseup",this.handleMouseUp))},handleMouseMove(e){this.disabled||this.emitColor(e.clientX,e.clientY)},handleMouseUp(){window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mouseup",this.handleMouseUp)},genCanvas(){return this.$createElement("canvas",{ref:"canvas",attrs:{width:this.width,height:this.height}})},genDot(){const e=parseInt(this.dotSize,10)/2,t=Object(c["h"])(this.dot.x-e),i=Object(c["h"])(this.dot.y-e);return this.$createElement("div",{staticClass:"v-color-picker__canvas-dot",class:{"v-color-picker__canvas-dot--disabled":this.disabled},style:{width:Object(c["h"])(this.dotSize),height:Object(c["h"])(this.dotSize),transform:`translate(${t}, ${i})`}})}},render(e){return e("div",{staticClass:"v-color-picker__canvas",style:{width:Object(c["h"])(this.width),height:Object(c["h"])(this.height)},on:{click:this.handleClick,mousedown:this.handleMouseDown}},[this.genCanvas(),this.genDot()])}})),x=(i("9f7f1"),i("afdd")),j=i("9d26");const _={rgba:{inputs:[["r",255,"int"],["g",255,"int"],["b",255,"int"],["a",1,"float"]],from:g},hsla:{inputs:[["h",360,"int"],["s",1,"float"],["l",1,"float"],["a",1,"float"]],from:p},hexa:{from:m}};var M=f["default"].extend({name:"v-color-picker-edit",props:{color:Object,disabled:Boolean,hideAlpha:Boolean,hideModeSwitch:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(_).includes(e)}},data(){return{modes:_,internalMode:this.mode}},computed:{currentMode(){return this.modes[this.internalMode]}},watch:{mode(e){this.internalMode=e}},created(){this.internalMode=this.mode},methods:{getValue(e,t){return"float"===t?Math.round(100*e)/100:"int"===t?Math.round(e):0},parseValue(e,t){return"float"===t?parseFloat(e):"int"===t&&parseInt(e,10)||0},changeMode(){const e=Object.keys(this.modes),t=e.indexOf(this.internalMode),i=e[(t+1)%e.length];this.internalMode=i,this.$emit("update:mode",i)},genInput(e,t,i,a){return this.$createElement("div",{staticClass:"v-color-picker__input"},[this.$createElement("input",{key:e,attrs:t,domProps:{value:i},on:a}),this.$createElement("span",e.toUpperCase())])},genInputs(){if("hexa"===this.internalMode){const e=this.color.hexa,t=this.hideAlpha&&e.endsWith("FF")?e.substr(0,7):e;return this.genInput("hex",{maxlength:this.hideAlpha?7:9,disabled:this.disabled},t,{change:e=>{const t=e.target;this.$emit("update:color",this.currentMode.from(Object(u["o"])(t.value)))}})}{const e=this.hideAlpha?this.currentMode.inputs.slice(0,-1):this.currentMode.inputs;return e.map(([e,t,i])=>{const a=this.color[this.internalMode];return this.genInput(e,{type:"number",min:0,max:t,step:"float"===i?"0.01":"int"===i?"1":void 0,disabled:this.disabled},this.getValue(a[e],i),{input:t=>{const s=t.target,n=this.parseValue(s.value||"0",i);this.$emit("update:color",this.currentMode.from(Object.assign({},a,{[e]:n}),this.color.alpha))}})})}},genSwitch(){return this.$createElement(x["a"],{props:{small:!0,icon:!0,disabled:this.disabled},on:{click:this.changeMode}},[this.$createElement(j["a"],"$unfold")])}},render(e){return e("div",{staticClass:"v-color-picker__edit"},[this.genInputs(),!this.hideModeSwitch&&this.genSwitch()])}});i("31ce");const V=Object.freeze({base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"}),T=Object.freeze({base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"}),E=Object.freeze({base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"}),z=Object.freeze({base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"}),F=Object.freeze({base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"}),D=Object.freeze({base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"}),B=Object.freeze({base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"}),N=Object.freeze({base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"}),L=Object.freeze({base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"}),A=Object.freeze({base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"}),I=Object.freeze({base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"}),P=Object.freeze({base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"}),R=Object.freeze({base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"}),W=Object.freeze({base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"}),H=Object.freeze({base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"}),Y=Object.freeze({base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"}),K=Object.freeze({base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"}),U=Object.freeze({base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"}),X=Object.freeze({base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"}),G=Object.freeze({black:"#000000",white:"#ffffff",transparent:"transparent"});var J=Object.freeze({red:V,pink:T,purple:E,deepPurple:z,indigo:F,blue:D,lightBlue:B,cyan:N,teal:L,green:A,lightGreen:I,lime:P,yellow:R,amber:W,orange:H,deepOrange:Y,brown:K,blueGrey:U,grey:X,shades:G}),q=i("7560");function Q(e){return Object.keys(e).map(t=>{const i=e[t];return i.base?[i.base,i.darken4,i.darken3,i.darken2,i.darken1,i.lighten1,i.lighten2,i.lighten3,i.lighten4,i.lighten5]:[i.black,i.white,i.transparent]})}const Z=v("#FFFFFF").rgba,ee=v("#000000").rgba;var te=Object(r["a"])(q["a"]).extend({name:"v-color-picker-swatches",props:{swatches:{type:Array,default:()=>Q(J)},disabled:Boolean,color:Object,maxWidth:[Number,String],maxHeight:[Number,String]},methods:{genColor(e){const t=this.$createElement("div",{style:{background:e}},[Object(c["k"])(this.color,w(e,null))&&this.$createElement(j["a"],{props:{small:!0,dark:Object(u["l"])(this.color.rgba,Z)>2&&this.color.alpha>.5,light:Object(u["l"])(this.color.rgba,ee)>2&&this.color.alpha>.5}},"$success")]);return this.$createElement("div",{staticClass:"v-color-picker__color",on:{click:()=>this.disabled||this.$emit("update:color",v("transparent"===e?"#00000000":e))}},[t])},genSwatches(){return this.swatches.map(e=>{const t=e.map(this.genColor);return this.$createElement("div",{staticClass:"v-color-picker__swatch"},t)})}},render(e){return e("div",{staticClass:"v-color-picker__swatches",style:{maxWidth:Object(c["h"])(this.maxWidth),maxHeight:Object(c["h"])(this.maxHeight)}},[this.$createElement("div",this.genSwatches())])}}),ie=i("c995");t["a"]=Object(r["a"])(ie["a"],q["a"]).extend({name:"v-color-picker",props:{canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},flat:Boolean,hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,hideModeSwitch:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(_).includes(e)},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},value:{type:[Object,String]},width:{type:[Number,String],default:300}},data:()=>({internalValue:g({r:255,g:0,b:0,a:1})}),computed:{hideAlpha(){return!!this.value&&!$(this.value)}},watch:{value:{handler(e){this.updateColor(w(e,this.internalValue))},immediate:!0}},methods:{updateColor(e){this.internalValue=e;const t=C(this.internalValue,this.value);Object(c["k"])(t,this.value)||(this.$emit("input",t),this.$emit("update:color",this.internalValue))},genCanvas(){return this.$createElement(O,{props:{color:this.internalValue,disabled:this.disabled,dotSize:this.dotSize,width:this.width,height:this.canvasHeight},on:{"update:color":this.updateColor}})},genControls(){return this.$createElement("div",{staticClass:"v-color-picker__controls"},[!this.hideSliders&&this.genPreview(),!this.hideInputs&&this.genEdit()])},genEdit(){return this.$createElement(M,{props:{color:this.internalValue,disabled:this.disabled,hideAlpha:this.hideAlpha,hideModeSwitch:this.hideModeSwitch,mode:this.mode},on:{"update:color":this.updateColor,"update:mode":e=>this.$emit("update:mode",e)}})},genPreview(){return this.$createElement(S,{props:{color:this.internalValue,disabled:this.disabled,hideAlpha:this.hideAlpha},on:{"update:color":this.updateColor}})},genSwatches(){return this.$createElement(te,{props:{dark:this.dark,light:this.light,disabled:this.disabled,swatches:this.swatches,color:this.internalValue,maxHeight:this.swatchesMaxHeight},on:{"update:color":this.updateColor}})}},render(e){return e(a["a"],{staticClass:"v-color-picker",class:{"v-color-picker--flat":this.flat,...this.themeClasses,...this.elevationClasses},props:{maxWidth:this.width}},[!this.hideCanvas&&this.genCanvas(),(!this.hideSliders||!this.hideInputs)&&this.genControls(),this.showSwatches&&this.genSwatches()])}})},"31ce":function(e,t,i){},7863:function(e,t,i){},"8f5a":function(e,t,i){},"9e29":function(e,t,i){},"9f7f1":function(e,t,i){},bb18:function(e,t,i){},d59f:function(e,t,i){},ef9a:function(e,t,i){"use strict";i("8f5a");var a=i("7efd"),s=i("a9ad"),n=i("58df");t["a"]=Object(n["a"])(a["a"],s["a"]).extend({name:"v-chip-group",provide(){return{chipGroup:this}},props:{column:Boolean},computed:{classes(){return{...a["a"].options.computed.classes.call(this),"v-chip-group":!0,"v-chip-group--column":this.column}}},watch:{column(e){e&&(this.scrollOffset=0),this.$nextTick(this.onResize)}},methods:{genData(){return this.setTextColor(this.color,{...a["a"].options.methods.genData.call(this)})}}})}}]);
//# sourceMappingURL=chunk-5b13cade.fc7b6f56.js.map