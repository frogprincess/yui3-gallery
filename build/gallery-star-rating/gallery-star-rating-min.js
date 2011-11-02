YUI.add("gallery-star-rating",function(d){var b=d.Lang.sub,a=d.Array.each,e=function(f){e.superclass.constructor.apply(this,arguments);};d.mix(e,{NAME:"StarRatingWidget",NS:"star-widget",ATTRS:{"name":{},"captionEl":{},"caption":{},"theme":{},"min":{value:0},"max":{value:5},"allowClear":{value:true},"readOnly":{value:false},"value":{value:null,validator:function(f){return this._validateValue(f);}},"options":{value:[]},"input":{value:null}}});d.extend(e,d.Widget,{STAR_SELECTOR:".yui3-star",ACTIVE_STAR_CLASS:"yui3-star-selected",HOVER_STAR_CLASS:"yui3-star-hover",STAR_LIST_TEMPLATE:"{stars}",STAR_CANCEL_TEMPLATE:'<label class="yui3-star-clear"><input type="radio" name="{name}" value=""><span>{label}</span></label>',STAR_ITEM_TEMPLATE:'<label class="yui3-star"><input type="radio" name="{name}" value="{value}"><span>{label}</span></label>',initializer:function(g){var f=this.get("options");if(f.length<1){throw"No options is a terrible rating widget.";}this.set("max",f.length);if(f[0][0]===null){this.set("max",f.length-1);}if(this.get("captionEl")&&typeof this.get("captionEl")==="function"){this.set("captionEl",this.get("captionEl").call(this));}return this;},renderUI:function(){var f="",h=this.get("name"),g=this.get("options"),i=this.get("value"),j="Clear";if(this.get("allowClear")){if(g[0][0]===null){j=g[0][1];}f+=b(this.STAR_CANCEL_TEMPLATE,{label:j,name:h});}a(this.get("options"),function(k){if(k[0]!==null){f+=b(this.STAR_ITEM_TEMPLATE,{name:this.get("name"),value:k[0],label:k[1]});}},this);this.get("contentBox").append(b(this.STAR_LIST_TEMPLATE,{"stars":f}));},bindUI:function(){var g=this.get("contentBox").all("label"),f=this.get("contentBox").all(".yui3-star span");if(!this.get("readOnly")){g.on("click",this._defClickFn,this);f.on("mouseover",this._defMouseOverFn,this);f.on("mouseout",this._defMouseOutFn,this);this.after("valueChange",this.syncUI,this);if(this.get("captionEl")){this.after("captionChange",this.updateCaption,this);}}},syncUI:function(){var g=this.get("contentBox").all(this.STAR_SELECTOR),h=this.ACTIVE_STAR_CLASS,i=this.get("value"),f=this.get("input");g.removeClass(h);if(i!==null){g.each(function(k){var j=k.one("input"),l=this._valueFromElement(j);j.set("checked",false);j.setAttribute("checked",false);if(d.Lang.isNumber(l)&&l<=i){k.addClass(h);if(l===i){j.set("checked",true);j.setAttribute("checked",true);}}},this);}else{}},updateCaption:function(){var g=this.get("captionEl"),f=this.get("caption");if(!g){return;}g.setContent(f===null?"":f);},_validateValue:function(h){var g=this.get("min"),f=this.get("max");if(h===null){return true;}return(d.Lang.isNumber(h)&&h>=g&&h<=f);},_defClickFn:function(g){var f=this._valueFromElement(g.currentTarget);this.set("value",f);},_defMouseOverFn:function(i){var f=this.get("contentBox").all(this.STAR_SELECTOR),g=this.HOVER_STAR_CLASS,h=this._valueFromElement(i.currentTarget),j=i.currentTarget.getContent();f.removeClass(g);f.each(function(k){var l=this._valueFromElement(k.one("input"));if(d.Lang.isNumber(l)&&l<=h){k.addClass(g);}},this);if(j){this.set("caption",j);}},_defMouseOutFn:function(g){var f=this.get("contentBox").all(this.STAR_SELECTOR);f.removeClass(this.HOVER_STAR_CLASS);this.set("caption",null);},_valueFromElement:function(f){if(f.get("tagName")==="SPAN"){f=f.ancestor("label");}if(f.get("tagName")==="LABEL"){f=f.one("input");}if(f.get("tagName")==="INPUT"){if(f.get("value")===""){return null;}return parseInt(f.get("value"),10);}return null;}});d.StarRating=e;var c=function(f){c.superclass.constructor.apply(this,arguments);};d.mix(c,{NAME:"StarRatingPlugin",NS:"stars",ATTRS:{"captionEl":{},"theme":{value:"jquery"},"target":{}}});d.extend(c,d.Plugin.Base,{widget:null,initializer:function(h){var i=this.get("host"),g=false,j=null,f=[];i.all("option").each(function(k){var l=k.getAttribute("value")===""?null:k.get("value");if(l===null){g=true;}if(k.getAttribute("selected")){j=parseInt(l,10);}f.push([l,k.getContent()]);},this);this.widget=new e({name:i.get("name"),captionEl:this.get("captionEl"),options:f,boundingBox:i.get("parentNode"),input:i,value:j,allowClear:g,readOnly:i.get("disabled")}).render();i.set("disabled",true);i.hide();}});d.namespace("Plugin").StarRating=c;},"@VERSION@",{requires:["widget","event","plugin","base","node","event"]});