YUI.add("gallery-bootstrap-misc",function(f){f.Widget.ATTRS.classNames={valueFn:function(){return[];}};f.mix(f.Widget.prototype,{_addExtraClassNames:function(){var g=this.get("boundingBox");f.Array.each(this.get("classNames"),function(h){g.addClass(h);},this);},_renderUI:function(){this._renderBoxClassNames();this._addExtraClassNames();this._renderBox(this._parentNode);},toggleView:function(){return this.set("visible",!this.get("visible"));}},true);var d=f.namespace("Bootstrap");d._dismissAlertFn=function(i){var h=i.target,g=h.getAttribute("data-dismiss")||"alert",j=i.target.ancestor("div."+g);if(j){i.preventDefault();if(j.hasClass("fade")){j.transition({duration:0.5,opacity:0},function(){this.remove();});}else{j.remove();}}};d.alert_delegation=function(g){if(typeof g==="undefined"){g="*[data-dismiss]";}f.delegate("click",d._dismissAlertFn,document.body,g);};function e(h){var g=h.selector||".close";this._node=h.host;this._node.delegate("click",d._dismissAlertFn,g);}e.NS="alert";e.prototype={dismiss:function(){d._dismissAlertFn({target:this._node.one(".close"),preventDefault:function(){}});}};d.Alert=e;d._dropdownClickFn=function(j){var i=j.currentTarget,h=j.forceOpen,g;j.preventDefault();if(i.getAttribute("data-target")){g=f.one(i.getAttribute("data-target"));}else{if(i.getAttribute("href").indexOf("#")>=0){g=f.one(i.getAttribute("href").substr(i.getAttribute("href").indexOf("#")));}}if(!g){g=i.ancestor(".dropdown");if(!g){g=i.ancestor(".btn-group");}}if(g){if(typeof h==="undefined"){g.once("clickoutside",function(){g.removeClass("open");});g.toggleClass("open");}else{if(h){g.once("clickoutside",function(){g.removeClass("open");});g.addClass("open");}else{g.removeClass("open");}}}};d.dropdown_delegation=function(){f.delegate("click",d._dropdownClickFn,document.body,"*[data-toggle=dropdown]");};function c(g){this._node=g.host;this._node.on("click",d._dropdownClickFn);}c.NS="dropdown";c.prototype={open:function(){this.toggle(true);},close:function(){this.toggle(false);},toggle:function(g){d._dropdownClickFn({currentTarget:this._node,preventDefault:function(){},forceOpen:g});}};d.Dropdown=c;d._expandableClickFn=function(l){var k=l.currentTarget,j=l.forceOpen,h,i,g;l.preventDefault();if(k.getAttribute("data-target")){h=f.one(k.getAttribute("data-target"));}else{if(k.getAttribute("href").indexOf("#")>=0){h=f.one(k.getAttribute("href").substr(k.getAttribute("href").indexOf("#")));}}if(k.getData("parent")){i=f.one(k.getData("parent"));g=".collapse.in";}if(typeof j==="undefined"){if(i){i.all(g).each(function(m){m.addClass("out");m.removeClass("in");});}h.toggleClass("out");h.toggleClass("in");}else{if(j){h.removeClass("out");h.addClass("in");}else{h.addClass("out");h.removeClass("in");}}};function b(g){this._node=g.host;this._node.on("click",d._dropdownClickFn);}b.NS="expandable";b.prototype={duration:0.25,easing:"ease-in",showClass:"in",hideClass:"out",transitioning:false,groupSelector:"> .accordion-group > .in",_getTarget:function(){var h=this._node,g;if(h.getData("target")){g=f.one(h.getData("target"));}else{if(h.getAttribute("href").indexOf("#")>=0){g=f.one(h.getAttribute("href").substr(h.getAttribute("href").indexOf("#")));}}return g;},hide:function(){var g=this.showClass,i=this.hideClass,h=this._getTarget();if(this.transitioning){return;}if(h){this._hideElement(h);}},show:function(){var i=this.showClass,m=this.hideClass,k=this._getTarget(),j=this._node,g=this,h,l=this.groupSelector;if(this.transitioning){return;}if(j.getData("parent")){h=f.one(j.getData("parent"));if(h){h.all(l).each(function(n){g._hideElement(n);});}}this._showElement(k);},toggle:function(g){var h=this._getTarget();if(h.hasClass(this.showClass)){this.hide();}else{this.show();}},transition:function(j,g,k,h){var o=this,n=g==="hide"?this.showClass:this.hideClass,l=g==="hide"?this.hideClass:this.showClass,m=g==="hide"?0:null,i=function(){j.removeClass(n);j.addClass(l);o.transitioning=false;};if(m===null){m=0;j.all("> *").each(function(p){m+=p.get("scrollHeight");});}this.transitioning=true;j.transition({height:m+"px",duration:this.duration,easing:this.easing},i);},_hideElement:function(g){this.transition(g,"hide");},_showElement:function(g){this.transition(g,"show");}};d.expandable_delegation=function(){f.delegate("click",function(h){h.preventDefault();var g=h.currentTarget;if(!g.expandable){g.plug(b);}g.expandable.toggle();},document.body,"*[data-toggle=collapse]");};d.Expandable=b;function a(h){this._node=h.host;var g=f.mix(h,this.defaults);delete g.host;g.source=this.prepareSource(g.source_attribute);if(!h.resultTextLocator&&this._node.getAttribute("data-"+g.text_locator_attr)){g.resultTextLocator=this.getData(g.text_locator_attr);}if(!h.resultListLocator&&this._node.getAttribute("data-"+g.list_locator_attr)){g.resultListLocator=this.getData(g.list_locator_attr);}if(!h.resultFilters&&this._node.getAttribute("data-"+g.filters_attr)){g.resultFilters=this.getData(g.filters_attr);}if(typeof g.classNames==="undefined"){g.classNames=[];}g.classNames.push("yui3-skin-sam");this._node.plug(f.Plugin.AutoComplete,g);}a.NS="typeahead";a.prototype={defaults:{source_attribute:"source",text_locator_attr:"text-locator",list_locator_attr:"list-locator",filters_attr:"filters",maxResults:4,resultFilters:"phraseMatch",resultHighlighter:"phraseMatch",enableCache:true,queryDelay:100},prepareSource:function(g){var h=this._node.getData(g);try{h=f.JSON.parse(h);}catch(i){}return h;},getData:function(g){return this._node.getData(g);}};d.Typeahead=a;},"@VERSION@",{requires:["anim","transition","widget","event","event-outside","event-delegate","autocomplete","autocomplete-filters","autocomplete-highlighters","json"]});