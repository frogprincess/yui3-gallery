YUI.add("gallery-bt-syncscroll",function(c){var b="widthChange",a=function(d){c.on("btReady",this._bssInitParentScroll,this);};a.ATTRS={syncScrollMethod:{writeOnce:true,validator:c.Lang.isFunction}};a.prototype={destructor:function(){if(this._bssResizeHandle){this._bssResizeHandle.detach();delete this._bssResizeHandle;}if(this._bssHandle){this._bssHandle.detach();delete this._bssHandle;}delete this._bssParentScroll;},_bssInitParentScroll:function(){var d=this.get("syncScrollMethod"),f=c.Bottle.Page.getCurrent(),e=[this.after(b,d,this)];this._bssParentScroll=c.Widget.getByNode(this.get("boundingBox").ancestor(".yui3-scrollview"));if(d){if(this._bssParentScroll){e.push(this._bssParentScroll.after(b,d,this));}if(!f||f.get("nativeScroll")){e.push(c.on("btSyncScreen",c.bind(d,this)));}this._bssHandle=new c.EventHandle(e);}this.syncScroll();},syncScroll:function(){var d=this._bssParentScroll;if(d){d._uiDimensionsChange();this.fixScrollPosition();}},fixScrollPosition:function(){var d=this._bssParentScroll;if(d&&d._maxScrollY){d.scrollTo(d.get("scrollX"),Math.min(d.get("scrollY"),d._maxScrollY));}}};c.namespace("Bottle").SyncScroll=a;},"@VERSION@",{requires:["gallery-bt-page"]});