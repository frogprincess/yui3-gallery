YUI.add("gallery-expiration-cache",function(f){function c(g){this._store=g.store||new f.InstanceManager();this._meta=g.meta||d;this._expire=f.Lang.isNumber(g.expire)?f.rbind(b,null,g.expire):g.expire;this._stats=g.stats?a():null;if(f.Lang.isFunction(g.stats)){this._stats_key_meta=g.stats;}}function d(){return new Date().getTime();}function b(i,h,j){var g=new Date().getTime()-i;return(g>j);}function a(){return{gets:0,keys:{}};}function e(h,g){if(!h[g]){h[g]={puts:0,gets:0};}}c.prototype={get:function(g){var h=this._store.get(g);if(h&&this._expire(h.meta,h.data)){this._store.remove(g);}else{if(h){if(this._stats){this._stats.gets++;e(this._stats.keys,g);this._stats.keys[g].gets++;}return h.data;}}},put:function(g,h){var i={data:h,meta:this._meta(h)};if(!this._store.put(g,i)){return false;}if(this._stats){e(this._stats.keys,g);this._stats.keys[g].puts++;if(this._stats_key_meta){this._stats_key_meta(g,h,this._stats.keys[g]);}}return true;},replace:function(g,h){var i=this.remove(g);this.put(g,h);return i;},remove:function(g){var h=this._store.remove(g);if(h){return h.data;}},clear:function(){this._store.clear();},clean:function(){f.each(this._store.keys(),this.get,this);},dumpStats:function(){var g=this._stats;this._stats=a();return g;}};f.ExpirationCache=c;},"gallery-2012.03.23-18-00",{requires:["gallery-instancemanager"]});